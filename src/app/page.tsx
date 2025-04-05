"use client"
import React from 'react'
import BlogList from './components/BlogList'
import Header from './components/layout/Header'
import Footer from './components/layout/footer'
import { ToastContainer } from 'react-toastify'

function page() {
  return (
  <main>
    <ToastContainer theme='dark'/>
   <Header/>
   <BlogList/>
  </main>
  )
}

export default page
