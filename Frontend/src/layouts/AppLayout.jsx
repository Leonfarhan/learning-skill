import {Outlet, useFetcher} from "react-router-dom";
import LeftSidebar from "../components/shared/LeftSidebar.jsx";

export default function AppLayout() {
    // Get our logged in user, if they exist, from the root route loader data
    // let {user} = useRouteLoaderData("root");
    let fetcher = useFetcher();

    // if (!user) {
    //     return <p>You are not logged in.</p>;
    // }

    let isLoggingOut = fetcher.formData != null;
    return <>
        <div className="drawer drawer-mobile">
            <input id="left-sidebar-drawer" type="checkbox" className="drawer-toggle"/>
            {/*<PageContent/>*/}
            <Outlet/>
            <LeftSidebar/>
        </div>
        {/*<p>Welcome {user}!</p>*/}
        <fetcher.Form method="post" action="/logout">
            <button type="submit" disabled={isLoggingOut}>
                {isLoggingOut ? "Signing out..." : "Sign out"}
            </button>
        </fetcher.Form>
    </>;
}
