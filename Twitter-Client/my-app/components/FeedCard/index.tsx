import Image from 'next/image'
import React from 'react'
import {BiMessageRounded} from 'react-icons/bi'
import {AiOutlineRetweet} from 'react-icons/ai'
import {AiOutlineHeart} from 'react-icons/ai'
import {FiShare} from 'react-icons/fi'

 const FeedCard= ()=> {
  return (
    <div className='border border-t-0 border-r-0 border-l-0 border-b-0 border-gray-600 p-5 hover:bg-slate-900 transition-all cursor-pointer'>
        <div className="grid grid-cols-12 gap-3" >
            <div className='col-span-1' >
                <Image src="https://avatars.githubusercontent.com/u/38185121?v=4 "
                 alt='user-image' height={50} width={50}/>
                 
            </div>
            <div className='col-span-11'>
            <h1>Saunvid</h1>
            <p className= " text-sm">
            Highly focused individual pursuing Master of Science (MS) in Computer Science. Software Engineer with 1+ years of work experience facilitating cutting-edge engineering solutions with a wide range of e-commerce application and technology skills. 
            </p>
            <div className='flex justify-between mt-5 text-xl items-center p-2 w-[90%] '>
                <div>
                    < BiMessageRounded/>
                </div>
                <div>
                    <AiOutlineRetweet/>
                </div>
                <div>
                    <AiOutlineHeart />
                </div>
                <div>
                    <FiShare/>
                </div>
            </div>
            </div>


        </div>
    </div>
  )
}

export default FeedCard