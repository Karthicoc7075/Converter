import React,{useState} from 'react'
import "./manage.css";
import { saveAs } from "file-saver";
import fileImage from '../../assets/images/file.png'

import infoIcon from '../../assets/Info icon.png'

function Manage() {
      const [file, setFile] = useState(null);
        const [isOpenTable, setIsOpenTable] = useState(false);
        const [tableData, setTableData] = useState([]);
   const date = new Date();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const monthNumber = month < 10 ? `0${month}` : month;
  const dayNumber = day < 10 ? `0${day}` : day;
  const [editedCells, setEditedCells] = useState({});



const handleFileUpload = (e) => {
  const file = e.target.files[0];

  if (!file) {
    console.log("No file selected");
    return;
  }

  const reader = new FileReader();

  reader.onload = (event) => {
    const textData = event.target.result;
    const rowData = textData.split("\n").map((line) => line.split(",").filter(item => item.trim() !== "").slice(1)).filter(row => row.length > 0);
    
    
    console.log(rowData);

    setFile(file);
    setIsOpenTable(true);
    setTableData(rowData);  
  };

  reader.readAsText(file); 
};


const handleChange = (rowIndex, cellIndex, value) => {
  const newData = [...tableData];
  newData[rowIndex][cellIndex] = value;
  setTableData(newData);

  // mark cell as edited
  setEditedCells((prev) => ({
    ...prev,
    [`${rowIndex}-${cellIndex}`]: true,
  }));
};
  const handelFileClose = () => {
    setFile(null);
      setEditedCells({});
      setIsOpenTable(false);
      setTableData([]);

  }


  const handleSaveFile = () => {
    if (!tableData || tableData.length === 0) {
      alert("No file  data to save");
      return;
    }
    let FinalData=[]
     tableData.forEach((row,i) => {
      let temp = "N,,"
      row.forEach((cell, j) => {
        if(j===0 || j===1 || j===5 || j===6 || j===7 ){
          temp = temp + cell +","
        }else if(j===2 || j===3){
          temp = temp + cell +",,,,,,,,,"
        }else if(j===4){
          temp = temp + cell +",,"
        } 
        else if(j===8){
          temp = temp + cell + '\n'
        }
      })
      FinalData.push(temp)
    })

    console.log(FinalData);

     const isTrue = window.confirm(
      "Do you want to save this data ?"
    );

        if (isTrue) {
          const textData = FinalData.join("");
          const blob = new Blob([textData], { type: "text/plain;charset=utf-8" });
          saveAs(blob, `Plato SCX ${dayNumber}${monthNumber}.2.txt`);
          alert("File downloaded successfully");
        }
    
  };


  const handleCreateTable = () => {
    setIsOpenTable(true);
    const newRow = Array(9).fill(""); 
    setTableData([...tableData, newRow]);
  }



  return (
        <div className="manage-page ">
      {
            !file && !isOpenTable  &&
      <div className="card">
        <div className="card-content">
         
          <h1>Manage File Converter</h1>
           
           <div>
            <button
            style={{
               background: "linear-gradient(90deg, rgb(152, 156, 248) 0%, rgb(172, 142, 240) 100%)",
               color: "white",
               marginBottom: ".6rem",
               width: "100%",

            }}
            onClick={() => handleCreateTable()}  >New table</button>
            
           </div>

           <p style={{
            fontWeight: "700",color: "#a2a2a2",
            textAlign: "center", margin: ".6rem 0"}} >OR</p>
       
           <div>
              <div className="upload-file-container" >
              <input
                type="file"
                accept=".txt"
                onChange={(e) => handleFileUpload(e)}
              />
             <div className="file-icon-container">
                <img className="file-icon" src={fileImage} alt="File Icon" />
              </div>
              <p>Drop & Drop or</p>
              <p><span>click to choose</span> your file.</p>
            </div>
           <div className='info-container' >
             <img className="info-icon" src={infoIcon} alt="Info" />
              <p>Support file: .txt</p>
            </div>
            </div>


          
         
        </div>
      </div>}
      {  isOpenTable &&
       <div className='table-model' >
          <div className='table-button-container' >
              <button
              style={{
                background: "#4CAF50",
                color: "white",
              }}
  onClick={() => {
    const newRow = Array(9).fill(""); // 9 empty cells for your table
    setTableData([...tableData, newRow]);
  }}
>
  + Add Row
</button>
              <button 
              style={{
                 background: "linear-gradient(90deg, rgb(152, 156, 248) 0%, rgb(172, 142, 240) 100%)",
                color:"white",
              }}
              onClick={handleSaveFile} className='save-btn' >Save</button>
              <button
              style={{
                background: "#ff4d4f",
                color: "white",
              }}
              className='close-btn' onClick={handelFileClose} >Close</button>

          </div>
                <div
  style={{
    maxHeight: "70vh",
    overflowY: "auto",
    borderRadius: "10px",
    backgroundColor: "#fff",
    padding: "2rem"
  }}
>
  <table
    style={{
      width: "100%",
      borderCollapse: "collapse",
      borderRadius: "10px",
      minWidth: "900px",
    }}
  >
    <thead
      style={{
        position: "sticky",
        top: 0,
        backgroundColor: "#e2dddd",
        zIndex: 1,
      }}
    >
      <tr>
        <th style={{padding:"8px"}} > No</th>
        <th>Account Number</th>
        <th>Amount</th>
        <th>Company</th>
        <th>Remarks</th>
        <th>Date</th>
        <th>IFSC</th>
        <th>Bank</th>
        <th>Branch</th>
        <th>Email</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {tableData && tableData.map((row, rowIndex) => (
        <tr
          key={rowIndex}
          style={{
            backgroundColor: rowIndex % 2 === 0 ? "#fff" : "#f9f9f9",
            transition: "background-color 0.2s",
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#e6f7ff"}
          onMouseLeave={(e) =>
            e.currentTarget.style.backgroundColor =
              rowIndex % 2 === 0 ? "#fff" : "#f9f9f9"
          }
        >
       
              <td
              style={{
                padding: "6px 8px",
                border: "1px solid #ddd",
                backgroundColor: editedCells[`${rowIndex}}`]
                  ? "#fff7c0" 
                  : "transparent",
              }}>
                {rowIndex + 1}
              </td>
            
         
          {row.map((cell, cellIndex) => (
             <td
              key={cellIndex}
              style={{
                padding: "6px 8px",
                border: "1px solid #ddd",
                backgroundColor: editedCells[`${rowIndex}-${cellIndex}`]
                  ? "#fff7c0" // yellow for edited
                  : "transparent",
              }}
            >
              <input
                type="text"
                value={cell}
                onChange={(e) => handleChange(rowIndex, cellIndex, e.target.value)}
                style={{
                  width: "100%",
                  border: "none",
                  outline: "none",
                  backgroundColor: "transparent",
                }}
              />
            </td>
          ))}

           <td style={{ padding: "6px 8px", border: "1px solid #ddd" }}>
        <div
          onClick={() => {
            const newData = [...tableData];
            newData.splice(rowIndex, 1); // remove this row
            setTableData(newData);
          }}
          
        >
          <svg fill="#ff4d4f"  xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 30 30">
    <path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"></path>
</svg>
        </div>
      </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
                </div>}
    </div>
  )
}

export default Manage