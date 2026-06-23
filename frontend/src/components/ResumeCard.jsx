export default function ResumeCard({ resume }) {
  
  if (!resume) return null;

  return (
    <div className="card">
      <h3>{resume.name || resume.fileName}</h3>
      {resume.error && <p className="error-text">{resume.error}</p>}

      <p><strong>Email:</strong> {resume.email || '—'}</p>
      <p><strong>Phone:</strong> {resume.phone || '—'}</p>
      <p><strong>LinkedIn:</strong> {resume.linkedin || '—'}</p>
      <p><strong>GitHub:</strong> {resume.github || '—'}</p>

      <h4>Education</h4>
      {resume.education.length === 0 ? <p>—</p> : (
        <ul>{resume.education.map((e, i) =>(
      <li key={i}>
        <strong>{e.degree}</strong>
        <br />
        College: {e.college || '—'}
        <br />
        CGPA: {e.cgpa || '—'}
      </li>
    ))}</ul>
      )}

      <h4>Experience</h4>
      {resume.experience.length === 0 ? <p>—</p> : (
        <ul>{resume.experience.map((e, i) => (
          <li key={i}>{e.company || 'Unknown company'} — {e.duration}</li>
        ))}</ul>
      )}

      <h4>Skills</h4>
      {resume.skills.length === 0 ? <p>—</p> : (
        <div>{resume.skills.map((s, i) => <span className="skill-tag" key={i}>{s}</span>)}</div>
      )}
    </div>
  );
}
