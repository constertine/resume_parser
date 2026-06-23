export default function ResumeTable({results}) {
  if (!results || results.length === 0) return null;

  return (
    <div className="card">
      <h3>Parsed Results</h3>
      <table>
        <thead>
          <tr>
            <th>File</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Education</th>
            <th>Experience</th>
            <th>Skills</th>
          </tr>
        </thead>
        <tbody>
          {results.map((r, i) => (
            <tr key={i}>
              <td>{r.fileName}</td>
              <td>{r.name || '—'}</td>
              <td>{r.email || '—'}</td>
              <td>{r.phone || '—'}</td>
              <td>
                {r.education.length === 0
                  ? '—'
                  : r.education.map((e, idx) => (
                    <div key={idx}>
                      <div>{e.degree}</div>
                      <div>{e.college}</div>
                      <div>CGPA: {e.cgpa || '—'}</div>
                    </div>
      ))}
              </td>
              <td>
                {r.experience.length === 0
                  ? '—'
                  : r.experience.map((e, idx) => (
                      <div key={idx}>
                        {e.company || 'Unknown'} ({e.duration})
                      </div>
                    ))}
              </td>
              <td>
                {r.skills.length === 0
                  ? '—'
                  : r.skills.map((s, idx) => (
                      <span className="skill-tag" key={idx}>{s}</span>
                    ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
