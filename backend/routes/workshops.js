const express = require('express');
const router = express.Router();
const db = require('../config/db');
const xlsx = require('xlsx');

// Insert new workshop
router.post('/new', async (req, res) => {
    const { subject, from_date, till_date, technology, project, venue, centre, mode, speaker_name, other1, other2, other3 } = req.body;
    try {
        await db.query("INSERT INTO workshop_details (subject, from_date, till_date, technology, project, venue, center, mode, speaker, otherOption1, otherOption2, otherOption3) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [subject, from_date, till_date, technology, project, venue, centre, mode, speaker_name, other1, other2, other3]);
        res.json({ success: true, message: "Workshop added!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// get total workshops and participant in particular financial year
router.get('/workshops/stats/:year', async (req, res) => {
    try {
        const year = req.params.year;

        // Financial year starts from April 1st of the given year to March 31st of the next year
        const startDate = `${year}-04-01`;
        const endDate = `${parseInt(year) + 1}-03-31`;

        // Count total workshops
        const [workshopCount] = await db.query(
            "SELECT COUNT(*) AS total_workshops FROM workshop_details WHERE from_date BETWEEN ? AND ?",
            [startDate, endDate]
        );

        // Count total participants
        const [participantCount] = await db.query(
            "SELECT COUNT(*) AS total_participants FROM participant_details p JOIN workshop_details w ON p.workshop_id = w.workshop_id WHERE w.from_date BETWEEN ? AND ?",
            [startDate, endDate]
        );

        res.json({
            total_workshops: workshopCount[0].total_workshops,
            total_participants: participantCount[0].total_participants
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});


// Fetch workshops with filtering and pagination
router.get('/workshops', async (req, res) => {
    try {
        const { page = 1, date, subject, technology, project, centre, mode, speaker } = req.query;
        const limit = 5;
        const offset = (page - 1) * limit;
        let filters = [];
        let queryParams = [];

        if (date) {
            filters.push(`from_date <= ? AND till_date >= ?`);
            queryParams.push(date, date);
        }
        if (subject) {
            filters.push(`subject = ?`);
            queryParams.push(subject);
        }
        if (technology) {
            filters.push(`technology = ?`);
            queryParams.push(technology);
        }
        if (project) {
            filters.push(`project = ?`);
            queryParams.push(project);
        }
        if (centre) {
            filters.push(`centre = ?`);
            queryParams.push(centre);
        }
        if (mode) {
            filters.push(`mode = ?`);
            queryParams.push(mode);
        }
        if (speaker) {
            filters.push(`speaker_name = ?`);
            queryParams.push(speaker);
        }

        let sql = `SELECT * FROM workshop_details ${filters.length ? "WHERE " + filters.join(" AND ") : ""} ORDER BY workshop_id DESC LIMIT ? OFFSET ?`;
        queryParams.push(limit, offset);
        
        const [workshops] = await db.query(sql, queryParams);
        const [[{ total }]] = await db.query(`SELECT COUNT(*) as total FROM workshop_details ${filters.length ? "WHERE " + filters.join(" AND ") : ""}`, queryParams);

        res.json({ success: true, workshops, total });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});



// Fetch workshops with particular workshop id 
router.get('/workshops/:workshopId', async (req, res) => {
    try {
        

        const rawId = req.params.workshopId;
        const workshopId = parseInt(rawId.toString().replace(/\D/g, ''));
        
        if (isNaN(workshopId) ){
            return res.status(400).json({
                success: false,
                error: 'Invalid Workshop ID format',
                received: rawId,
                solution: 'Please provide a numeric workshop ID'
            });
        }
  
        
              // Check if workshop exists
              const [workshop] = await db.query(
                  `SELECT workShop_ID FROM workshop_details WHERE workShop_ID = ?`, 
                  [workshopId]
              );
              
              if (!workshop.length) {
                  return res.status(404).json({
                      success: false,
                      error: `Workshop not found`,
                      workshopId: workshopId,
                      note: 'Verify the workshop ID exists in the system'
                  });
              }
        
             
              const [workshopDetails] = await db.query(
                  `SELECT * FROM workshop_details WHERE workshop_id = ?`,
                  [workshopId]
              );

              res.json({
                success: true,
                workshopDetails
             });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});






router.get('/workshops/filters', async (req, res) => {
    try {
        // First test with just one query
        const [subjects] = await db.query(`SELECT DISTINCT subject FROM workshop_details`);
        console.log(subjects); // Check the actual structure
        
        // If that works, proceed with others
        const [technologies] = await db.query(`SELECT DISTINCT technology FROM workshop_details`);
        const [projects] = await db.query(`SELECT DISTINCT project FROM workshop_details`);
        const [speakers] = await db.query(`SELECT DISTINCT speaker FROM workshop_details`);

        res.json({
            subjects: subjects.map(s => s.subject),
            technologies: technologies.map(t => t.technology),
            projects: projects.map(p => p.project),
            speakers: speakers.map(s => s.speaker),
            centres: ["Janakpuri", "Karkardooma", "Inderlok"],
            modes: ["Offline", "Online"]
        });
    } catch (error) {
        console.error('Error fetching filters:', error); // Better logging
        res.status(500).json({ success: false, message: error.message });
    }
});





const fs = require('fs');
const path = require('path');

// Download workshops as Excel
router.get('/workshops/download', async (req, res) => {
    try {
        const [workshops] = await db.query(`SELECT * FROM workshop_details`);

        const workbook = xlsx.utils.book_new();
        const worksheet = xlsx.utils.json_to_sheet(workshops);
        xlsx.utils.book_append_sheet(workbook, worksheet, "Workshops");

        const filePath = path.join(__dirname, 'downloads', 'workshops.xlsx'); // Use path.join
        const downloadPath = path.join('downloads', 'workshops.xlsx'); //relative path for download.

        // Check if the directory exists, and create it if not
        if (!fs.existsSync(path.join(__dirname, 'downloads'))) {
            fs.mkdirSync(path.join(__dirname, 'downloads'));
        }

        xlsx.writeFile(workbook, filePath);

        // Send the file as a download
        res.download(downloadPath, 'workshops.xlsx', (err) => {
            if (err) {
                // Handle errors
                console.error('Error downloading file:', err);
                res.status(500).json({ success: false, message: 'Error downloading file' });
            } else {
                // Delete the file after it has been downloaded
                fs.unlinkSync(filePath);
            }
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;

// routes/workshops.js

/**
 * @swagger
 * /workshops/stats:
 *   get:
 *     summary: Get workshop and participant statistics with flexible filtering
 *     description: |
 *       Get counts of workshops and participants with various filters.
 *       Financial year can be specified (April 1 to March 31 of next year).
 *       Other filters can be combined as needed.
 *     parameters:
 *       - in: query
 *         name: year
 *         schema:
 *           type: integer
 *         description: The starting year of the financial year (e.g., 2023 for FY 2023-24)
 *       - in: query
 *         name: mode
 *         schema:
 *           type: string
 *         description: Workshop mode (Online/Offline)
 *       - in: query
 *         name: subject
 *         schema:
 *           type: string
 *         description: Workshop subject
 *       - in: query
 *         name: technology
 *         schema:
 *           type: string
 *         description: Technology used in workshop
 *       - in: query
 *         name: centre
 *         schema:
 *           type: string
 *         description: Centre where workshop was conducted
 *     responses:
 *       200:
 *         description: Statistics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 filters:
 *                   type: object
 *                   description: Applied filters
 *                 total_workshops:
 *                   type: integer
 *                 total_participants:
 *                   type: integer
 *       400:
 *         description: Invalid parameters
 *       500:
 *         description: Server error
 */

// for getting count of workshop and participant with filters
router.get('/stats', async (req, res) => {
    try {
        const { year, mode, subject, technology, centre } = req.query;
        const filters = {};
        const whereClauses = [];
        const queryParams = [];

        // Handle financial year filter if provided
        if (year) {
            const numericYear = parseInt(year);
            if (isNaN(numericYear) || numericYear < 2000 || numericYear > 2100) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid year parameter. Please provide a valid year between 2000 and 2100.'
                });
            }
            
            const startDate = `${numericYear}-04-01`;
            const endDate = `${numericYear + 1}-03-31`;
            
            whereClauses.push('w.from_date BETWEEN ? AND ?');
            queryParams.push(startDate, endDate);
            filters.financial_year = `${numericYear}-${(numericYear + 1).toString().slice(-2)}`;
        }

        // Handle other filters
        if (mode) {
            whereClauses.push('w.mode = ?');
            queryParams.push(mode);
            filters.mode = mode;
        }
        
        if (subject) {
            whereClauses.push('w.subject = ?');
            queryParams.push(subject);
            filters.subject = subject;
        }
        
        if (technology) {
            whereClauses.push('w.technology = ?');
            queryParams.push(technology);
            filters.technology = technology;
        }
        
        if (centre) {
            whereClauses.push('w.centre = ?');
            queryParams.push(centre);
            filters.centre = centre;
        }

        // Build WHERE clause
        const whereClause = whereClauses.length > 0 
            ? `WHERE ${whereClauses.join(' AND ')}` 
            : '';

        // Execute both queries in parallel
        const [workshopResult, participantResult] = await Promise.all([
            db.query(
                `SELECT COUNT(*) AS total 
                 FROM workshop_details w
                 ${whereClause}`,
                queryParams
            ),
            db.query(
                `SELECT COUNT(*) AS total 
                 FROM participant_details p 
                 JOIN workshop_details w ON p.workshop_id = w.workshop_id 
                 ${whereClause}`,
                queryParams
            )
        ]);

        res.json({
            success: true,
            filters: filters,
            total_workshops: workshopResult[0][0].total,
            total_participants: participantResult[0][0].total
        });

    } catch (error) {
        console.error('Error fetching workshop statistics:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve workshop statistics',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

module.exports = router;
