import { Button, Label, Modal, Progress, TextInput } from "flowbite-react";
import React from "react";
import { useState } from "react";
import DropImageInput from "./DropImageInput";
import axios from "axios";

function UploadFileModal(props) {
  const show = true;
  const [file, setFile] = useState(null);

  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  const uploadFile = (token, file, folderId) => {

    const chunkSize = 25 * 1024 * 1024;
    const totalChunks = Math.ceil(file.size / chunkSize);

    for (let i = 0; i < totalChunks; i++) {
      var formData = new FormData();
      formData.append(file);
      formData.append(i);
      formData.append(file.name);
      formData.append(folderId);
      formData.append(file.size);
      if (token) {
        axios
          .post("https://localhost:8000/api/upload", formData, {
            headers: {
              Authorization: `${token}`,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            if (res.data.success) {
              setProgress(i / totalChunks);
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
            <TextInput id="fileName" type="email" placeholder required />
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
          <Button className="rounded-lg" onClick={console.log("yep")}>
            Upload File
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default UploadFileModal;
