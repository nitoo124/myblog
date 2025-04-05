import Image from 'next/image'
import React from 'react'

interface IBlogs{
  author:string
  authorImg:string
  date:string
  title:string
  id:string
  deleteBlog:Function
  }
function BlogTableItem({ authorImg, author, title,id,date,deleteBlog }: IBlogs) {
  return (
    <tr className='bg-white border-b'>
      {/* Author Section */}
      <th
        scope='row'
        className='items-center gap-3 hidden sm:flex px-6 py-4 font-medium text-gray-900 '
        >
        <Image
          src={authorImg ? authorImg : '/logo.png'}
          alt='author image'
          width={40}
          height={40}
        />
        <p>{author ? author : 'No Author'}</p>
      </th>
      
      {/* Blog Title Section */}
      <td className='px-6 py-4'>
        {title ? title : 'No title'}
      </td>
      
      {/* Blog Date Section */}
      <td className='px-6 py-4'>
        {'28 mar 2025'}
      </td>
      
      {/* Action Section */}
      <td onClick={()=>{deleteBlog(id)}} className='px-6 py-4 cursor-pointer font-bold text-2xl'>
        x
      </td> 
    </tr>
  )
}

export default BlogTableItem
