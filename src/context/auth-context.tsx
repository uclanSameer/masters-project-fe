import { User } from "@/model/user";
import React, { createContext, useState } from "react";

const AuthContext = createContext({
    isLoggedIn: false,
    onLogout: () => {
    },
    onLogin: () => {
    },
    cartItemCount: 0,
    incrementCartItemCount: () => { },
    decrementCartItemCount: () => { }
})

export function AuthContextProvider(props: { children: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [cartItemCount, setCartItemCount] = useState(0);


    function loginHandler() {
        setIsLoggedIn(true);
    }

    function logoutHandler() {
        setIsLoggedIn(false);

        (window as any).localStorage.removeItem('isLoggedIn');
    }

    function getIsLoggedIn() {
        return isLoggedIn;
    }

    function incrementCartItemCount() {
        setCartItemCount(cartItemCount + 1);
    }

    function decrementCartItemCount() {
        if (cartItemCount === 0) {
            return;
        }
        setCartItemCount(cartItemCount - 1);
    }



    const context = {
        isLoggedIn: getIsLoggedIn(),
        onLogout: logoutHandler,
        onLogin: loginHandler,
        cartItemCount,
        incrementCartItemCount: incrementCartItemCount,
        decrementCartItemCount: decrementCartItemCount
    }

    return (<AuthContext.Provider value={
        context
    }>
        {props.children}
    </AuthContext.Provider>)
}


export default AuthContext;