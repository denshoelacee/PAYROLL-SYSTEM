import React from 'react'
import denshodeveloper from '/resources/images/densyo2.png';
import tayonsdeveloper from '/resources/images/tayons.png';
import laniedeveloper from '/resources/images/lanie.png';
export function Developers() {
  return (
    <>
    <div className="w-[100%] max-h-[450px] p-24 flex flex-col overflow-y-auto md:flex-row justify-evenly items-center gap-10 pt-5  md:p-0 ">
        <div className='h-full w-full py-5  bg-green-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100'>
            <img src={denshodeveloper} alt="densho" className="w-[300px] h-[300px]" />
            <div className="flex flex-col text-center text-white bg-inherit">
                <p>Deniel D. Ybañez </p>
                <p className='text-xl'>Frontend Developer</p>
            </div>
        </div>
        <div className='h-full w-full py-5 bg-green-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100'>
            <img src={tayonsdeveloper} alt="tayons" className="w-[330px] h-[300px]" />
            <div className="flex flex-col text-center text-white bg-inherit">
                <p>John Mark G. Tayone</p>
                <p className='text-xl'>Backend Developer</p>
            </div>
        </div>
        <div className='h-full w-full py-5 bg-green-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100'>
            <img src={laniedeveloper} alt="tayons" className="w-[300px] h-[300px]" />
            <div className="flex flex-col text-center text-white bg-inherit">
                <p>Lanie P. Payot</p>
                <p className='text-xl'>Documenation</p>
            </div>
        </div>
    </div>
    </>
  )
}
