const express = require('express');
const multer = require('multer');
const xlsx = require('xlsx');
const db = require('../config/db');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Upload participant data
router.post('/:workshopId/upload', upload.single('file'), async (req, res) => {
    try {
        const workbook = xlsx.readFile(req.file.path);
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = xlsx.utils.sheet_to_json(sheet);
        console.log(data);
        // for (let row of data) {
        //     await db.query("INSERT INTO participant_details (name, fathers_name, Highestqualifications, mobileNo, email, working, designation, department,  college_name, degree, workshop_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", 
        //         [row.name, row.fathers_name, row.qualification, row.mobile_number, row.email, req.params.workshopId]);
        // }
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

// In your backend router
router.get('/:workshopId/download', async (req, res) => {
  try {
    const [participants] = await db.query(
      `SELECT * FROM participant_details WHERE workshop_id = ?`,
      [req.params.workshopId]
    );

    const workbook = xlsx.utils.book_new();
    const worksheet = xlsx.utils.json_to_sheet(participants);
    xlsx.utils.book_append_sheet(workbook, worksheet, "Participants");

    const filePath = path.join(__dirname, 'downloads', `participants_${req.params.workshopId}.xlsx`);
    
    // Ensure downloads directory exists
    if (!fs.existsSync(path.join(__dirname, 'downloads'))) {
      fs.mkdirSync(path.join(__dirname, 'downloads'));
    }

    xlsx.writeFile(workbook, filePath);
    
    res.download(filePath, `participants_workshop_${req.params.workshopId}.xlsx`, (err) => {
      // Delete file after download
      fs.unlinkSync(filePath);
      if (err) throw err;
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
