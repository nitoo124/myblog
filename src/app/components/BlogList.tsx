"use client"
import BlogItems from "./BlogItems"
import { useEffect, useState } from "react"
import axios from "axios"


interface IBlogs{
author:string
authorImg:string
category:string
date:string
description:string
image:string
title:string
_id:string
}
function BlogList() {
  const [menu, setMenu] = useState("All")
  const [blogs, setBlogs] = useState<IBlogs[]>([]);
  const fetchBlogs = async()=>{
    const response =await axios.get('/api/blog');
    setBlogs(response.data.blogs)
    console.log(response.data.blogs)
  }
  useEffect(()=>{
    fetchBlogs()
  },[])
  return (
    <div>
      <div className=" flex justify-center gap-6 my-10">
        <button onClick={()=>setMenu("All")} className={menu === "All"?"bg-black text-white py-1 px-4 rounded-sm":""}>All</button>
        <button onClick={()=>setMenu("Technology")} className={menu === "Technology"?"bg-black text-white py-1 px-4 rounded-sm":""}  >Technology</button>
        <button onClick={()=>setMenu("Startup")} className={menu === "Startup"?"bg-black text-white py-1 px-4 rounded-sm":""}>Startup</button>
        <button onClick={()=>setMenu("LifeStyle")} className={menu === "LifeStyle"?"bg-black text-white py-1 px-4 rounded-sm":""}>LifeStyle</button>

      </div>

      <div className=" flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-24">
        {
          blogs.filter((item)=>menu === "All"?true:item.category ===menu).map((item,idx)=>{
            return <BlogItems key={idx} id={item._id} title={item.title} description={item.description}  category={item.category} image={item.image} />
          })
        }

      </div>

      
    </div>
  )
}

export default BlogList
