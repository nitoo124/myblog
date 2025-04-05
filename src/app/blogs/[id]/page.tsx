"use client";
import { FaLongArrowAltRight } from 'react-icons/fa';
import { FaXTwitter, FaGooglePlusG } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';

interface BlogData {
  title: string;
  authorImg: string;
  author: string;
  category: string;
  image: string;
  description: string;
}

export default function BlogPage() {
  const params = useParams();
  const [data, setData] = useState<BlogData | null>(null);

  const fetchBlog = async () => {
    try {
      const result = await axios.get("/api/blog", {
        params: {
          id: params.id,
        },
      });
      setData(result.data.blog);
    } catch (error) {
      console.error("Error fetching blog data:", error);
    }
  };

  useEffect(() => {
    if (params?.id) {
      fetchBlog();
    }
  }, [params?.id]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="bg-gray-300 py-5 px-5 md:px-12 lg:px-28">
        <div className="flex justify-between items-center">
          <div className="relative">
            <Image
              src="/logo.png"
              alt="logo"
              width={100}
              height={100}
              loading="lazy"
            />
            <h2 className="absolute top-7 left-[69px] text-2xl font-bold">log.</h2>
          </div>
          <button className="border border-black border-solid sm:px-6 sm:py-3 py-1 font-medium flex items-center gap-2 shadow-[-7px_7px_0px_black]">
            Get started
            <FaLongArrowAltRight className="text-xl" />
          </button>
        </div>

        <div className="my-24 text-center">
          <h1 className="text-3xl sm:text-5xl font-semibold max-w-[700px] mx-auto">{data.title}</h1>
          <Image
            src={data.authorImg}
            alt={data.author}
            width={120}
            height={120}
            className="mx-auto mt-6 border border-white rounded-full"
          />
          <p className="mt-4 text-lg">{data.category}</p>
        </div>
      </div>

      <div className="mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10">
        <Image
          src={data.image}
          alt={data.title}
          width={1280}
          height={720}
        />
        <h1 className="py-8 text-[26px] font-semibold">Introduction:</h1>
        <div className='blog-content' dangerouslySetInnerHTML={{__html: data.description}}></div>

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