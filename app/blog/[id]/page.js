

import React from 'react';
import axios from 'axios';

export async function  generateStaticParams(){
  const res = await axios.get('http://localhost:5000/get');
  return res.data.map((item)=>({id:item._id}))

}
 async function BlogPage({params:{id}}) {
  
  const res = await axios.get(`http://localhost:5000/get/${id}`);

  const data = res.data

// this code reated to single_post




   




console.log('the content work' , data )



  return (
    <>
    
    {
      data?.content.map((x , index)=>(
        <div key={index}>
          {
            x.type === 'title1'&&(
              <h1>{x.value}</h1>
            )          }
        </div>
      ))
    }
    </>
    
  );
}

export default BlogPage;