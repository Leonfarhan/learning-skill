import {
    RouterProvider,
    createBrowserRouter,
    redirect, Navigate,
} from "react-router-dom";
import {fakeAuthProvider} from "./auth";
import AppLayout from "./layouts/AppLayout.jsx";
import LoginPage from "./views/auth-views/login";
import loginAction from "./views/auth-views/login/loginAction.jsx";
import RegisterPage from "./views/auth-views/sign-up/index.jsx";
import AuthLayout from "./layouts/AuthLayout.jsx";

const router = createBrowserRouter([
    {
        path: "auth",
        element: <AuthLayout/>,
        loader() {
            if (fakeAuthProvider.isAuthenticated) {
                return redirect("/app");
            }
            return null;
        },
        children: [
            {
                index: true,
                path: "login",
                action: loginAction,
                element: <LoginPage/>,
            },
            {
                path: "register",
                // action: signInAction,
                // loader: signInLoader,
                element: <RegisterPage/>,
            },
        ]
    },
    {
        path: "app",
        loader({request}) {
            const url = new URL(request.url)
            if (!fakeAuthProvider.isAuthenticated) {
                let params = new URLSearchParams();
                params.set("from", url.pathname);
                return redirect("/auth/login?" + params.toString());
            } else if (url.pathname.split("/").filter(x => x !== "").pop() === "app") {
                return redirect("/app/protected");
            }
            return null;
        },
        element: <AppLayout/>,
        children: [
            {
                path: "protected",
                loader() {
                    return null;
                },
                element: <ProtectedPage/>
            },
            {
                path: "protected2",
                loader() {
                    return null;
                },
                element: <ProtectedPage/>
            }

        ]
    },
    {
        path: "*",
        element: <Navigate to={fakeAuthProvider.isAuthenticated ? "/app/protected" : "/auth/login"} replace/>,
    },
    {
        path: "/logout",
        async action() {
            // We signout in a "resource route" that we can hit from a fetcher.Form
            await fakeAuthProvider.signOut();
            return redirect("/");
        },
    },

]);

function loader({request}) {
    // If the user is not logged in and tries to access `/protected`, we redirect
    // them to `/login` with a `from` parameter that allows login to redirect back
    // to this page upon successful authentication
    if (!fakeAuthProvider.isAuthenticated) {
        let params = new URLSearchParams();
        params.set("from", new URL(request.url).pathname);
        return redirect("/login?" + params.toString());
    }
    return redirect("/protected");
}

export default function App() {
    return (
        <RouterProvider router={router} fallbackElement={<p>Initial Load...</p>}/>
    );
}

function protectedLoader({request}) {
    // If the user is not logged in and tries to access `/protected`, we redirect
    // them to `/login` with a `from` parameter that allows login to redirect back
    // to this page upon successful authentication
    if (!fakeAuthProvider.isAuthenticated) {
        let params = new URLSearchParams();
        params.set("from", new URL(request.url).pathname);
        return redirect("/login?" + params.toString());
    }
    return null;
}

function ProtectedPage() {
    return <h3>Protected</h3>;
}
