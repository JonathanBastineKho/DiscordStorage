import { Card, Dropdown } from "flowbite-react";
import React, { useEffect, useState, useContext } from "react";
import { FaPencilAlt, FaDownload, FaRegTrashAlt } from "react-icons/fa";
import { FaFilePdf } from "react-icons/fa6";
import { IoIosMusicalNotes } from "react-icons/io";
import { MdOndemandVideo } from "react-icons/md";
import { FaFileImage } from "react-icons/fa6";
import { FaFilePowerpoint, FaFileWord, FaFileExcel } from "react-icons/fa";
import { HiQuestionMarkCircle } from "react-icons/hi";
import { AuthContext } from "./Authentication/AuthContext";
import RenameModal from "./RenameModal";
import axios from "axios";

// props needed:
//  file name, file type, token, file id,
function FileBox(props) {
  const { token, logout } = useContext(AuthContext);
  const downloadFile = async () => {
    console.log(props.folderId);
    console.log(props.fileName);
    const response = await axios.get("/api/download", {
      responseType: 'blob',
      params: { "folder_id": props.folderId, "name": props.fileName },
      headers: {
        "Authorization": `${token}`
      }
    });
    // Create a URL from the blob
    const url = window.URL.createObjectURL(new Blob([response.data]));

    // Create a link element
    const link = document.createElement('a');

    // Set the link's attributes and click it to start the download
    link.href = url;
    link.setAttribute('download', props.fileName); // or any other extension
    document.body.appendChild(link);
    link.click();
  };

  const returnFileIcon = (fileName) => {
    const lastDotIndex = fileName.lastIndexOf(".");
    if (lastDotIndex !== -1) {
      const extension = fileName.substring(lastDotIndex + 1).toLowerCase();
      if (extension === "pdf") {
        return <FaFilePdf className="mr-2 text-red-700" />;
      } else if (["mp3", "wav", "ogg"].includes(extension)) {
        return <IoIosMusicalNotes className="mr-2 text-purple-700" />;
      } else if (["mp4", "avi", "mkv"].includes(extension)) {
        return <MdOndemandVideo className="mr-2 text-indigo-700" />;
      } else if (["jpg", "jpeg", "png", "gif"].includes(extension)) {
        return <FaFileImage className="mr-2 text-yellow-700" />;
      } else if (["ppt", "pptx"].includes(extension)) {
        return <FaFilePowerpoint className="mr-2 text-orange-700" />;
      } else if (["doc", "docx"].includes(extension)) {
        return <FaFileWord className="mr-2 text-blue-700" />
      } else if (["xls", "xlsx"].includes(extension)) {
        return <FaFileExcel className="mr-2 text-green-700" />;
      } else {
        return <HiQuestionMarkCircle className="mr-2 text-black-700" />;
      }
    }
  }

  const deleteFile = (token, fileName) => {
    // delete file
  };
  const [renameShow, setRenameShow] = useState(false);

  return (
    <div>
      <span className="max-w-sm overflow-hidden bg-white rounded-lg shadow-md">
        <div className="flex justify-between rounded-lg bg-gray-100 p-3 px-4 py-2 hover:bg-gray-200">
          <div className="flex items-center">
            {returnFileIcon(props.fileName)}
            <p>{props.fileName}</p>
          </div>

          <Dropdown className="ml-auto" inline label="">
            <Dropdown.Item>
              <FaPencilAlt className="mr-3" />
              <button onClick={() => setRenameShow(true)}>Rename</button>
            </Dropdown.Item>
            <Dropdown.Item>
              <FaDownload className="mr-3" />
              <button onClick={downloadFile}>Download</button>
            </Dropdown.Item>
            <Dropdown.Item>
              <FaRegTrashAlt className="mr-3 text-red-600" />
              <button onClick={() => deleteFile} className="text-red-600">
                Delete
              </button>
            </Dropdown.Item>
          </Dropdown>
        </div>
      </span>
    </div>
  );
};

export default FileBox;
