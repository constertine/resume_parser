function createEmptyResumeResult(fileName) {
  return {
    fileName,
    name: null,
    email: null,
    phone: null,
    linkedin: null,
    github: null,
    education: [],   
    experience: [],  
    skills: [],      
  };
}

module.exports = { createEmptyResumeResult };
