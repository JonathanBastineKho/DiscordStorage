import { Card, Dropdown } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { FaPencilAlt, FaDownload, FaRegTrashAlt, FaFolder } from "react-icons/fa";

import RenameModal from "./RenameFileModal";
import axios from "axios";
import RenameFolderModal from "./RenameFolderModal";

function FolderBox(props) {
    // props = {
    //   // folderList: [{"key": 1, "folderName": "aaa"}, {"key": 2, "folderName": "bbb"}, {"key": 3, "folderName": "ccc"}],
    //   currentFolder: {"key": 5, "folderName": "ddd"},
    // }

    const openFolder = () => {
      props.setListPath(prev => [...prev, props.currentSubFolder]);
      props.refreshFolder(props.currentSubFolder.id);
      props.refreshFiles(props.currentSubFolder.id);
    }
    const [renameFolderShow, setRenameFolderShow] = useState(false);

    return (
      <div onDoubleClick={openFolder}>
        <RenameFolderModal renameFolderShow={renameFolderShow} setRenameFolderShow={setRenameFolderShow} folderName={props.currentSubFolder} />
        <span className="max-w-sm overflow-hidden bg-white rounded-lg shadow-md">
          <div className="flex justify-between rounded-lg bg-gray-100 p-3 px-4 py-2 hover:bg-gray-200">
            <div className="flex items-center">
              <FaFolder className="mr-2 text-black-700"/>
              <p>{props.currentSubFolder.name}</p>
            </div>

            <Dropdown className="ml-auto" inline label="">
              <Dropdown.Item>
                <FaPencilAlt className="mr-3" />
                <button onClick={() => setRenameFolderShow(true)}>Rename</button>
              </Dropdown.Item>
            </Dropdown>
          </div>
        </span>
      </div>
    );
  };

export default FolderBox;
