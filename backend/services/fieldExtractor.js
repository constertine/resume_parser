const nlp = require('compromise');
const Fuse = require('fuse.js');
const { EMAIL, PHONE, LINKEDIN, GITHUB, DATE_RANGE, DEGREE_KEYWORDS ,CGPA_REGEX, COLLEGE_HINT } = require('../utils/regexPatterns');
const skillsTaxonomy = require('./skillsTaxonomy');

const fuse = new Fuse(skillsTaxonomy, { threshold: 0.3, ignoreLocation: true });

function extractName(fullText){

  const lines = fullText.split('\n').map((l) => l.trim()).filter(Boolean);
  const candidateLines = lines.slice(0, 5);

  for (const line of candidateLines) {
    const looksLikeNoise = EMAIL.test(line) || PHONE.test(line) || line.length > 40 || /resume|curriculum vitae|cv/i.test(line);
    if (looksLikeNoise) continue;


    const wordCount = line.split(/\s+/).length;
    if (wordCount >= 1 && wordCount <= 4 && /^[A-Za-z.\s]+$/.test(line)) {
      return line;
    }
  }

  const topChunk = lines.slice(0, 8).join(' ');
  const people = nlp(topChunk).people().out('array');
  return people.length > 0 ? people[0] : null;

}

function extractEmail(fullText){
  const match = fullText.match(EMAIL);
  return match ? match[0] : null;
}

function extractPhone(fullText){
  const match = fullText.match(PHONE);
  return match ? match[0].trim() : null;
}

function extractLinkedIn(fullText){
  const match = fullText.match(LINKEDIN);
  return match ? match[0] : null;
}

function extractGithub(fullText){
  const match = fullText.match(GITHUB);
  return match ? match[0] : null;
}



function extractSkills(skillsSectionText){
  if (!skillsSectionText) return [];

  const tokens = skillsSectionText
    .split(/[,|\n•\-]/)
    .map((t) => t.trim())
    .filter((t) => t.length > 1 && t.length < 30);

  const matched = new Set();
  for (const token of tokens) {
    const results = fuse.search(token);
    if (results.length > 0) {
      matched.add(results[0].item); 
    }
  }
  return Array.from(matched);
}


function extractEducation(educationSectionText) {
  if (!educationSectionText) return [];

  const lines = educationSectionText.split('\n').filter(Boolean);
  const entries = [];

  for (const line of lines){
    const degreeMatch = line.match(DEGREE_KEYWORDS);
    if (degreeMatch){

      const cgpaMatch = line.match(CGPA_REGEX);

      const collegeMatch = line.match(
        /(?:IIIT|IIT|NIT|University|Institute|College)[^,]*/i
      );


      entries.push({
        degree: degreeMatch[0],
        cgpa: cgpaMatch ? cgpaMatch[1] : null,
        college: collegeMatch ? collegeMatch[0] : null,
        line,
      });

    }
  }
  return entries;
}


function extractExperience(experienceSectionText) {
  if (!experienceSectionText) return [];

  const lines = experienceSectionText.split('\n').filter(Boolean);
  const entries = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const dateMatch = line.match(DATE_RANGE);
    if (!dateMatch) continue;


    const prevLine = i > 0 ? lines[i - 1] : '';
    const orgsThisLine = nlp(line).organizations().out('array');
    const orgsPrevLine = nlp(prevLine).organizations().out('array');

    let company = orgsThisLine[0] || orgsPrevLine[0] || null;

    if (!company) {
      const atMatch = (prevLine + ' ' + line).match(/(?:at|@)\s+([A-Z][A-Za-z0-9&.,\s]{2,40})/);
      if (atMatch) company = atMatch[1].trim();
    }

    entries.push({
      company,
      duration: dateMatch[0],
      line: prevLine ? `${prevLine} | ${line}` : line,
    });
  }
  return entries;
}

module.exports = {
  extractName,
  extractEmail,
  extractPhone,
  extractLinkedIn,
  extractGithub,
  extractSkills,
  extractEducation,
  extractExperience,
};
