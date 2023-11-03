import {Outlet, useFetcher, useRouteLoaderData} from "react-router-dom";
import AuthLayout from "./AuthLayout";
import AppLayout from "./AppLayout";

function Layout() {
    // Get our logged in user, if they exist, from the root route loader data
    let {user} = useRouteLoaderData("root");
    let fetcher = useFetcher();

    if (!user) {
        return (
            <AuthLayout>
                <Outlet/>
            </AuthLayout>
        );
    }

    let isLoggingOut = fetcher.formData != null;
    return (
        <AppLayout>
            <Outlet/>
        </AppLayout>
    );
    return (
        <div>
            <p>Welcome {user}!</p>
            <fetcher.Form method="post" action="/logout">
                <button type="submit" disabled={isLoggingOut}>
                    {isLoggingOut ? "Signing out..." : "Sign out"}
                </button>
            </fetcher.Form>
        </div>
    );
    return (
        <div>
            <div className="min-h-screen flex items-center justify-center"></div>
            {/* <h1>Auth Example using RouterProvider</h1>
      <AuthStatus />

      <ul>
        <li>
          <Link to="/">Public Page</Link>
        </li>
        <li>
          <Link to="/protected">Protected Page</Link>
        </li>
      </ul> */}

            <Outlet/>
        </div>
    );
}

export default Layout;
