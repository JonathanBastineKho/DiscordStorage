import React from "react";
import { Breadcrumb, Label } from "flowbite-react";

function PathBreadCrumb(props) {
  const listPath = [
    { folderId: 1, folderName: "aaaaaa" },
    { folderId: 2, folderName: "bbbbbb" },
    { folderId: 3, folderName: "cccccc" },
  ];
  return (
    <div>
      <Breadcrumb className="bg-gray-50 px-5 py-3">
        {listPath.map((folder, idx) => (
          <Breadcrumb.Item key={idx}>
            <Label className="text-xl">{folder.folderName}</Label>
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
    </div>
  );
}

export default PathBreadCrumb;
