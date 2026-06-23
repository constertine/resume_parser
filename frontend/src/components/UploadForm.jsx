import { useState, useRef } from 'react';

export default function UploadForm({ onParse, loading }) {

  const [files, setFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  function handleFiles(fileList) {
    const incoming = Array.from(fileList).filter((f) =>
      /\.(pdf|docx)$/i.test(f.name)
    );
    setFiles((prev) => [...prev, ...incoming].slice(0, 10));
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  }

  function removeFile(index) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <div className="card">
      <div
        className={`dropzone ${dragActive ? 'active' : ''}`}
        onClick=
        {() => inputRef.current.click()
        }
        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
      >
        <p>Drag & drop up to 10 resumes here (.pdf / .docx), or click to browse</p>
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.docx"
          multiple
          hidden
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {files.length > 0 && (
        <ul style= {{ marginTop: 16, paddingLeft: 16}}>
          {files.map((f, i) => (
            <li key={i} style={{ fontSize: 14, marginBottom: 4 }}>
              {f.name}{' '}
              <button onClick={() => removeFile(i)} style={{ marginLeft: 8, fontSize: 12 }}>
                remove
              </button>
            </li>
          ))}
        </ul>
      )}

      <button
        className="btn"
        style={{ marginTop: 16 }}
        disabled={files.length === 0 || loading}
        onClick={() => onParse(files)}
      >
        {loading ? 'Parsing...' : `Parse ${files.length || ''} Resume(s)`}
      </button>
    </div>
  );
}
