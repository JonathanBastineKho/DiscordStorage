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
            {props.subFolder
            .filter(subFolder => subFolder.name.toLowerCase().includes(props.filter.toLowerCase()))
            .map((subFolder, idx) => (
              <FolderBox
                key={idx}
                listPath={props.listPath}
                setListPath={props.setListPath}
                refreshFolder={props.refreshFolder}
                refreshFiles={props.refreshFiles}
                currentSubFolder={subFolder}
              />
            ))}
          </div>
        </span>
        <span>
        <Label className="text-md">Files</Label>
        <div className="grid grid-cols-5 gap-6 mt-2">
          {props.fileNames
          .filter(filename => filename.toLowerCase().includes(props.filter.toLowerCase()))
          .map((fileName, idx) => (
            <FileBox key={idx} folderId={props.currentFolderId} fileName={fileName} />
          ))}
        </div>
      </span>
      </div>

      
    </div>
  );
}

export default FileTable;
