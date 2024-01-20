import React from "react";
import { IoIosAddCircle } from "react-icons/io";
import UploadFileModal from "./UploadFileModal";

function UploadButton(props) {
  return (
    <div>
      <UploadFileModal
        uploadShow={props.uploadShow}
        setUploadShow={props.setUploadShow}
        folderId={props.listPath.length != 0 ? props.listPath[props.listPath.length - 1].id : 0}
      />
      <div className="fixed bottom-6 right-12 flex items-center">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full flex items-center" onClick={() => props.setUploadShow(true)}>
          <span className="mr-2">Upload File</span>
          <IoIosAddCircle size={32} />
        </button>
      </div>
    </div>
  );
}

export default UploadButton;
