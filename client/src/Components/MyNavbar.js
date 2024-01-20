import React, { useEffect, useState, useContext } from "react";
import { Avatar, Dropdown, Label, Navbar, TextInput } from "flowbite-react";
import { AiOutlineSearch } from "react-icons/ai";
import { CiUser } from "react-icons/ci";
import jwtDecode from "jwt-decode";
import { AuthContext } from "./Authentication/AuthContext";
import { useNavigate } from "react-router-dom";

function MyNavbar(props) {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const user = jwtDecode(token);
  props = {
    token: "abc",
    user: { name: "user1", email: "user1@user.com" }
  }

  const [filter, setFilter] = useState("");

  useEffect(() => {
    console.log(filter)
  }, [filter])

  return (
    <div>
      <Navbar fluid rounded>
        <Navbar.Brand href="/">
          <img
            src="https://www.flowbite-react.com/favicon.svg"
            className="mr-3 h-6 sm:h-9"
            alt="Flowbite Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-bold dark:text-white">DC Storage</span>
        </Navbar.Brand>
        <div>
          <TextInput
            id="name"
            className="w-[30rem]"
            type="text"
            icon={AiOutlineSearch}
            placeholder="Search by file name"
            required={true}
            onChange={(ev) =>
              setFilter((prev) => ({
                ...prev,
                name: ev.target.value,
              }))
            }
          />
        </div>
        <div className="flex md:order-2">
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <CiUser size={32} className="text-gray-400 hover:text-gray-500 align-middle" />
            }
          >
            <Dropdown.Header>
              <span className="block truncate text-sm font-medium">
                {user.sub}
              </span>
            </Dropdown.Header>
            <Dropdown.Item onClick={(event) => {
              logout();
              navigate("/login");
            }}>Sign out</Dropdown.Item>
          </Dropdown>
          <Navbar.Toggle />
        </div>
      </Navbar>
      <div className="border-t border-gray-300 w-full shadow-md mb-2"></div>
    </div>

  );
}

export default MyNavbar;
