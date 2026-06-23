import axios from 'axios';

const API_BASE_URL = 'https://resume-parser-zxg1.onrender.com/';

export async function parseResumes(files) {
  const formData = new FormData();
  files.forEach((file) => formData.append('resumes', file));

  const response = await axios.post(`${API_BASE_URL}/resumes/parse`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return response.data; 
}
