const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');

//mammoth -> word doc read
//pdfParse -> pdf read

async function extractText(filePath){
  const ext = path.extname(filePath).toLowerCase();
  const buffer = fs.readFileSync(filePath);

  if(ext === '.pdf'){

    const data = await pdfParse(buffer);
    return cleanText(data.text);

  }

  if(ext === '.docx'){
    const result = await mammoth.extractRawText({ buffer });
    return cleanText(result.value);
  }

  throw new Error(`Unsupported file extension: ${ext}`);
}

function cleanText(rawText) {
  return rawText
    .replace(/\r\n/g, '\n')
    .replace(/[•●▪‣◦]/g, '-')     
    .replace(/[ \t]+/g, ' ')       
    .replace(/\n{3,}/g, '\n\n')    
    .split('\n')
    .map((line) => line.trim())
    .join('\n')
    .trim();
}


module.exports = { extractText };
