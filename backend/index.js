const express = require('express');
const cors = require('cors');
const resumeRoutes = require('./routes/resumeRoutes');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.json({ status: 'Resume Parser API is running' }));

app.use('/api/resumes', resumeRoutes);

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Something went wrong while processing the resume(s).' });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
