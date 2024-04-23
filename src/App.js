import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import defaultImage from "./assets/default.png";


function App() {
  const [query, setQuery] = useState('');
  const [libraries, setLibraries] = useState([]);

  // function to compare two request sizes
  function determineLargerRequest(request1, request2) {
    // convert requests to JSON strings and compare their lengths
    const request1Size = JSON.stringify(request1).length;
    const request2Size = JSON.stringify(request2).length;

    console.log(request1Size, request2Size);

    // compare sizes and return largest
    if (request1Size > 0) {
      return request1;
    } else if (request2Size > 0) {
      return request2;
    }
  }
  const getImage = (library) => {
    return library.coverPhoto && library.coverPhoto.medium ? library.coverPhoto.medium.url : defaultImage;
  };


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
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
      </style>
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
            <p>{library.address.city}, {library.address.street}, {library.address.zipcode}</p>
            <img className='library-image' src={getImage(library)} alt={library.name}></img>
            <p>{library.part_of_city}</p>
          </div>
        ))}
      </div>
    </div>
  );
}



export default App;
