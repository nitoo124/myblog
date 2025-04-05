"use client"
import React, { useEffect, useState } from 'react'
import BlogTableItem from '../../components/Admins/BlogTableItem'
import axios from 'axios'
import { toast } from 'react-toastify'

interface IBlogs {
  author: string
  authorImg: string
  content: string
  date: string
  title: string
  _id: string
}

function BlogListPage() {
  const [blog, setBlog] = useState<IBlogs[]>([])

  const fetchblog = async () => {
    const response = await axios.get("/api/blog")
    setBlog(response.data.blogs)
    console.log(response.data.blogs)
  }

  const deleteBlog = async (mongoId:string)=>{
    const response = await axios.delete('/api/blog',{
      params:{
        id:mongoId
      }
    })
    toast.success(response.data.msg)
    fetchblog()
   
  }

  useEffect(() => {
    fetchblog()
  }, [])

  return (
    <div className='ml-[20%] sm:ml-[30%] md:ml-[30%] lg:ml-[25%] min-h-screen pt-5 max-w-screen-xl px-5 sm:pt-12 sm:pl-16 '>
      <div className='w-full max-w-6xl'>
        <h1 className='text-center text-2xl sm:text-3xl font-semibold'>All blogs</h1>
        <div className='relative mt-4 border border-gray-400'>
          {/* Scrollable container with responsive overflow */}
          <div className="overflow-x-auto  overflow-y-auto">
            <table className='w-full text-sm text-gray-500'>
              <thead className='text-sm text-gray-700 text-left uppercase bg-gray-50'>
                <tr>
                  <th scope='col' className='hidden sm:block px-6 py-3'>
                    Author name
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Blog Title
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Blog Date
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  blog.map((item) => (
                    <BlogTableItem
                      key={item._id}
                      id={item._id}
                      title={item.title}
                      author={item.author}
                      authorImg={item.authorImg}
                      date={item.date}
                      deleteBlog={deleteBlog}
                      
                     
                     
                    />
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogListPage
