"use client";
import { FaLongArrowAltRight } from 'react-icons/fa';
import { FaXTwitter, FaGooglePlusG } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Iparams {
  params: {
    id: string;
  };
}

async function fetchBlog(id: string) {
  try {
    const result = await axios.get("/api/blog", {
      params: { id } // Pass the blog ID to fetch a specific blog
    });
    return result.data.blog; // Return the fetched blog data
  } catch (error) {
    console.error("Error fetching blog data:", error);
    return null; // Return null if an error occurs
  }
}

function Page({ params }: Iparams) {
  const [data, setData] = useState<any>(null); // State to store blog data

  // Fetch blog data whenever the component mounts or params.id changes
  useEffect(() => {
    const fetchData = async () => {
      const blogData = await fetchBlog(params.id); // Fetch blog data with the provided id
      setData(blogData); // Set the fetched blog data into state
    };
    
    fetchData();
  }, [params.id]); // Run whenever params.id changes

  // If data is not yet available, show loading message
  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="bg-gray-300 py-5 px-5 md:px-12 lg:px-28">
        <div className="flex justify-between items-center">
          <div className="relative">
            <Image
              src="/logo.png" // Display logo
              alt="logo"
              width={100}
              height={100}
              loading="lazy"
            />
            <h2 className="absolute top-7 left-[69px] text-2xl font-bold">log.</h2>
          </div>
          {/* Button */}
          <button className="border border-black border-solid sm:px-6 sm:py-3 py-1 font-medium flex items-center gap-2 shadow-[-7px_7px_0px_black]">
            Get started
            <FaLongArrowAltRight className="text-xl" />
          </button>
        </div>

        {/* Blog Content */}
        <div className="my-24 text-center">
          <h1 className="text-3xl sm:text-5xl font-semibold max-w-[700px] mx-auto">{data.title}</h1>
          {/* Author Image */}
          <Image
            src={data.authorImg} // Use author image URL from API
            alt={data.author}
            width={120}
            height={120}
            className="mx-auto mt-6 border border-white rounded-full"
          />
          <p className="mt-4 text-lg">{data.category}</p>
        </div>
      </div>

      {/* Blog Image and Description */}
      <div className="mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10">
        <Image
          src={data.image} // Use blog image URL from API
          alt={data.title}
          width={1280}
          height={720}
        />
        <h1 className="py-8 text-[26px] font-semibold">Introduction:</h1>
        {/* description */}
        <div className="blog-content" dangerouslySetInnerHTML={{ __html: data.description }}></div>

        {/* Social Media Sharing Section */}
        <div className="my-24">
          <p className="text-black font-semibold my-4">Share this article on social media</p>
          <div className="flex gap-2">
            <FaFacebookF size={30} className="bg-gray-300 rounded-full p-1" />
            <FaXTwitter size={30} className="bg-gray-300 rounded-full p-1" />
            <FaGooglePlusG size={30} className="bg-gray-300 rounded-full p-1" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
