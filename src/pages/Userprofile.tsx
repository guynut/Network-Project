import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type PdfItem = {
  pdf_id: number;
  pdf_name: string;
  pdf_file: string;
  summary: string;
};

export default function Userprofile() {
  const [pdfList, setPdfList] = useState<PdfItem[] | null>(null);

  const getPdfList = async () => {
    try {
      const response = await axios.get('http://localhost:4000/pdf/getall');
      console.log('PDF List:', response.data); // ตรวจสอบข้อมูลที่ได้รับ
      setPdfList(response.data);
    } catch (error) {
      console.error('Error fetching PDF list:', error);
    }
  };

  useEffect(() => {
    getPdfList();
  }, []);

  return (
    <div className="w-screen h-screen flex justify-center items-center no-scrollbar">
      <div className="w-[96%] h-[96%] p-4 flex flex-col gap-4">
        <div className="w-full flex justify-start items-center">
          <div className="flex gap-2 justify-center items-center">
            <div className="w-20 h-20 rounded-full overflow-hidden">
              <img src="/public/github-logo.jpg" />
            </div>
            <div>
              <p className="text-2xl">Username</p>
              <p className="text-xl">email</p>
            </div>
          </div>

          <div className="grow"></div>

          <Link
            to={"/Summary"}
            className="px-4 p-2 h-max w-max rounded-full bg-pink-500 text-white font-semibold duration-150 hover:bg-pink-500 hover:scale-105 active:scale-95"
          >
            pdf summary
          </Link>
        </div>

        <p>your pdf list</p>

        {pdfList ? (
          <div className="mt-1 w-full flex flex-wrap gap-1">
            {pdfList.map((pdf, i) => (
              <PdfCard key={i} title={pdf.pdf_name} summary={pdf.summary} />
            ))}
          </div>
        ) : (
          <div className="w-full h-screen flex items-center justify-center">
            <p className="text-2xl text-neutral-400">no data</p>
          </div>
        )}
      </div>
    </div>
  );
}

type PdfListProp = {
  title: string;
  summary: string;
};

const PdfCard: React.FC<PdfListProp> = (props) => {
  return (
    <>
    <div className="w-full rounded-xl bg-neutral-100 p-4 flex-row">
      <div><b>{props.title}</b></div>
      <div>
        <p>{props.summary}</p>
      </div>
    </div>
    </>
  );
};
