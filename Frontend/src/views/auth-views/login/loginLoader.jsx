import {fakeAuthProvider} from "../../../auth.jsx";
import {redirect} from "react-router-dom";

export async function loginLoader() {
    if (fakeAuthProvider.isAuthenticated) {
        return redirect("/");
    }
    return null;
}