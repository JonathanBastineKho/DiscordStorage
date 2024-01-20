import { Button, Label, Modal, TextInput } from "flowbite-react";
import React from "react";
import { useState } from "react";
import DropImageInput from "./DropImageInput";

function UploadFileModal(props) {
  const show = true;
  const [file, setFile] = useState(null);

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
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default UploadFileModal;
