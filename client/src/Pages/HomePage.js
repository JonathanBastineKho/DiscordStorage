import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import PathBreadCrumb from "../Components/PathBreadCrumb";
import MyNavbar from "../Components/MyNavbar";
import FileTable from "../Components/FileTable";
import UploadButton from "../Components/UploadButton";
import { AuthContext } from "../Components/Authentication/AuthContext";
import NewFolderModal from "../Components/NewFolderModal";


function HomePage() {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [filter, setFilter] = useState("");
  const [uploadShow, setUploadShow] = useState(false);
  const { token, logout } = useContext(AuthContext);
  const [listPath, setListPath] = useState([]);

  const [subFolder, setSubFolder] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [openNewFolder, setOpenNewFolder] = useState(false);

  const refreshFolder = (folder_id) => {
    axios.get("/api/sub_folders", {
      params: {"folder_id": folder_id},
      headers: {
        "Authorization": `${token}`
      }
    }).then((res2) => {
      setSubFolder(res2.data.sub_folder);
    })
    .catch((error) => {console.log(error)});
  }
  const refreshFiles = (folder_id) => {
    axios.get("/api/get_files", {
      params: {"folder_id": folder_id},
      headers: {
        "Authorization": `${token}`
      }
    }).then((res3) => {
      setFileList(res3.data.files);
    })
    .catch((error) => {console.log(error)});
  }

  useEffect(async () => {
    axios.get("/api/root_folder", {
      headers: {
        "Authorization": `${token}`
      }
    }).then((res) => {
      setListPath([res.data]);
      refreshFolder(res.data.id);
      refreshFiles(res.data.id);
    })

  }, [])

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    const chunkSize = 25 * 1024 * 1024; // 40 KB
    const totalChunks = Math.ceil(file.size / chunkSize);
    const userId = "123"; // get the user id from somewhere
    const fileName = file.name; // get the original file name
    for (let i = 0; i < totalChunks; i++) {
      const chunkId = i + 1; // the current chunk number
      const start = i * chunkSize; // the start byte of the chunk
      const end = start + chunkSize; // the end byte of the chunk
      const chunk = file.slice(start, end); // create the chunk
      const formData = new FormData(); // create a form data
      formData.append("file", chunk); // append the chunk
      formData.append("chunkId", chunkId); // append the chunk id
      formData.append("userId", userId); // append the user id
      formData.append("fileName", fileName); // append the file name
      // send the form data to the FastAPI server
      const response = axios.post("http://localhost:8000/api/upload", formData, {
        // update the progress state
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            ((progressEvent.loaded + start) * 100) / file.size
          );
          setProgress(percentCompleted);
        },
      });
      // handle the response
      console.log(response.data);
    }
  };

  return (
    <div>
    <NewFolderModal refreshFolder={refreshFolder} open={openNewFolder} setOpenModal={setOpenNewFolder} parent_folder_id={listPath.length != 0 ? listPath[listPath.length - 1].id : -1}/>
      <MyNavbar />
      <div className="mt-12 mx-auto px-6 sm:px-8 md:px-10 lg:px-12 xl:max-w-[100rem]">
        <div className="flex flex-wrap justify-between mb-4 items-center">
          <PathBreadCrumb listPath={listPath} />
          <button onClick={() => {setOpenNewFolder(true)}} type="button" class="text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-200 px-4 h-10">+ Folder</button>
        </div>
        
        <FileTable fileNames={fileList} subFolder={subFolder} currentFolderId={listPath.length != 0 ? listPath[listPath.length - 1].id : -1}/>
        <UploadButton uploadShow={uploadShow} setUploadShow={setUploadShow} listPath={listPath} refreshFiles={refreshFiles}/>

      </div>
    </div>
  );
}

export default HomePage;
