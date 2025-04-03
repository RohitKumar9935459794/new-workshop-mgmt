const express = require('express');
const multer = require('multer');
const xlsx = require('xlsx');
const db = require('../config/db');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Upload participant data (unchanged)
router.post('/:workshopId/upload', upload.single('file'), async (req, res) => {
    try {
        const workbook = xlsx.readFile(req.file.path);
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = xlsx.utils.sheet_to_json(sheet);
        console.log(data);
        
        for (let row of data) {
            const name = row.Name || null;
            const fathers_name = row.Fathers_Name || null;
            const qualification = row.Qualification || null;
            const mobile_number = row.Mobile_Number || null;
            const email = row.Email || null;
            const working = row.working || null;
            const designation = row.designation || null;
            const department = row.department || null;
            const college_name = row.college_name || null;
            const degree = row.degree || null;
        
            await db.query(
                "INSERT INTO participant_details (name, fathers_name, Highestqualifications, mobileNo, email, working, designation, department, collegename, degree, workshop_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                [name, fathers_name, qualification, mobile_number, email, working, designation, department, college_name, degree, req.params.workshopId]
            );
        }

        res.json({ success: true, message: "Participants added!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Modified download endpoint
router.get('/:workshopId/download', async (req, res) => {
  try {
    const [participants] = await db.query(
      `SELECT * FROM participant_details WHERE workshop_id = ?`,
      [req.params.workshopId]
    );

    const workbook = xlsx.utils.book_new();
    const worksheet = xlsx.utils.json_to_sheet(participants);
    xlsx.utils.book_append_sheet(workbook, worksheet, "Participants");

    // Generate a filename with current date for better organization
    const date = new Date().toISOString().split('T')[0];
    const filename = `participants_workshop_${req.params.workshopId}_${date}.xlsx`;

    // Convert workbook to buffer
    const buffer = xlsx.write(workbook, { type: 'buffer', bookType: 'xlsx' });

    // Set headers to trigger download dialog
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    
    // Send the buffer
    res.send(buffer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
// api for fetching participant details table
router.get('/:workshopId', async (req, res) => {
  try {
      // Input validation and sanitization
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

      // Pagination parameters with defaults and validation
      const page = Math.max(1, parseInt(req.query.page) || 1);
      const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 20));
      const offset = (page - 1) * limit;

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

      // Get participants with pagination
      const [participants] = await db.query(
          `SELECT 
              regid,
              name,
              fathers_name,
              Highestqualifications AS qualification,
              mobileNo AS mobile_number,
              email,
              collegename AS college_name
          FROM participant_details 
          WHERE workshop_id = ?
          LIMIT ? OFFSET ?`,
          [workshopId, limit, offset]
      );

      // Get total count for pagination metadata
      const [[countResult]] = await db.query(
          `SELECT COUNT(*) AS total FROM participant_details WHERE workshop_id = ?`,
          [workshopId]
      );
      const total = countResult.total;

      res.json({
          success: true,
          data: {
              workshop_id: workshopId,
              participants,
              pagination: {
                  total_items: total,
                  current_page: page,
                  items_per_page: limit,
                  total_pages: Math.ceil(total / limit),
                  has_next_page: page * limit < total,
                  has_prev_page: page > 1
              }
          }
      });

  } catch (err) {
      console.error(`Error fetching participants for workshop ${req.params.workshopId}:`, err);
      res.status(500).json({ 
          success: false,
          error: 'Internal server error',
          ...(process.env.NODE_ENV === 'development' && {
              details: err.message,
              stack: err.stack
          })
      });
  }
});