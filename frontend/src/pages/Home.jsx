import { useState } from 'react';
import UploadForm from '../components/UploadForm';
import ResumeTable from '../components/ResumeTable';
import { parseResumes } from '../api/resumeApi';

export default function Home() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleParse(files) {
    setLoading(true);
    setError(null);
    try {
      const data = await parseResumes(files);
      setResults(data.results);
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong while parsing.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <h1>Resume Parser</h1>
      <p>Upload 5-10 resumes (PDF/DOCX) and extract Name, Education, Experience, and Skills</p>

      <UploadForm onParse={handleParse} loading={loading} />

      {error && <p className="error-text">{error}</p>}

      <ResumeTable results={results} />
    </div>
  );
}
