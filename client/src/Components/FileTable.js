import React, { useState } from "react";
import FileBox from "./FileBox";

function FileTable(props) {
    props = {
        folderId: "folder1",
        fileNames: ["file1.pdf", "file2.jpg", "file3.pptx", "file4.xlsx", "file5.mkv", "file6.mp3", "file7.doc", "file8.o"],
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