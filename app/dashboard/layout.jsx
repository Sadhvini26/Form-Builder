import { SignedIn } from '@clerk/nextjs'
import React from 'react'
import SideNav from './_components/SideNav'
function DashboardLayout({children}) {
  return (
    <div className='flex'>
    <SignedIn>
    <div><SideNav/></div>
    <div>
      {children}
      
    </div>
    </SignedIn>
    </div>
  )
}

export default DashboardLayout
