import { Fragment, useContext } from "react";
import { useRouter } from "next/router";
import AuthContext from "@/context/auth-context";
import LoginComponent from "@/componenets/login/login";

export default function Login() {
    const authContext = useContext(AuthContext);
    {
        const router = useRouter();
        authContext.isLoggedIn && router.push('/dashboard')
    }
    return (
        <Fragment>
            <LoginComponent />
        </Fragment>
    );
}