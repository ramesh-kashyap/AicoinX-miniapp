import { useState, useEffect }from 'react';
import { ThreeDots } from 'react-loader-spinner';
export default function Loader() {
  return (
<div className="spinner-container">

      {/* <ThreeDots
visible={true}
height="80"
width="80"
color="#f95959"
radius="9"
ariaLabel="three-dots-loading"
wrapperStyle={{}}
wrapperClass=""
/> */}
<video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover", // Ensures full coverage
          zIndex: -1, // Places video behind content
        }}
      >
        <source src="../assets/img/loader.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
{/* <img src="../assets/img/loader.jpg" alt="loader" style={{height:540 }}/> */}

  </div>
  )
}
