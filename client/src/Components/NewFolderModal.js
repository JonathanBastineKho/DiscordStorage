import React from "react";
import { Button, Checkbox, Label, Modal, TextInput } from 'flowbite-react';

function NewFolderModal(props) {
    const reateSubFolder = () => {

    }
    return (
        <Modal popup={false} show={props.open} size="md" onClose={() => props.setOpenModal(false)}>
            <Modal.Header>Upload File</Modal.Header>    
            <Modal.Body>
                <div class="grid grid=cols-1 gap-4">
                    <span>
                        <Label>Folder name</Label>
                        <TextInput className="mt-2" id="fileName" type="text" />
                    </span>
                    <Button className="rounded-lg">
                        Create Folder
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default NewFolderModal;