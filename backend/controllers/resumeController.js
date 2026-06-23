const fs = require('fs');
const { extractText } = require('../services/extractText');
const { splitIntoSections } = require('../services/sectionSplitter');
const fieldExtractor = require('../services/fieldExtractor');
const { createEmptyResumeResult } = require('../models/Resume');

async function parseResumes(req, res){

  const files = req.files;

  if (!files || files.length === 0) {
    return res.status(400).json({ error: 'No files uploaded. Use field name "resumes".' });
  }

  const results = [];

  for (const file of files) {
    const result = createEmptyResumeResult(file.originalname);

    try {
     
      const fullText = await extractText(file.path);

      
      const sections = splitIntoSections(fullText);
      result.rawSections = sections;

      
      result.name = fieldExtractor.extractName(fullText);
      result.email = fieldExtractor.extractEmail(fullText);
      result.phone = fieldExtractor.extractPhone(fullText);
      result.linkedin = fieldExtractor.extractLinkedIn(fullText);
      result.github = fieldExtractor.extractGithub(fullText);

      
      result.education = fieldExtractor.extractEducation(sections.education);
      result.experience = fieldExtractor.extractExperience(sections.experience);
      result.skills = fieldExtractor.extractSkills(fullText);

    } catch (err) {
      console.error(`Failed to parse ${file.originalname}:`, err.message);
      result.error = `Could not parse this file: ${err.message}`;
    } finally {
      fs.unlink(file.path, () => {});
    }

    results.push(result);
  }

  res.json({ count: results.length, results });
}

module.exports = { parseResumes };
