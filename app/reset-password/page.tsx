'use client'
import { Footer } from '@/components/Footer'
import { Navbar } from '@/components/Navbar'
import { ResetPassword } from '@/components/ResetPassword'
import React from 'react'

const resetPassword = () => {
  return (
    <>
      <Navbar />
      <ResetPassword />
      <Footer />
    </>
   
  )
}

export default resetPassword
