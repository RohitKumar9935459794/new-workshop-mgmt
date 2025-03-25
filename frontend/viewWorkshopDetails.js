// import { useEffect, useState } from "react";

// const ViewWorkshopDetails = () => {
//     const [workshops, setWorkshops] = useState([]);
//     const [filters, setFilters] = useState({
//         date: "",
//         subject: "",
//         technology: "",
//         project: "",
//         centre: "",
//         mode: "",
//         speaker: ""
//     });
//     const [filterOptions, setFilterOptions] = useState({});
//     const [page, setPage] = useState(1);
//     const [totalPages, setTotalPages] = useState(1);

//     useEffect(() => {
//         fetchWorkshops();
//         fetchFilterOptions();
//     }, [page, filters]);

//     const fetchWorkshops = async () => {
//         const query = new URLSearchParams({ ...filters, page }).toString();
//         const response = await fetch(`/api/workshops?${query}`);
//         const data = await response.json();
//         if (data.success) {
//             setWorkshops(data.workshops);
//             setTotalPages(Math.ceil(data.total / 10));
//         }
//     };

//     const fetchFilterOptions = async () => {
//         const response = await fetch(`/api/workshops/filters`);
//         const data = await response.json();
//         setFilterOptions(data);
//     };

//     const handleFilterChange = (e) => {
//         setFilters({ ...filters, [e.target.name]: e.target.value });
//         setPage(1);
//     };

//     const downloadWorkshops = async () => {
//         window.location.href = "/api/workshops/download";
//     };

//     return (
//         <div>
//             <h2>View Workshop Details</h2>

//             {/* Filter Section */}
//             <div>
//                 <label>Date:</label>
//                 <input type="date" name="date" value={filters.date} onChange={handleFilterChange} />
                
//                 <label>Subject:</label>
//                 <select name="subject" value={filters.subject} onChange={handleFilterChange}>
//                     <option value="">All</option>
//                     {filterOptions.subjects?.map(sub => <option key={sub} value={sub}>{sub}</option>)}
//                 </select>

//                 <label>Technology:</label>
//                 <select name="technology" value={filters.technology} onChange={handleFilterChange}>
//                     <option value="">All</option>
//                     {filterOptions.technologies?.map(tech => <option key={tech} value={tech}>{tech}</option>)}
//                 </select>

//                 <label>Project:</label>
//                 <select name="project" value={filters.project} onChange={handleFilterChange}>
//                     <option value="">All</option>
//                     {filterOptions.projects?.map(proj => <option key={proj} value={proj}>{proj}</option>)}
//                 </select>

//                 <label>Centre:</label>
//                 <select name="centre" value={filters.centre} onChange={handleFilterChange}>
//                     <option value="">All</option>
//                     {filterOptions.centres?.map(c => <option key={c} value={c}>{c}</option>)}
//                 </select>

//                 <label>Mode:</label>
//                 <select name="mode" value={filters.mode} onChange={handleFilterChange}>
//                     <option value="">All</option>
//                     {filterOptions.modes?.map(m => <option key={m} value={m}>{m}</option>)}
//                 </select>

//                 <label>Speaker:</label>
//                 <select name="speaker" value={filters.speaker} onChange={handleFilterChange}>
//                     <option value="">All</option>
//                     {filterOptions.speakers?.map(s => <option key={s} value={s}>{s}</option>)}
//                 </select>
//             </div>

//             <button onClick={downloadWorkshops}>Download as Excel</button>

//             <table border="1">
//                 <thead>
//                     <tr>
//                         <th>ID</th>
//                         <th>Subject</th>
//                         <th>Date</th>
//                         <th>Technology</th>
//                         <th>Centre</th>
//                         <th>Mode</th>
//                         <th>Speaker</th>
//                         <th>Participants</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {workshops.map(workshop => (
//                         <tr key={workshop.id}>
//                             <td>{workshop.id}</td>
//                             <td>{workshop.subject}</td>
//                             <td>{workshop.from_date} - {workshop.till_date}</td>
//                             <td>{workshop.technology}</td>
//                             <td>{workshop.centre}</td>
//                             <td>{workshop.mode}</td>
//                             <td>{workshop.speaker_name}</td>
//                             <td><a href={`/view-participants/${workshop.id}`}>View</a></td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default ViewWorkshopDetails;


const express = require('express');
const router = express.Router();
const db = require('../config/db');
const xlsx = require('xlsx');

// Get all workshops
// router.get('/workshops', async (req, res) => {
//     try {
//         const [workshops] = await db.query("SELECT * FROM workshop_details ORDER BY WORKSHOP_ID DESC LIMIT 10");
//         res.json(workshops);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });
// Fetch workshops with pagination
// router.get('/workshops', async (req, res) => {
//     try {
//         const page = parseInt(req.query.page) || 1;
//         const limit = 5;
//         const offset = (page - 1) * limit;

//         const [workshops] = await db.query(`SELECT * FROM workshop_details ORDER BY workshop_id DESC LIMIT ? OFFSET ?`, [limit, offset]);
//         const [[{ total }]] = await db.query(`SELECT COUNT(*) as total FROM workshop_details`);

//         res.json({ success: true, workshops, total });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// });


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

// Fetch unique values for filters
router.get('/workshops/filters', async (req, res) => {
    try {
        const [[subjects], [technologies], [projects], [speakers]] = await Promise.all([
            db.query(`SELECT DISTINCT subject FROM workshop_details`),
            db.query(`SELECT DISTINCT technology FROM workshop_details`),
            db.query(`SELECT DISTINCT project FROM workshop_details`),
            db.query(`SELECT DISTINCT speaker_name FROM workshop_details`)
        ]);

        res.json({
            subjects: subjects.map(s => s.subject),
            technologies: technologies.map(t => t.technology),
            projects: projects.map(p => p.project),
            speakers: speakers.map(s => s.speaker_name),
            centres: ["Janakpuri", "Karkardooma", "Inderlok"],
            modes: ["Offline", "Online"]
        });
    } catch (error) {
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

