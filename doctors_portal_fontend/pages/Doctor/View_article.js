import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import HeaderForLoggedin from '../Layout/LoggedinHeader';
import FooterForLoggedin from '../Layout/LoggedinFooter';
import Link from 'next/link';
import NavigationBarLoggedin from "../Layout/LoggedinNavbar"



export default function Notification() {
  const [notifications, setArticle] = useState([]);
  const [error, setError] = useState('');
  const router = useRouter();


  const handleBackClick = () => {
    router.push('/');
  };
  useEffect(() => {
    fetchData();
  }, []);
  
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/Doctor/viewArticle`)
      console.log("Backend Response:", response.data);
  
      if (Array.isArray(response.data)) {
        const ArticleData = response.data;
        console.log("ArticleData Data:", ArticleData);
  
        if (ArticleData.length > 0) {
          console.log("setArticle:", ArticleData);
          setArticle(ArticleData);
        } else {
          setError('No ArticleData found');
        }
      } else {
        setError('No ArticleData found');
      }
    } catch (error) {
      console.error('Failed:', error);
      console.log('Error Response:', error.response);
      setError('An error occurred. Please try again later.');
    }
  };
  
  

  return (

    <div>
    {/* <HeaderForLoggedin></HeaderForLoggedin> */}
    <NavigationBarLoggedin></NavigationBarLoggedin>

      <h1>Articles</h1>
      {error && <p>{error}</p>}
      <ul>
        {notifications.map(Article => (
          
          <li>
            Name: {Article.name}<br />
            Link:<Link href={Article.Link}>{Article.Link}</Link><br></br>
            Date: {Article.Publish_date}<br />
            Time: {Article.Publish_time}<br />
            <br></br>

          </li>
          
        ))}
      </ul>
      <input type="submit" value="Back" onClick={handleBackClick} />

    </div>
  );
}
