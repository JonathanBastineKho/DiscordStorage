import { Card, Dropdown } from "flowbite-react";
import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

// props needed:
//  file name, file type, user id, file id,
function FileBox(props) {
  props = {
    fileName: "memes.jpg",
    fileType: "jpg",
    userId: "abcUser",
    fileId: "f001",
  };

  return (
    <div>
        <script src="../path/to/flowbite/dist/flowbite.min.js"></script>
      <a className="block max-w-sm p-0 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <div className="flex justify-between bg-gray-400 p-3">
          <p>{props.fileName}</p>
          <div>
            <button
              data-popover-target="popover-click"
              data-popover-trigger="click"
              type="button"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Click popover
            </button>

            <div
              data-popover
              id="popover-click"
              role="tooltip"
              class="absolute z-10 invisible inline-block w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800"
            >
              <div class="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700">
                <h3 class="font-semibold text-gray-900 dark:text-white">
                  Popover click
                </h3>
              </div>
              <div class="px-3 py-2">
                <p>
                  And here's some amazing content. It's very engaging. Right?
                </p>
              </div>
              <div data-popper-arrow></div>
            </div>
          </div>

          <Dropdown inline label="">
            <Dropdown.Item>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Rename
              </a>
            </Dropdown.Item>
            <Dropdown.Item>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Download
              </a>
            </Dropdown.Item>
            <Dropdown.Item>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Delete
              </a>
            </Dropdown.Item>
          </Dropdown>
        </div>
      </a>
    </div>
  );
}

export default FileBox;
