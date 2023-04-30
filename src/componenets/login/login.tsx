import Link from "next/link";
import React, { MutableRefObject, useContext, useRef } from "react";
import { useRouter } from "next/router";
import AuthContext from "../../context/auth-context";
import { toast } from "react-toastify";
import { Response } from "@/model/response";
import { User } from "@/model/user";


export default function LoginComponent() {
    const authContext = useContext(AuthContext);
    const emailRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();

    const router = useRouter();

    async function submitHandler(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();

        const enteredEmail = emailRef.current?.value || '';
        const enteredPassword = passwordRef.current?.value || '';

        if (enteredEmail.trim().length === 0 || enteredPassword.trim().length === 0) {
            toast.error('Please enter a valid email and password', {
                position: "bottom-right",
            });
            return;
        }
        if (!enteredEmail.includes('@')) {
            toast.error('Please enter a valid email', {
                position: "bottom-right",
            });
            return;
        }
        const myHeaders = new Headers();
        myHeaders.append("email", enteredEmail);
        myHeaders.append("password", enteredPassword);

        const result = await fetch('http://localhost:8080/api/v1/user/authenticate', {
            method: 'POST',
            headers: myHeaders,
            credentials: 'include',
            redirect: 'follow'
        });

        if (result.status === 200) {
            const data: Response<User> = await result.json();
            const role = data.data.userRole;
            const address = data.data.address;
            const addressToString = JSON.stringify(address);
            document.cookie = `token=${data.data.token}`;
            document.cookie = `role=${role}`;
            document.cookie = `email=${data.data.email}`;
            document.cookie = `address=${addressToString}`;
            document.cookie = `loggedIn=true`;
            authContext.onLogin(data.data);
            if (role === 'ADMIN') {
                return router.push('/admin/dashboard');
            } else if (role === 'BUSINESS') {
                return router.push('/business-dashboard');
            } else if (role === 'DELIVERY') {
                return router.push('/delivery/dashboard');
            }
        } else {
            const error = await result.json();
            if (error.data) {
                toast.error('Wrong username or password', {
                    position: "bottom-right",
                });
            }
        }
    }

    return (
        <section className="h-screen">
            <div className="container px-6 py-12 h-full">
                <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
                    <Image />
                    <div className="md:w-8/12 lg:w-5/12 lg:ml-20">
                        <form>
                            <div className="mb-6">
                                <input
                                    type="text"
                                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    placeholder="Email address"
                                    ref={emailRef as MutableRefObject<HTMLInputElement>}
                                />
                            </div>

                            <div className="mb-6">
                                <input
                                    type="password"
                                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    placeholder="Password"
                                    ref={passwordRef as MutableRefObject<HTMLInputElement>}
                                />
                            </div>

                            <div className="flex justify-between items-center mb-6">
                                <a
                                    href="#!"
                                    className="text-blue-600 hover:text-blue-700 focus:text-blue-700 active:text-blue-800 duration-200 transition ease-in-out"
                                >Forgot password?</a
                                >
                            </div>

                            <button
                                type="submit"
                                className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                                data-mdb-ripple="true"
                                data-mdb-ripple-color="light"
                                onClick={submitHandler}
                            >
                                Sign in
                            </button>

                            <div className="mt-6">
                                <p className="text-gray-800 text-center">
                                    Don't have an account?
                                    <Link
                                        href="/signup"
                                        className="ml-1 text-blue-600 hover:text-blue-700 focus:text-blue-700 active:text-blue-800 duration-200 transition ease-in-out"
                                    >Sign up</Link
                                    >
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>

    );
}


function Image() {
    return (<div className="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" className="w-full" alt="Phone image" />
    </div>);
}
