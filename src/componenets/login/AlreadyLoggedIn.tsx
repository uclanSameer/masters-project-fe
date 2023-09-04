import Link from "next/link";
import React from "react";

export function AlreadyLoggedIn({ }) {
    return (<div className="text-grey-dark mt-6">
        Already have an account?
        <Link className="border-b border-blue text-blue-600 ml-1" href="/login">
            Log in
        </Link>.
    </div>);
}