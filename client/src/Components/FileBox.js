import { Card, Dropdown } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { FaPencilAlt, FaDownload, FaRegTrashAlt } from "react-icons/fa";
import { FaFilePdf } from "react-icons/fa6";
import RenameModal from "./RenameModal";
import axios from "axios";

// props needed:
//  file name, file type, token, file id,
function FileBox(props) {

  const downloadFile = () => {
    console.log("download file")
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
            <FaFilePdf className="mr-2 text-red-900" />
            <p>{props.fileName}</p>
          </div>

          <Dropdown className="ml-auto" inline label="">
            <Dropdown.Item>
              <FaPencilAlt className="mr-3" />
              <button onClick={() => setRenameShow(true)}>Rename</button>
            </Dropdown.Item>
            <Dropdown.Item>
              <FaDownload className="mr-3" />
              <button onClick={() => downloadFile()}>Download</button>
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
}

export default FileBox;
