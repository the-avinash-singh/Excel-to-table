import { useState } from 'react';
import './App.css';
import ExcelFileInput from './components/ExcelFileInput';

function App() {
  const[jsonData,setJsonData]=useState(null);

  const handelData=(data)=>{
    setJsonData(data);
  }
  console.log(jsonData);
  return (
    <div className="App">
      <h1 className='my-6 font-bold text-4xl'>Excel to Json convertor</h1>
      <ExcelFileInput onDataExtracted={handelData}/>
      <div className="shadow overflow-hidden rounded border-b border-gray-200">
      <table className="min-w-full bg-green-200 text-left text-sm font-light" >
        <tbody>
      {jsonData&& 
      jsonData.map((row)=>(
        <tr className='border-b dark:border-neutral-500'>
        {row.map((data)=>(
          <td className='whitespace-nowrap px-6 py-4 border-l'>{data}</td>
        ))}
        </tr>
      ))
      }
      </tbody>
      </table>
      </div>
    </div>
  );
}

export default App;
