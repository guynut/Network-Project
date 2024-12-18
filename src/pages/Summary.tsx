import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { FaFilePdf } from "react-icons/fa6";
import { FaCat } from "react-icons/fa6";
import { Link } from "react-router-dom";

const pdfWorkerUrl = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

export default function Summary() {
  const inputFileRef = useRef<HTMLInputElement>(null);

  const [uploading, setUploading] = useState(false);
  const [fileURL, setFileURL] = useState<string>("");
  const [summary, setSummary] = useState<string>(""); 

  const handleFileChange = async () => {
    const file = inputFileRef.current?.files?.[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        setFileURL(fileReader.result as string);
      };
      fileReader.readAsDataURL(file);

      setUploading(true);
      const formData = new FormData();
      formData.append("pdf_file", file);
      formData.append("pdf_name", "My PDF File");
      formData.append("user_id", "1");
      formData.append("summary", "This is a sample summary");

      try {
        const res = await axios.post("http://localhost:4000/pdf/storePDF", formData);
        console.log("File uploaded successfully:", res.data);
        setSummary("Upload complete!");
      } catch (error) {
        console.error("Error uploading file:", error);
      } finally {
        setUploading(false);
      }
    }
  };

  useEffect(() => {
    const inputFileElement = inputFileRef.current;
    inputFileElement?.addEventListener("change", handleFileChange);

    return () => {
      inputFileElement?.removeEventListener("change", handleFileChange);
    };
  }, []);

  return (
    <div className="w-full h-full bg-white text-neutral-900 flex flex-col justify-center items-center p-5">
      <div className="w-full flex justify-start">
        <div className="flex gap-2 justify-center items-center">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img src="/public/github-logo.jpg" alt="Profile" />
          </div>
          <div>
            <p className="text-xl">Username</p>
            <p className="text-lg">email</p>
          </div>
          <Link
            to={"/userprofile"}
            className="px-4 p-2 rounded-full bg-neutral-200 text-neutral-600 duration-150 hover:bg-pink-500 hover:text-white active:scale-95"
          >
            View Your Files
          </Link>
        </div>
      </div>

      <div className="w-[98%] h-[90%] flex gap-4">
        <div className="w-[49%] h-full rounded-xl p-2 bg-neutral-100 flex flex-col gap-4 justify-start items-center">
          <p className="text-2xl"> Input Your File </p>

          {fileURL ? (
            <div className="p-2 w-full h-full overflow-scroll no-scrollbar rounded-xl">
              <Worker workerUrl={pdfWorkerUrl}>
                <Viewer fileUrl={fileURL} />
              </Worker>
            </div>
          ) : (
            <div className="w-full grow flex justify-center items-center">
              <div className="w-max p-4 rounded-2xl bg-neutral-200">
                <input
                  className="hidden"
                  type="file"
                  name="pdfInput"
                  id="pdfInput"
                  accept=".pdf"
                  ref={inputFileRef}
                />
                <label
                  className="peer cursor-pointer text-neutral-400 rounded-xl p-1 px-3 transition-all hover:bg-main-green hover:text-pink-600"
                  htmlFor="pdfInput"
                >
                  <div className="flex flex-col justify-center items-center gap-1">
                    <FaFilePdf className="text-5xl" />
                    Choose PDF File
                  </div>
                </label>
              </div>
            </div>
          )}
        </div>

        <div className="w-[1px] h-full bg-white"></div>

        <div className="w-[49%] h-full rounded-xl p-2 bg-neutral-100 flex flex-col justify-start items-center">
          <p className="text-2xl"> Summary of This File </p>
          <div className="w-full grow p-4">
            {uploading ? (
              <div className="w-full h-full flex flex-col justify-center items-center">
                <FaCat className="text-8xl animate-bounce text-pink-600" />
                <p className="animate-pulse">Waiting for summary...</p>
              </div>
            ) : fileURL ? (
              <p>{summary}</p>
            ) : (
              <p>Select a file to view its summary</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
