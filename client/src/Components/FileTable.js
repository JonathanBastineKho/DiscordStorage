import React, { useState } from "react";
import FileBox from "./FileBox";
import FolderBox from "./FolderBox";
import { Label } from "flowbite-react";

function FileTable(props) {
  return (
    <div>
      <div className="grid grid-cols-1 gap-5">
        <span>
          <Label className="text-md">Folders</Label>
          <div className="grid grid-cols-5 gap-6 mt-2">
            {props.subFolder.map((subFolder, idx) => (
              <FolderBox
                key={idx}
                folderList={props.folderList}
                currentSubFolder={subFolder.folderName}
              />
            ))}
          </div>
        </span>
        <span>
        <Label className="text-md">Files</Label>
        <div className="grid grid-cols-5 gap-6 mt-2">
          {props.fileNames.map((fileName, idx) => (
            <FileBox key={idx} folderId={props.currentFolderId} fileName={fileName} />
          ))}
        </div>
      </span>
      </div>

      
    </div>
  );
}

export default FileTable;
