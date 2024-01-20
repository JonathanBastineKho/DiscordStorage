import { Button, Label, Modal, TextInput } from "flowbite-react";
import React from "react";
import { useState } from "react";

function RenameModal(props) {
  return (
    <Modal
      show={props.renameShow}
      size="sm"
      popup={false}
      onClose={props.setRenameShow}
    >
      <Modal.Header>Rename</Modal.Header>
      <Modal.Body>
        <TextInput id="fileName" type="email" required/>
      </Modal.Body>
    </Modal>
  );
}

export default RenameModal;
