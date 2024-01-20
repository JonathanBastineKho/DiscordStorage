import { Button, Label, Modal, Progress, TextInput } from "flowbite-react";
import React from "react";
import { useState, useContext } from "react";
import DropImageInput from "./DropImageInput";
import axios from "axios";
import { AuthContext } from "./Authentication/AuthContext";

function UploadFileModal(props) {
  const [file, setFile] = useState(null);
  const {token, logout} = useContext(AuthContext);

  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  const uploadFile = async () => {

    const chunkSize = 25 * 1024 * 1024;
    const totalChunks = Math.ceil(file.size / chunkSize);
    setVisible(true);
    for (let i = 0; i < totalChunks; i++) {
      var formData = new FormData();
      const start = i * chunkSize; // the start byte of the chunk
      const end = start + chunkSize; // the end byte of the chunk
      const chunk = file.slice(start, end);
      formData.append("file", chunk);
      formData.append("chunkId", i+1);
      formData.append("fileName", file.name);
      formData.append("folderID", props.folderId);
      formData.append("fileSize", file.size);
      if (token) {
        axios
          .post("/api/upload", formData, {
            headers: {
              Authorization: `${token}`,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            if (res.data.success) {
              i += 1
              setProgress((i / totalChunks)*100);
            }
            if (i / totalChunks == 1){
              props.setUploadShow(false);
              setFile(null);
              setVisible(false);
              setProgress(0);
            }
          });
      }
    }
  };

  return (
    <Modal
      show={props.uploadShow}
      size="md"
      popup={false}
      onClose={() => props.setUploadShow(false)}
    >
      <Modal.Header>Upload File</Modal.Header>
      <Modal.Body>
        <div class="grid grid=cols-1 gap-4">
          <span>
            <Label>Edit filename</Label>
            <TextInput id="fileName" type="text" value={file ? file.name : ''} />
          </span>
          <DropImageInput show={true} file={file} setFile={setFile} />
          {visible && (
            <Progress
              progress={progress}
              progressLabelPosition="inside"
              textLabel="Uploading..."
              textLabelPosition="outside"
              size="md"
              labelProgress
              labelText
            />
          )}
          <Button className="rounded-lg" onClick={uploadFile}>
            Upload File
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default UploadFileModal;
