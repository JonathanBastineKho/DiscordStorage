import { Button, Label, Modal, TextInput } from "flowbite-react";
import React, { useContext } from "react";
import { useState } from "react";
import axios from "axios";
import { AuthContext } from "./Authentication/AuthContext";

function DeleteModal(props) {
  const {token, logout} = useContext(AuthContext);

  const deleteFile = (filename) => {
    // axios.post("/api/delete", {
    //   headers: {
    //     Authorization: `${token}`
    //   },
    //   params: {
    //     "filename": filename
    //   }
    // })
    props.setDeleteShow(false)
  }

  return (
    <Modal
      show={props.deleteShow}
      size="sm"
      popup={false}
      onClose={() => props.setDeleteShow(false)}
    >
      <Modal.Header>Confirmation</Modal.Header>
      <Modal.Body className="items-center">
        <Label className="text-md">Are you sure you want to delete {props.filename}?</Label>
        <div class="grid grid-cols-2 gap-3 mt-3">
          <Button className="rounded-md" color="failure" onClick={() => deleteFile(props.filename)}>Yes</Button>
          <Button className="rounded-md" onClick={() => props.setDeleteShow(false)}>No</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default DeleteModal;
