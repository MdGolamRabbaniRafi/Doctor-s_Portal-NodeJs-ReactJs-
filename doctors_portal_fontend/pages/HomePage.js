import HomeLogo from './Layout/HomeLogo';
import Link from 'next/link';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';


const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [notice, setNotice] = useState([]);
  const [error, setError] = useState('');
  const router = useRouter();
  
  useEffect(() => {
    const timer = setInterval(() => {
      const nextSlide = currentSlide === 1 ? 2 : 1;
      setCurrentSlide(nextSlide);
    }, 10000); 

    return () => {
      clearInterval(timer);
    };
  }, [currentSlide]);
  
  useEffect(() => {
    fetchData();
  }, []);
  
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/Admin/viewallnotice`);
      console.log("Backend Response:", response.data);
  
      if (Array.isArray(response.data)) {
        const noticeData = response.data;
        console.log("Notice Data:", noticeData);
  
        if (noticeData.length > 0) {
          console.log("Notice:", noticeData);
          setNotice(noticeData);
        } else {
          setError('No Notice found');
        }
      } else {
        setError('No Notice found');
      }
    } catch (error) {
      console.error('Failed:', error);
      console.log('Error Response:', error.response);
      setError('An error occurred. Please try again later.');
    }

  };

  const handleViewArticle = () => {
    router.push('../Doctor/View_article');
  };
  


    return (
      <div className='h-screen w-screen bg-white'>
      <div className="navbar bg-teal-800 py-0 shadow-xl">
      <div className="flex-1">
        <a><HomeLogo></HomeLogo></a>
        <a className="btn btn-ghost normal-case text-xl">Doctor's Portal</a>
      </div>
      <div className="flex-none ">
        <ul className="menu menu-horizontal px-1 ">
          <li className='text-lg' ><Link href="/login">Login</Link></li>
          <li className='text-lg'><Link href="/aboutUs">About us</Link></li>
   
        </ul>
      </div>
    </div>

    <div className="carousel w-full">
  <div id="slide1" className={`carousel-item relative w-full ${currentSlide === 1 ? 'block' : 'hidden'}`}>
    <img src="/doctor1.jpg" className="w-full" />
    <div class="absolute inset-0 bg-black bg-opacity-50 flex  items-center justify-center"></div>
          <div class="absolute inset-0 flex items-center justify-center">
         
            <div class="text-center">
              <h1 class="text-6xl font-serif text-white">Your health is our priority</h1>
              <p class="mt-4 font-medium text-white">CHECK FOR DOCTORS GUIDANCE</p>
              <button class="btn btn-error text-white mt-7" onClick={handleViewArticle}>
                 View Articles
            </button>
             
            </div>
          </div>
    
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
    <button onClick={() => setCurrentSlide(2)} className="btn btn-circle">❮</button>
      <button onClick={() => setCurrentSlide(2)} className="btn btn-circle">❯</button>
    </div>
  </div> 
  <div id="slide2" className={`carousel-item relative w-full ${currentSlide === 2 ? 'block' : 'hidden'}`}>
    <img src="/doctor2.jpg" className="w-full" />
    <div class="absolute inset-0 bg-black bg-opacity-50 flex  place-items-end justify-center"></div>
          <div class="absolute inset-0 flex items-center justify-center">
         
            <div class="text-center">
              <h1 class="text-6xl font-serif text-white">Your health is our priority</h1>
              <p class="mt-4 font-medium text-white">CHECK FOR DOCTORS GUIDANCE</p>
              <button class="btn btn-error text-white mt-7"onClick={handleViewArticle}>View Articles</button>
             
            </div>
          </div>
    
    
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      
    <button onClick={() => setCurrentSlide(1)} className="btn btn-circle">❮</button>
      <button onClick={() => setCurrentSlide(1)} className="btn btn-circle">❯</button>
    </div>
    
  </div> 
  
  
</div>


<div className="hero bg-gray-700 py-10">
  <div className="hero-content flex flex-col lg:flex-row-reverse items-center lg:items-start">
    <img src="/notice.gif" className="max-w-xs rounded-lg shadow-2xl lg:mr-8" />
    <div className="text-center lg:text-left mt-4 lg:mt-0">
      <h1 className="text-3xl lg:text-5xl font-bold">Box Office News!</h1>
      <p className="py-3 lg:py-6 text-base lg:text-lg">
        La vida es corta. Vive apasionadamente y siente la felicidad.
      </p>
      <Link href="Admin/Admin_NoticeBoard">
        <button className="btn btn-primary">Check Notices</button>
      </Link>
    </div>
  </div>
</div>

  









<footer className="footer p-10 bg-base-200 text-base-content">
  <div>
  <div className="avatar indicator py-3 ">
  <div className="w-20 h-20 rounded-lg">
    <img src="/docav.jpg" />
  </div>
</div>
    <p> Bangladesh Medical<br/>Providing technical health service since 1996</p>
  </div> 
  <div>
    <span className="footer-title">Services</span> 
    <a className="link link-hover" href='../Doctor/View_article'>Articles</a> 

  </div> 
  <div>
    <span className="footer-title">Company</span> 
    <a className="link link-hover"href='/aboutUs'>About us</a> 
    <a className="link link-hover">Contact</a> 
  </div> 
  <div>
    <span className="footer-title">Legal</span> 
    <a className="link link-hover">Terms of use</a> 
    <a className="link link-hover">Privacy policy</a> 
  </div>
</footer>
    

</div>
      
    );
  };
  
  export default HomePage;