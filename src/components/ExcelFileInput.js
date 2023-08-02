import React from 'react';
import * as XLSX from 'xlsx';

const ExcelFileInput = ({ onDataExtracted }) => {
  const handleChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      console.error('Error: No file selected.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        if (worksheet && worksheet['!ref']) {
          // Convert the worksheet to an array of arrays
          const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

          // Filter out empty rows (rows with all cells empty are considered empty)
          const nonEmptyRows = rows.filter((row) => row.some((cell) => cell !== ''));

          // Convert the filtered rows (excluding header) to JSON
          const jsonData = [];
          for (let i = 1; i < nonEmptyRows.length; i++) {
            const rowObj = {};
            for (let j = 0; j < nonEmptyRows[i].length; j++) {
              const cellValue = nonEmptyRows[i][j];
              const headerValue = nonEmptyRows[0][j];
              rowObj[headerValue] = cellValue;
            }
            jsonData.push(rowObj);
          }

          onDataExtracted(jsonData);
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

  return (
    <div>
      <input type="file" accept=".xlsx, .xls" onChange={handleChange} />
    </div>
  );
};

export default ExcelFileInput;
