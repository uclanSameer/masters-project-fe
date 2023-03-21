import { User } from "@/model/user";
import React, { createContext, useState } from "react";

const AuthContext = createContext({
    isLoggedIn: false,
    onLogout: () => {
    },
    onLogin: (user: User) => {
    }
})

export function AuthContextProvider(props: { children: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    function loginHandler(loggedInUser: User) {
        setIsLoggedIn(true);
    }

    function logoutHandler() {
        setIsLoggedIn(false);

        (window as any).localStorage.removeItem('isLoggedIn');
    }

    function getIsLoggedIn() {
        return isLoggedIn;
    }

    const context = {
        isLoggedIn: getIsLoggedIn(),
        onLogout: logoutHandler,
        onLogin: loginHandler,
    }

    return (<AuthContext.Provider value={
        context
    }>
        {props.children}
    </AuthContext.Provider>)
}


export default AuthContext;