import { Fragment, useContext } from "react";
import { useRouter } from "next/router";
import SignupComponent from "@/componenets/signup";
import AuthContext from "@/context/auth-context";

export default function Signup() {

    const authContext = useContext(AuthContext);
    const router = useRouter();
    authContext.isLoggedIn && router.push('/dashboard')
    return (
        <Fragment>
            <div className="bg-gray-200">
                <SignupComponent
                 isDelivery = {false}
                 showAlreadHaveAccount = {true}
                  />
            </div>
        </Fragment>
    );
}