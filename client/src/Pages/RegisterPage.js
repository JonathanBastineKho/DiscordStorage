import React, { useContext, useState } from "react";
import { Card, Label, TextInput, Button } from "flowbite-react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../Components/Authentication/AuthContext";
import axios from "axios";

function RegisterPage() {

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [invalidMsg, setInvalidMsg] = useState("");
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await axios
            .post("/api/register", {
                username: userName,
                password: password,
            })
            .then((response) => {
                login(response.data.access_token);
            })
            .catch((error) => {
                setInvalidMsg(error.response.data.detail);
            });
            if (response != null){
                console.log("navigation")
                navigate("/");
            }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <Card>
                <div className="mb-2 text-center block w-96 mx-4">
                    <Label className="text-xl" value="Sign up your new account" />
                </div>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="userName" value="Username" />
                        </div>
                        <TextInput
                            id="userName"
                            placeholder="username123"
                            required={true}
                            onChange={(event) => setUserName(event.target.value)}
                            color={invalidMsg === "" ? "gray" : "failure"}
                            helperText={
                                <React.Fragment>
                                    <span className="font-medium">
                                        {invalidMsg}
                                    </span>
                                </React.Fragment>
                            }
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="password1" value="Your password" />
                        </div>
                        <TextInput
                            id="password1"
                            type="password"
                            required={true}
                            onChange={(event) => setPassword(event.target.value)}
                            color={invalidMsg === "" ? "gray" : "failure"}
                            helperText={
                                <React.Fragment>
                                    <span className="font-medium">
                                        {invalidMsg}
                                    </span>
                                </React.Fragment>
                            }
                        />
                    </div>
                    <Button type="submit" className="mt-2">
                        Sign Up
                    </Button>
                    <div className="mb-2 block">
                        <Label value="Already have an account? " />
                        <Link
                            to="/login"
                            className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                        >
                            Login
                        </Link>
                    </div>
                </form>
            </Card>
        </div>
    );
}

export default RegisterPage;