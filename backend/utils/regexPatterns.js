module.exports = {
  EMAIL: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/,

  PHONE: /(?:\+?\d{1,3}[-.\s]?)?\(?\d{3,5}\)?[-.\s]?\d{3,4}[-.\s]?\d{3,4}/,

  LINKEDIN: /(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-_/]+/i,

  GITHUB: /(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9-_/]+/i,

  
  DATE_RANGE: /([A-Za-z]{3,9}\.?\s?\d{4}|\d{1,2}\/\d{4}|\d{4})\s*(?:-|–|to)\s*(Present|present|Current|current|[A-Za-z]{3,9}\.?\s?\d{4}|\d{1,2}\/\d{4}|\d{4})/,

  SECTION_HEADERS: {
    education: /^(education|academic background|qualifications)\s*:?$/i,
    experience: /^(experience|work experience|professional experience|employment history|work history)\s*:?$/i,
    skills: /^(skills|technical skills|core competencies|key skills)\s*:?$/i,
    projects: /^(projects|personal projects|academic projects)\s*:?$/i,
    summary: /^(summary|objective|profile|about me)\s*:?$/i,
  },

  
  DEGREE_KEYWORDS: /\b(B\.?Tech|M\.?Tech|B\.?E\.?|M\.?E\.?|B\.?Sc|M\.?Sc|MBA|BBA|BCA|MCA|Ph\.?D|Bachelor(?:'s)?|Master(?:'s)?|Diploma)\b/i,
  CGPA_REGEX: /\b(?:CGPA|GPA)\s*[:\-]?\s*(\d+(?:\.\d+)?)\b/i ,
  COLLEGE_HINT : /\b(?:University|Institute|College|IIIT|IIT|NIT)\b/i,
};
