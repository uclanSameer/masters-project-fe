import { Fragment } from "react";
import AdminHeadNav from "./header";
import LeftSideBar from "./sidebar/left-side-bar";

export default function AdminNavigation(props: { role: string }) {
    return (
        <Fragment>
            <AdminHeadNav />
            <LeftSideBar role={props.role} />
        </Fragment>
    );
}