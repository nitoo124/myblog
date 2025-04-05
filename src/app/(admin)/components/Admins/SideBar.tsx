import Image from 'next/image';
import { IoAddCircleOutline } from "react-icons/io5";
import { MdOutlineUnsubscribe } from "react-icons/md";
import { LuNotebookPen } from "react-icons/lu";
import Link from 'next/link';

function SideBar() {
  return (
    <div className='flex flex-col w-20 sm:w-64 h-screen bg-slate-100 border-r border-black fixed'>
      
      {/* Logo */}
      <div className='flex items-center justify-center sm:justify-start border-b border-black py-3 px-4'>
        <Image src="/logo.png" alt="Logo" width={50} height={50} />
        <h2 className='ml-[-10px] text-lg sm:text-2xl font-bold hidden sm:block'>log</h2>
      </div>

      {/* Sidebar content */}
      <div className='flex flex-col gap-5 mt-10 px-4'>
        
        {/* Add Blog Button */}
        <Link href='/admin/addProduct'  className='flex items-center gap-3 border-2 border-black px-3 py-2 bg-white shadow-[-5px_5px_0_black]'>
          <IoAddCircleOutline size={24} />
          <p className='font-medium text-md hidden sm:block'>Add Blog</p>
        </Link>

        {/* Blog List Button */}
        <Link href='/admin/blogList' className='flex items-center gap-3 border-2 border-black px-3 py-2 bg-white shadow-[-5px_5px_0_black]'>
          <LuNotebookPen size={24} />
          <p className='font-medium text-md hidden sm:block'>Blog List</p>
        </Link>

        {/* Subscribe Button */}
        <Link href='/admin/subscriptions' className='flex items-center gap-3 border-2 border-black px-3 py-2 bg-white shadow-[-5px_5px_0_black]'>
          <MdOutlineUnsubscribe size={24} />
          <p className='font-medium text-md hidden sm:block'>Subscribe</p>
        </Link>
      </div>
    </div>
  );
}

export default SideBar;
