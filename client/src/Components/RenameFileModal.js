import { Button, Label, Modal, TextInput } from "flowbite-react";
import React, { useContext } from "react";
import { useState } from "react";
import axios from "axios";
import { AuthContext } from "./Authentication/AuthContext";

function RenameFileModal(props) {
  const {token, logout} = useContext(AuthContext);
  const [newFileName, setNewFileName] = useState(props.filename);

  const handleFileNameChange = (e) => {
    setNewFileName(e.target.value)
  }

  const renameFile = (filename) => {
    // axios.post("/api/rename", {
    //   headers: {
    //     Authorization: `${token}`
    //   },
    //   params: {
    //     "filename": filename
    //   }
    // })
    props.setRenameShow(false);
  }

  return (
    <Modal
      show={props.renameShow}
      size="sm"
      popup={false}
      onClose={() => props.setRenameShow(false)}
    >
      <Modal.Header>Rename</Modal.Header>
      <Modal.Body>
        <div class="grid grid=cols-1 gap-4">
          <Label>Edit filename</Label>
          <TextInput id="fileName" required value={newFileName} onChange={handleFileNameChange} />
          <Button className="rounded-lg" onClick={() => renameFile(newFileName)}>Rename file</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default RenameFileModal;
