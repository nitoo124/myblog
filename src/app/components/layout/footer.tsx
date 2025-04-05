import Image from 'next/image'
import { FaXTwitter,FaGooglePlusG } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";





function Footer() {
  return (
    <div className='  flex justify-around flex-col gap-2 sm:gap-0 sm:flex-row  py-5 items-center bg-gray-300'>
       
      <div className='relative flex'>
      <Image src={'/logo.png'}
      alt='logo'
      height={120}
      width={120}
     />
      <h2 className='absolute top-9 right-[-5px] text-2xl font-bold '>log.</h2>
      </div>
      <p className=' text-sm text-gray-600'>All right reserved. copyright @Blog </p>
      {/* icons */}
      <div className=' flex gap-2 '>
        <FaFacebookF className=' bg-black  text-white  rounded-full p-2' size={35} />
        <FaXTwitter className=' bg-black text-white  rounded-full p-2'size={35}  />
        <FaGooglePlusG className=' bg-black text-white rounded-full p-2'size={35}  />

      </div>

    </div>
  )
}

export default Footer
