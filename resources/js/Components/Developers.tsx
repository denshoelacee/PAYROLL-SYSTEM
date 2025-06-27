import React from 'react'
import denshodeveloper from '/resources/images/chatgepetee.png';
import tayonsdeveloper from '/resources/images/tayonsss.png';
import laniedeveloper from '/resources/images/lanie.png';
import { FaFacebook,FaLinkedin} from "react-icons/fa";

export function Developers() {
  return (
    <>
    {/*<div className="p-5 flex flex-col overflow-y-auto md:flex-row justify-evenly items-center gap-5 pt-5 md:p-0 ">
        <div className='h-full w-full py-5 bg-green-400 rounded-2xl bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100'>
                <img src={denshodeveloper} alt="densho" className="w-[330px] h-[300px]" />
            <div className="flex flex-col text-center text-white bg-inherit">
                <p>Deniel D. Ybañez </p>
                <p className='text-xl'>Frontend Developer</p>
            </div>
        </div>
        <div className='h-full w-full py-5 bg-green-400 rounded-2xl bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100'>
            <img src={tayonsdeveloper} alt="tayons" className="w-[330px] h-[300px]" />
            <div className="flex flex-col text-center text-white bg-inherit">
                <p>John Mark G. Tayone</p>
                <p className='text-xl'>Backend Developer</p>
            </div>
        </div>
        <div className='h-full w-full py-5 bg-green-400 rounded-2xl bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100'>
            <img src={laniedeveloper} alt="tayons" className="w-[300px] h-[300px]" />
            <div className="flex flex-col text-center text-white bg-inherit">
                <p>Lanie P. Payot</p>
                <p className='text-xl'>Documenation</p>
            </div>
        </div>
    </div>*/}
    <div className=' md:flex pb-12 gap-14'>
        <div className="relative group w-[250px] h-[300px]">
            <img
                src={denshodeveloper}
                alt="densho"
                className="w-full h-full grayscale group-hover:grayscale-0 transition duration-500"
            />
            <div className="w-full opacity-0 group-hover:opacity-100 transition duration-500 absolute top-52 h-24 text-center bg-[#16423C] z-10 text-white">
                <p className="pt-2">Deniel D. Ybañez</p>
                <p>Frontend Developer</p>
                <div className='flex justify-center gap-3 py-1'>
                    <a href="https://www.facebook.com/sgwykdn" target="_blank" rel="noopener noreferrer">
                        <FaFacebook className='text-2xl' color="#1877F2" />
                    </a>
                    <a href="https://www.facebook.com/sgwykdn" target="_blank" rel="noopener noreferrer">
                        <FaLinkedin className='text-2xl' color="#1877F2"/>

                    </a>
                    <a href="https://www.facebook.com/sgwykdn" target="_blank" rel="noopener noreferrer">
                        <FaFacebook className='text-2xl' color="#1877F2" />
                    </a>
                </div>
            </div>
        </div>
        <div className=' relative group w-[250px] h-[300px]'>
            <img src={laniedeveloper}alt="lanie" className="w-[300px] h-[300px] grayscale hover:grayscale-0 transition duration-500"/>
            <div className="w-full opacity-0 group-hover:opacity-100 transition duration-500 absolute top-52 h-24 text-center bg-[#16423C] z-10 text-white">
                <p className="pt-2">Lanie P. Payot</p>
                <p>Documentation</p>
                <div className='flex justify-center gap-3 py-1'>
                    <a href="https://www.facebook.com/sgwykdn" target="_blank" rel="noopener noreferrer">
                        <FaFacebook className='text-2xl' color="#1877F2" />
                    </a>
                    <a href="https://www.facebook.com/sgwykdn" target="_blank" rel="noopener noreferrer">
                        <FaLinkedin className='text-2xl' color="#1877F2"/>

                    </a>
                    <a href="https://www.facebook.com/sgwykdn" target="_blank" rel="noopener noreferrer">
                        <FaFacebook className='text-2xl' color="#1877F2" />
                    </a>
                </div>
            </div>
        </div>
        <div className='relative group w-[250px] h-[300px]'>
            <img src={tayonsdeveloper} alt="tayons" className="w-[250px] h-[300px] grayscale hover:grayscale-0 transition duration-500"/>
            <div className="w-full opacity-0 group-hover:opacity-100 transition duration-500 absolute top-52 h-24 text-center bg-[#16423C] z-10 text-white">
                <p className="pt-2">John Mark G. Tayone</p>
                <p>Backend Developer</p>
                <div className='flex justify-center gap-3 py-1'>
                    <a href="https://www.facebook.com/sgwykdn" target="_blank" rel="noopener noreferrer">
                        <FaFacebook className='text-2xl' color="#1877F2" />
                    </a>
                    <a href="https://www.facebook.com/sgwykdn" target="_blank" rel="noopener noreferrer">
                        <FaLinkedin className='text-2xl' color="#1877F2"/>

                    </a>
                    <a href="https://www.facebook.com/sgwykdn" target="_blank" rel="noopener noreferrer">
                        <FaFacebook className='text-2xl' color="#1877F2" />
                    </a>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}
