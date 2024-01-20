import React, { useState } from "react";
import FileBox from "./FileBox";

function FileTable(props) {
    props = {
        folderId: "folder1",
        fileNames: ["file1", "file2", "file3", "file4", "file5", "file6"],
        subFolderNames: [{folderId: "folder1", folderName: "my coolest folder"}, {folderId: "folder2", folderName: "my coolest folder2"}]
    }
    const [currentFolder, setCurrentFolder] = useState("")
    return (
        <div>
            <div className="grid grid-cols-3 gap-4">
                {props.fileNames.map((fileName) => (
                    <FileBox folderId={currentFolder} fileName={fileName} />
                ))}
            </div>
        </div>
    )
}

export default FileTable;