"use client"
import axios from 'axios';
import Image from 'next/image';
import { useState } from 'react';
import { FaLongArrowAltRight } from "react-icons/fa";
import { toast } from 'react-toastify';

const Header = () => {
  const [email, setEmail] = useState<string>("");

  // Type for the response of the API call
  interface ApiResponse {
    success: boolean;
    msg: string;
  }

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    // Ensure email is not empty before making request
    if (!email) {
      toast.error('Please enter a valid email');
      return;
    }

    try {
      const response = await axios.post<ApiResponse>("/api/email", { email });

      if (response.data.success) {
        toast.success(response.data.msg);
        setEmail("");
      } else {
        toast.error("Error: " + response.data.msg);
      }
    } catch (error) {
      toast.error('Something went wrong!');
    }
  };

  return (
    <header className=' p-5 md:px-12 lg:px-20 bg-gray-300'>
      <div className=' flex justify-between px-3 w-full items-center '>

        {/* logo */}
        <div className=' relative flex '>
          <Image
            src="/logo.png"
            alt="logo"
            width={100}
            height={100}
          />
          <h2 className='absolute top-7 right-[-10px] text-2xl font-bold '>log.</h2>
        </div>

        {/* button */}
        <button className=' border border-black border-solid sm:px-6 sm:py-3 py-1 font-medium flex items-center gap-2 shadow-[-7px_7px_0px_black] '>
          Get started
          <FaLongArrowAltRight className=' text-xl'/>
        </button>
      </div>

      {/* heading */}
      <div className=' text-center my-8'>
        <h1 className='text-3xl sm:text-5xl font-medium '>Latest Blogs</h1>
        <p className='mt-10 max-w-[740px m-auto text-xs sm:text-base]'>Welcome to my blog! Explore engaging content on tech, coding, and more—powered by Next.js and Tailwind CSS.</p>

        <form onSubmit={onSubmitHandler} className=' flex justify-between max-w-[500px] scale-75 sm:scale-100 mx-auto mt-10 border border-black shadow-[-7px_7px_0px_black]'>
          <input 
            onChange={(e) => setEmail(e.target.value)} 
            value={email} 
            type="email" 
            placeholder='Enter your email' 
            className=' pl-4 outline-none' 
          />
          <button type='submit' className='border-l py-4 px-2 md:px-8 active:bg-gray-600 active:text-white'>
            Subscribe
          </button>
        </form>
      </div>
    </header>
  );
};

export default Header;
