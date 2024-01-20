import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import FileBox from "../Components/FileBox";
import PathBreadCrumb from "../Components/PathBreadCrumb";
import MyNavbar from "../Components/MyNavbar";
import FileTable from "../Components/FileTable";
import UploadButton from "../Components/UploadButton";
import UploadFileModal from "../Components/UploadFileModal";
import { AuthContext } from "../Components/Authentication/AuthContext";
import jwtDecode from "jwt-decode";


function HomePage() {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [filter, setFilter] = useState("");
  const [uploadShow, setUploadShow] = useState(false);
  const {token, logout} = useContext(AuthContext);
  const [listPath, setListPath] = useState([]);

  useEffect(() => {
    axios.get("https://localhost:8000/api/root_folder").then((res) => {
      setListPath(listPath.push(res.data))
    })
  }, [])
  // const user = jwtDecode(token); 

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
      
      <MyNavbar />
      <div className="mt-12 mx-auto px-6 sm:px-8 md:px-10 lg:px-12 xl:max-w-[100rem]">
        <PathBreadCrumb />
        <form onSubmit={handleSubmit}>
          <input type="file" onChange={handleChange} />
          <button type="submit">Upload</button>
        </form>
        <p>Progress: {progress}%</p>
        <FileTable />
        <UploadButton uploadShow={uploadShow} setUploadShow={setUploadShow}/>
        
      </div>
    </div>
  );
}

export default HomePage;
