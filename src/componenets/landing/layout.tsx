import React, { Fragment, useContext, useEffect, useState } from "react";
import { parse } from "cookie";
import AuthContext from "@/context/auth-context";
import NavBar from "../nav/nav";
import AdminNavigation from "../admin/admin-nav";

export default function LandingLayout(props: { children: JSX.Element }) {
    const authContext = useContext(AuthContext);
    const [role, setRole] = useState('');
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        let windowCookie = document.cookie;
        let parsedCookie = parse(windowCookie);
        setRole(parsedCookie.role);
        setLoading(false);
    }, [authContext.isLoggedIn]);

    if (!loading) {
        return (
            <Fragment>
                {
                    role === 'ADMIN' ? <AdminNavigation role={role} /> : (
                        role === 'BUSINESS' ? <AdminNavigation role={role} /> : <NavBar />
                    )
                }
                {props.children}
            </Fragment>
        )
    }
    return (
        <div>
            ...Loading
        </div>
    )
}