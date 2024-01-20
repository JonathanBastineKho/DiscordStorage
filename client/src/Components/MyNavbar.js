import React, { useEffect, useState } from "react";
import { Avatar, Dropdown, Label, Navbar, TextInput } from "flowbite-react";
import { BsBucket } from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";
import { CiUser } from "react-icons/ci";

function MyNavbar(props) {
  props = {
    token: "abc",
    user: {name: "user1", email: "user1@user.com"}
  }

  const [user, setUser] = useState(props.user);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    console.log(filter)
  }, [filter])

  return (
    <div>
      <Navbar fluid rounded>
        <Navbar.Brand>
          <BsBucket size={24} />
          <span className="ml-2 self-center whitespace-nowrap text-xl font-semibold mr-3 h-6 sm:h-9">
            DC Storage
          </span>
        </Navbar.Brand>
        <div>
					<TextInput
						id="name"
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
              <span className="block text-sm">{user.name}</span>
              <span className="block truncate text-sm font-medium">
                {user.email}
              </span>
            </Dropdown.Header>
            <Dropdown.Item>Sign out</Dropdown.Item>
          </Dropdown>
          <Navbar.Toggle />
        </div>
      </Navbar>
      <div className="border-t border-gray-300 w-full shadow-md mb-2"></div>
    </div>
    
  );
}

export default MyNavbar;
