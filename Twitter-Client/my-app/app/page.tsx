'use client'
import React from 'react';
import Image from 'next/image'
import {BsTwitter } from 'react-icons/bs'
import {AiOutlineHome} from 'react-icons/ai'
import { BiHash} from 'react-icons/bi'
import {IoIosNotifications} from 'react-icons/io'
import {MdEmail} from 'react-icons/md'
import {BsFillBookmarksFill} from 'react-icons/bs'
import {CgProfile} from 'react-icons/cg'
import {CiCircleMore} from 'react-icons/ci'
import { GoogleLogin } from '@react-oauth/google';


import FeedCard from '@/app/components/FeedCard';



interface TwitterSidebarButton{
  title: string,
  icon: React.ReactNode;
}

const sidebarMenuItems:TwitterSidebarButton[]=[
  {
    title:"Home",
    icon: <AiOutlineHome/>,
  },
  {
    title: "Explore",
    icon: <BiHash/>,
  },
  {
    title: "Notifications",
    icon: <IoIosNotifications/>,
  },
  {
    title: "Messages",
    icon: <MdEmail/>,
  },
  {
    title: "Bookmarks",
    icon: <BsFillBookmarksFill/>,

  },
  {
    title: "Profile",
    icon:<CgProfile/>,
  },
  {
    title:"More",
    icon:<CiCircleMore/>,
  },

]

export default function Home() {

  return (
    <div  >
      <div className='grid grid-cols-12 h-screen w-screen px-56 '>
        <div className=" col-span-3 pt-1  ml-10">
        <div className="  h-fit w-fit text-3xl hover:bg-gray-600 rounded-full p-4 cursor-pointer transition-all">
        <BsTwitter  />
        </div>
        <div className=" mt-2 text-xl pr-4 " >
          <ul>
          {sidebarMenuItems.map(item=>
            <li className='flex justify-start items-center gap-4 hover:bg-gray-800 rounded-full px-2 py-4 w-fit cursor-pointer  ' key={item.title}>
              <span>{item.icon} </span>
              <span>{item.title} </span> 
            </li> 
            )}
          </ul>
          <div className='mt-5 pr-10 '>
          <button className="bg-[#1d9bf0] py-3  rounded-full w-[90%]" >Tweet </button>
          </div>
        </div>
        </div>
        
        <div className='col-span-5 border-r-[1px] border-l-[1px] border-gray-700 h-screen overflow-auto scrollbar-hide md:scrollbar-default ' >
        
          <FeedCard/>
          <FeedCard/>
          <FeedCard/>
          <FeedCard/>
          <FeedCard/>
          <FeedCard/>
          <FeedCard/>
          <FeedCard/>
          <FeedCard/>
        
        </div>
        <div className='col-span-3 p-5'>
         
          <div className='p-5 bg-slate-600 rounded-lg'>
            <h1 className='my-2 text-2xl'>New to Twitter?</h1> 
            <GoogleLogin onSuccess={(cred)=>console.log(cred)} />
       
          
          </div>
        </div>

      </div>

       </div>
    
  )
}
