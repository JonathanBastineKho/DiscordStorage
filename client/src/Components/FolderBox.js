import { Card, Dropdown } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { FaPencilAlt, FaDownload, FaRegTrashAlt, FaFolder } from "react-icons/fa";

import RenameModal from "./RenameModal";
import axios from "axios";

// props needed:
//  older list, current folder
function FolderBox(props) {
    // props = {
    //   // folderList: [{"key": 1, "folderName": "aaa"}, {"key": 2, "folderName": "bbb"}, {"key": 3, "folderName": "ccc"}],
    //   currentFolder: {"key": 5, "folderName": "ddd"},
    // }
    const [renameShow, setRenameShow] = useState(false);
    
    // useEffect(() => {
    //   props.folderList.push(props.currentFolder)
    //   console.log(props.folderList)
    // }, [])

    const downloadFolder = () => {
      console.log("download folder")
    }

    const deleteFolder = () => {
      console.log("delete folder")
    }

    

    return (
      <div>
        <span className="max-w-sm overflow-hidden bg-white rounded-lg shadow-md">
          <div className="flex justify-between rounded-lg bg-gray-100 p-3 px-4 py-2 hover:bg-gray-200">
            <div className="flex items-center">
              <FaFolder className="mr-2 text-black-700"/>
              <p>{props.currentSubFolder}</p>
            </div>

            <Dropdown className="ml-auto" inline label="">
              <Dropdown.Item>
                <FaPencilAlt className="mr-3" />
                <button onClick={() => setRenameShow(true)}>Rename</button>
              </Dropdown.Item>
              <Dropdown.Item>
                <FaDownload className="mr-3" />
                <button onClick={() => downloadFolder()}>Download</button>
              </Dropdown.Item>
              <Dropdown.Item>
                <FaRegTrashAlt className="mr-3 text-red-600" />
                <button onClick={() => deleteFolder()} className="text-red-600">
                  Delete
                </button>
              </Dropdown.Item>
            </Dropdown>
          </div>
        </span>
      </div>
    );
  };

export default FolderBox;
