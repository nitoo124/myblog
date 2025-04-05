import Image from 'next/image'
import Link from 'next/link';
import { FaLongArrowAltRight } from "react-icons/fa";

interface Iprop{
  title:string,
  description:string,
  category:string,
  image:string,
  id:string
}
function BlogItems({title, description, category,image,id}:Iprop) {
  return (
    <div key={id} className=' max-w-[330px] sm:max-w-[330px] bg-white  border border-black hover:shadow-[-7px_7px_0px_black]'>
        <Link href={`/blogs/${id}`}><Image src={image}
        alt={title}
        width={400}
        height={400}
        className=' border-b border-black'/>
        </Link>
        <p className=' ml-5 mt-5 px-1 inline-block bg-black text-white text-sm'>{category}</p>
        <div className='p-5'>
          <h5 className=' mb-2 text-lg font-medium tracking-tight text-gray-900'>{title}</h5>
          <p className=' mb-3 text-sm tracking-tight text-gray-700' dangerouslySetInnerHTML={{__html:description.slice(1,120)}}></p>
          <Link href={`/blogs/${id}`} className=' inline-flex items-center py-2 font-semibold text-center '>
            Read more <FaLongArrowAltRight className=' mt-1 ml-2'/>
          </Link>
        </div>
      
    </div>
  )
}

export default BlogItems
