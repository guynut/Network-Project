import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Userprofile() {

  const [pdfList,setPdfList] = useState<string[] | null>()

  // const getPdfList = async () => {
  //   try {
  //     const response = await axios.get('/');
  //     setPdfList(response.data);
  //   } catch (error) {
  //     console.error('Error fetching PDF list:', error);
  //   }
  // }

  // useEffect(() => {
  //   getPdfList();
  // }, [])

  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <div className='w-[96%] h-[96%] p-4 flex flex-col gap-4'>
        <div className='w-full flex justify-start items-center'>
          <div className='flex gap-2 justify-center items-center'>
            <div className='w-20 h-20 rounded-full overflow-hidden'>
              <img src="/public/github-logo.jpg" />
            </div>
            <div>
              <p className='text-2xl'>Username</p>
              <p className='text-xl'>email</p>
            </div>
          </div>

          <div className='grow'></div>

          <Link
            to={'/home'}
            className='px-4 p-2 h-max w-max rounded-full bg-pink-500 text-white font-semibold duration-150 hover:bg-pink-500 hover:scale-105 active:scale-95'
          >
            pdf summary
          </Link>
        </div>

        <p>your pdf list</p>

        {pdfList? (
          <div className="mt-1 w-full flex flex-wrap gap-1">
            {pdfList.map((text, i) => (
              <PdfCard key={i} title={text} />
            ))}
          </div>
        ):(<></>)}

      </div>
    </div>
  )
}

type PdfListProp = {
  title: string
}

const PdfCard: React.FC<PdfListProp> = (props) => {
  return (
    <div className='w-full h-20 rounded-xl bg-neutral-100 p-4 flex'>
      <p>{props.title}</p>
    </div>
  )
}