import React from "react";
import { Breadcrumb, Label } from "flowbite-react";

function PathBreadCrumb(props) {

  return (
    <div className="mb-4">
      <Breadcrumb className="py-3">
        {props.listPath.map((folder, idx) => (
          <Breadcrumb.Item key={idx}>
            <Label className="text-xl">{folder.name}</Label>
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
    </div>
  );
}

export default PathBreadCrumb;
