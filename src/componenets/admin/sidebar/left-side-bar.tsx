import { Fragment } from "react";
import SideBarLayout from "./layout";
import TopSideBar from "./top";
import Overview from "./overview";

export default function LeftSideBar(props: { role: string }) {
    return (
        <Fragment>
            <SideBarLayout>
                <>
                    <TopSideBar role={props.role} />
                    <Overview role={props.role} />
                    {/* <Vendors /> */}
                    {/* <Services /> */}
                </>
            </SideBarLayout>
        </Fragment>
    );
}