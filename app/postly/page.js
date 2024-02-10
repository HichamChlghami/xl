"use client"

import { useEffect, useState } from 'react';
import axios from 'axios';

function DatabaseComponent() {
  const [data, setData] = useState([]);
  // const shuffleArray = array => {
  //   for (let i = array.length - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1));
  //     [array[i], array[j]] = [array[j], array[i]];
  //   }
  //   return array;
  // };
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:5000/get');
  //       console.log('Received Data:', response.data);

  //       // Set the received data to state
  //       // setData(response.data.reverse());
  //       setData(shuffleArray(response.data.slice()));
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/get');
      console.log('Received Data:', response.data);
      // Set the received data to state
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Function to shuffle the array (example function)
  const shuffleArray = (array) => {
    // Logic to shuffle array elements

    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    // Fetch initial data on component mount
    fetchData();

    // Update data every 24 hours
    const interval = setInterval(() => {
      // Fetch new data
      fetchData();
    }, 24 * 60 * 60 * 1000); // 24 hours in milliseconds

    // Clear interval on component unmount or cleanup
    return () => clearInterval(interval);
  }, []); // Empty dependency array to run effect only once on mount
  return (



    
      <div>
        <h1>Database Component</h1>
        {data.map((content, index) => (
          <div key={index}>
            {content.content.map((item, i) => ( // Using content.content to access the inner array
              <div key={i}>
                {item.type === 'title' && <p>{item.value}</p>}
                
                {/* {item.type === 'text' && <p>{item.value}</p>} */}
                {item.type === 'text' && 
                // <p>dangerouslySetInnerHTML={{ __html: item.value }}</p>
                // <p dangerouslySetInnerHTML={{ __html: item.value}} />
                <p dangerouslySetInnerHTML={{ __html: item.value ? item.value.split(' ').slice(0, 17).join(' ') + '...'
                 :item.value }} />

                }

                {item.type === 'image' && <img src={`/${item.value}`} alt={`Image ${i}`} />} {/* Added alt attribute */}
              </div>
            ))}
          </div>
        ))}
      </div>
  
    
  );
}

export default DatabaseComponent;
