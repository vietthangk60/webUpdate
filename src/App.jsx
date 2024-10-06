import { useState,useEffect } from 'react'
//import React, { useState, useEffect } from 'react';
import './App.css'

function App() {
  const [tableData, setTableData] = useState([]); // State for storing table data
  const [error, setError] = useState(null);
  const [newRow, setNewRow] = useState({ key1: '', key2: '' }); // State for the new row input

  useEffect(() => {
    // Function to call the POST API
    const postData = async () => {
      try {
        const response = await fetch('https://mp2u1iezjk.apigw.ntruss.com/actionWeb_118/api_actionWeb/json?blocking=true&result=true', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "name": "12",
          }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        console.log("dataa",result.body)
        // Update table data with API response
        setTableData((prevData) => [
          ...prevData,
          JSON.parse(result.body), // Add new result to existing table data
        ]);
      } catch (error) {
        setError(error.message);
      }
    };

    // Initial POST request when the component mounts
    postData();

    // Set up interval to call the POST API every 5 seconds
    const intervalId = setInterval(postData, 5000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures it runs once on mount

  // Handle input change for adding new rows manually
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRow((prevRow) => ({ ...prevRow, [name]: value }));
  };

  // Handle adding a new row manually
  const handleAddRow = () => {
    setTableData((prevData) => [...prevData, newRow]);
    setNewRow({ key1: '', key2: '' }); // Reset form after adding
  };

  return (
    <div>
      <h3> Data Table Update 5s</h3>
      {error && <p>Error: {error}</p>}
      
  
      {/* Render table with data */}
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Value 1</th>
            <th>Value 2</th>
            <th>Value 3</th>
            <th>Value 4</th>
            <th>Value 5</th>
            <th>Value 6</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {tableData.length > 0 ? (
            tableData.map((item, index) => (
             // console.log(typeof (item))
              //console.log(item.deviceId)
              <tr key={index}>
                <td>{item.id || index + 1}</td> {/* ID: Can be auto-generated or from API */}
                <td>{item.deviceId}</td> {/* key1 from the API or user input */}
                <td>{item.deviceType}</td> {/* key2 from the API or user input */}
                <td>{item.value}</td>
                <td>{item.battery}</td>
                <td>{item.date}</td>
                <td>{item.time}</td>
                <td>{new Date().toLocaleTimeString()}</td> {/* Timestamp */}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">Loading...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App
