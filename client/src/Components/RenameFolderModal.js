import { Button, Label, Modal, TextInput } from "flowbite-react";
import React, { useContext } from "react";
import { useState } from "react";
import axios from "axios";
import { AuthContext } from "./Authentication/AuthContext";

function RenameFolderModal(props) {
  const {token, logout} = useContext(AuthContext);
  const [newFolderName, setNewFolderName] = useState(props.folderName);

  const handleFolderNameChange = (e) => {
    setNewFolderName(e.target.value)
  }

  const renameFolder = (folderName) => {
    // axios.post("/api/rename", {
    //   headers: {
    //     Authorization: `${token}`
    //   },
    //   params: {
    //     "filename": filename
    //   }
    // })
    props.setRenameFolderShow(false);
  }

  return (
    <Modal
      show={props.renameFolderShow}
      size="sm"
      popup={false}
      onClose={() => props.setRenameFolderShow(false)}
    >
      <Modal.Header>Rename</Modal.Header>
      <Modal.Body>
        <div class="grid grid=cols-1 gap-4">
          <Label>Edit folder name</Label>
          <TextInput id="fileName" required value={newFolderName} onChange={handleFolderNameChange} />
          <Button className="rounded-lg" onClick={() => renameFolder(newFolderName)}>Rename file</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default RenameFolderModal;
