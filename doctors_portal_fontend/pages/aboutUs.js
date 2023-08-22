import React from 'react';

function MeetTheTeam() {
  return (
    <div className="hidden sm:block">
      <div className="mt-7 ml-8 mr-8 relative">
        <img src="/bgp.jpg" alt="" />
      
        <div className="absolute inset-0 bg-black bg-opacity-50  items-center justify-center">
          <h1 className="font-bold text-5xl text-gray-300 mt-20 text-center">Meet our team</h1><br />
          <p className="font-bold text-sm text-white text-center">Students of American International University of Bangladesh <br />
          Final Project of Advance Web Technology.</p>
          
          <div className="ml-8 flex gap-16 mt-10 items-center justify-center">         
            <div className="text-center">
              <img src="/rafi.jpg" alt="" className="w-32 h-32 rounded-full mx-auto" />
              <h3 className="font-bold text-xl text-white">Golam Rabbani Rafi</h3>
              <p className="text-sm text-white">Software Engineer</p>
              <div className="flex gap-2 mt-2">
                <i className="fa-brands fa-facebook bg-red-500"></i>
                <i className="fa-brands fa-twitter bg-red-500"></i>
                <i className="fa-brands fa-linkedin bg-red-500"></i>
              </div>
            </div>
            <div className="text-center">
              <img src="/faris.jpg" alt="" className="w-32 h-32 rounded-full mx-auto" />
              <h3 className="font-bold text-xl text-white">Mir Faris</h3>
              <p className="text-sm text-white">Software Engineer</p>
              <div className="flex gap-2 mt-2">
                <i className="fa-brands fa-facebook bg-red-500"></i>
                <i className="fa-brands fa-twitter bg-red-500"></i>
                <i className="fa-brands fa-linkedin bg-red-500"></i>
              </div>
            </div>
            <div className="text-center">
              <img src="/sohan.jpg" alt="" className="w-32 h-32 rounded-full mx-auto" />
              <h3 className="font-bold text-xl text-white">Mehedi Hassan Shohan</h3>
              <p className="text-sm text-white">Software Engineer</p>
              <div className="flex gap-2 mt-2">
                <i className="fa-brands fa-facebook bg-red-500"></i>
                <i className="fa-brands fa-twitter bg-red-500"></i>
                <i className="fa-brands fa-linkedin bg-red-500"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MeetTheTeam;
