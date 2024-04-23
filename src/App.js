import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [libraries, setLibraries] = useState([]);

  // function to compare two request sizes
  function determineLargerRequest(request1, request2) {
    // Convert requests to JSON strings and compare their lengths
    const request1Size = JSON.stringify(request1).length;
    const request2Size = JSON.stringify(request2).length;

    console.log(request1Size, request2Size);
  
    // Compare sizes and return largest
    if (request1Size > 0) {
      return request1;
    } else if (request2Size > 0 ) {
      return request2;
    }
  }

  const fetchLibraries = async () => {
    try {
      const response1 = await axios.get(`https://api.kirjastot.fi/v4/library?city.name=${query}`);
      const response2 = await axios.get(`https://api.kirjastot.fi/v4/library?name=${query}`);

      const response = determineLargerRequest(response1, response2);

      setLibraries(response.data.items);
    } catch (error) {
      console.error('Error fetching library data: ', error);
    }
  };

  return (
    <div className="App">
      <input
        type="text"
        placeholder="Enter a library or city name"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={fetchLibraries}>Search</button>
      <div>
        {libraries.map((library, index) => (
          <div key={index} className="library">
            <h2>{library.name}</h2>
            <p>{library.city}, , {library.slug}</p>
            <p>{library.image}</p>
            <img src={library.image} alt={library.name} style={{ width: '100px', height: '100px' }}/>
            <p>{library.city}, {library.part_of_city}</p>
          </div>
        ))}
      </div>
    </div>
  );
}



export default App;
