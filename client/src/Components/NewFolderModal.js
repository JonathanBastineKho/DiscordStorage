import React from "react";
import { Button, Label, Modal, TextInput } from 'flowbite-react';
import { AuthContext } from "./Authentication/AuthContext";
import { useContext, useState } from "react";
import axios from "axios";

function NewFolderModal(props) {
    const { token, logout } = useContext(AuthContext);
    const [name, setName] = useState("");
    const createSubFolder = async () => {
        console.log(props.parent_folder_id);
        console.log(name);
        if (token) {
            await axios.post("/api/create_folder", {
                name: name,
                parent_folder_id: props.parent_folder_id
              }, {
                headers: {
                  Authorization: `${token}`
                }
              })
          .then((res) =>{
            if (res.data.success){
                props.setOpenModal(false);
                props.refreshFolder(props.parent_folder_id);
            }
          })
        } else {
            logout();
        }
    }
    return (
        <Modal popup={false} show={props.open} size="md" onClose={() => props.setOpenModal(false)}>
            <Modal.Header>Upload File</Modal.Header>    
            <Modal.Body>
                <div class="grid grid=cols-1 gap-4">
                    <span>
                        <Label>Folder name</Label>
                        <TextInput className="mt-2" id="fileName" type="text" onChange={(e) => setName(e.target.value)}/>
                    </span>
                    <Button className="rounded-lg" onClick={createSubFolder}>
                        Create Folder
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default NewFolderModal;