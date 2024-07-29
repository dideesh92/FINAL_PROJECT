import React from 'react'
import adminpic from '../assets/navpic.png'
import home from '../assets/bghome.png'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <>
      <div>
    <img className="w-[100%] h-[30%]" src={home} alt=""/>
    <div>
    <h1 className="text-5xl ml-[4%] text-fuchsia-800 text mt-[-50%] font-crimson font-Bold 700 font-semibold animate-pulse">Welcome to Walmart</h1>
    <h1 className="text-l ml-[5%] text-violet-800 origin-center hover:origin-top font-serif animate-bounce">To generate your invoice click create invoice button below</h1><br/>
    <button className="border-solid  mt-[-40%]   bg-yellow-300  rounded-full text-white w-70 h-25 py-2 px-20 ml-[7%] animate-pulse hover:scale-125 transition-all duration-500 cursor-pointer "><a href="/bill">Creat New Invoice</a></button>
    </div>
    </div>
    <div className='mt-[32%]'></div>
    <Footer/>                   

    </>
  )
}

export default Home