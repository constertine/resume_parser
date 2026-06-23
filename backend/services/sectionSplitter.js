const { SECTION_HEADERS } = require('../utils/regexPatterns');

function detectHeader(line) {
  if (line.length > 40) return null; 

  for (const [sectionName, pattern] of Object.entries(SECTION_HEADERS)) {
    if (pattern.test(line)) return sectionName;
  }
  return null;
}

function splitIntoSections(text) {
  const lines = text.split('\n');
  const sections = {};
  let currentSection = '_unsectioned'; 
  sections[currentSection] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    const matchedHeader = detectHeader(trimmed);
    if(matchedHeader){
      currentSection = matchedHeader;
      if (!sections[currentSection]) sections[currentSection] = [];
      continue; 
    }

    sections[currentSection].push(trimmed);
  }

  const result = {};
  for (const [key, linesArr] of Object.entries(sections)) {
    result[key] = linesArr.join('\n');
  }
  return result;
}

module.exports = { splitIntoSections };
