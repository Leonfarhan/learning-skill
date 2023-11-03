import {fakeAuthProvider} from "../../../auth.jsx";
import {redirect} from "react-router-dom";

export async function loginAction({request}) {
    let formData = await request.formData();
    let email = formData.get("email");

    // Validate our form inputs and return validation errors via useActionData()
    if (!email) {
        return {
            error: "You must provide a email to log in",
        };
    }

    // Sign in and redirect to the proper destination if successful.
    try {
        await fakeAuthProvider.signin(email);
    } catch (error) {
        // Unused as of now but this is how you would handle invalid
        // username/password combinations - just like validating the inputs
        // above
        return {
            error: "Invalid login attempt",
        };
    }

    let redirectTo = formData.get("redirectTo");
    return redirect(redirectTo || "/");
}