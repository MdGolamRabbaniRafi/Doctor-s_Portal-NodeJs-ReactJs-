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
      const response = await axios.get(`http://localhost:3000/Doctor/viewArticle`);
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
    <div className="bg-gray-100 min-h-screen">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-semibold mb-4">Articles</h1>
        {notifications.length > 0 && (
          <p className="text-gray-500 mb-8">
            <span className="text-lg font-semibold">Total Articles:</span> {notifications.length}
          </p>
        )}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <ul className="space-y-4">
          {notifications.map((Article, index) => (
            <li className="border p-4 rounded-md bg-white shadow-md relative flex">
              <div className="w-7 h-7 bg-blue-500 text-white rounded-full flex items-center justify-center text-xl mr-4">
                {index + 1}
              </div>
              <div className="flex-1">
                <div className="text-lg font-semibold mb-2">Name: {Article.name}</div>
                <div className="mb-2">
                  Link: <Link href={Article.Link}>{Article.Link}</Link>
                </div>
              </div>
              <div className="self-end text-gray-800 ">
                <p>Date: {Article.Publish_date}</p>
                <p>Time: {Article.Publish_time}</p>
              </div>
            </li>
          ))}
        </ul>
        <button
          onClick={handleBackClick}
          className="mt-8 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300"
        >
          Back
        </button>
      </div>
    </div>
  );
}
