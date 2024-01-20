import React, { useState } from "react";
import FileBox from "./FileBox";
import FolderBox from "./FolderBox";

function FileTable(props) {
    props = {
        folderId: "folder1",
        folderList: [{"key": 1, "folderName": "aaa"}, {"key": 2, "folderName": "bbb"}, {"key": 3, "folderName": "ccc"}],
        fileNames: ["file1.pdf", "file2.jpg", "file3.pptx", "file4.xlsx", "file5.mkv", "file6.mp3", "file7.doc", "file8.o"],
        subFolderList: [{"key": "folder1", "folderName": "my coolest folder"}, {"key": "folder2", "folderName": "my coolest folder2"}]
    }
    const [currentFolder, setCurrentFolder] = useState("")
    return (
        <div>
            <div className="grid grid-cols-3 gap-4">
                {props.subFolderList.map((subFolder) => (
                    <FolderBox folderList={props.folderList} currentSubFolder={subFolder.folderName} />
                ))}
                {props.fileNames.map((fileName) => (
                    <FileBox folderId={currentFolder} fileName={fileName} />
                ))}
            </div>
        </div>
    )
}

export default FileTable;