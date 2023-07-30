import React, { useState } from 'react';
import * as XLSX from 'xlsx';

const ExcelFileInput = ({ onDataExtracted }) => {
  const handleChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        if (worksheet && worksheet['!ref']) {
          const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
          onDataExtracted(json);
        } else {
          console.error('Error: The Excel file is empty or invalid.');
        }
      } catch (error) {
        console.error('Error reading the Excel file:', error);
      }
    };

    // FileReader error handling
    reader.onerror = (e) => {
      console.error('FileReader error:', e.target.error);
    };

    reader.readAsArrayBuffer(file);
  };
  const [input,setInput]=useState("");
  const clicked=()=>{
    setInput("");
  }

  return (
    <div>
      <input type="file" accept=".xlsx, .xls" value={input} onChange={handleChange} onClick={clicked} className='my-7'/>
    </div>
  );
};

export default ExcelFileInput;
