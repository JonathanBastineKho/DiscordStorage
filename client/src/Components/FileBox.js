import { Card, Dropdown } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { FaPencilAlt, FaDownload, FaRegTrashAlt } from "react-icons/fa";
import { FaFilePdf } from "react-icons/fa6";
import RenameModal from "./RenameModal";
import axios from "axios";

// props needed:
//  file name, file type, token, file id,
function FileBox(props) {
  props = {
    fileName: "memes.jpg",
    fileType: "jpg",
    token: "abcUser",
    fileId: "f001",
  };

//   const downloadFile = () => {
//     console.log("download file")
//   }

  const downloadFile = async (linksList) => {
    const filestream = new WritableStream();
    const writer = filestream.getWriter();
    try {
      for (const url of linksList) {
        //   const response = await axios({
        //     url,
        //     method: 'GET',
        //     mode: "no-cors",
        //     responseType: 'blob',
        //   });
        console.log("url", url)
        // fetch(url, { mode: "no-cors" })
        //   .then((response) => response.blob())
        //   .then(blob => {
        //     console.log(blob)
        //   })
        // const reader = new Response(response.data).body.getReader();

        // while (true) {
        //   const { done, value } = await reader.read();

        //   if (done) {
        //     break;
        //   }

        //   // Write the chunk to disk
        //   await writer.write(value);
        }
    //   }
    //   await writer.close();
    } catch (error) {
      console.log("error");
      console.log(error);
      // console.log(error.response.data.error)
    }
  };

  const deleteFile = (token, fileName) => {
    // delete file
  };

  const [fileName, setFileName] = useState(props.fileName);
  const [renameShow, setRenameShow] = useState(false);

  return (
    <div>
      <RenameModal
        renameShow={renameShow}
        setRenameShow={() => setRenameShow(false)}
        fileName={fileName}
      />
      <a className="max-w-sm overflow-hidden bg-white border border-gray-200 rounded-lg shadow-md">
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
      </a>
    </div>
  );
}

export default FileBox;
