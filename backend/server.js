const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const workshopRoutes = require('./routes/workshops.js');
const participantRoutes = require('./routes/participants.js');

app.use('/api', workshopRoutes);
app.use('/api', participantRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
