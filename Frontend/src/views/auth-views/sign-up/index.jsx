import {Form, useActionData, useLocation, useNavigation} from "react-router-dom";
import {} from "daisyui";

export default function RegisterPage() {
    let location = useLocation();
    let params = new URLSearchParams(location.search);
    let from = params.get("from") || "/";

    let navigation = useNavigation();
    let isRegistering = navigation.formData?.get("username") != null;

    let actionData = useActionData();

    return (
        <div className="bg-white p-8 rounded shadow-md w-96">
            <div className="text-center">
                <img src="your-logo.png" alt="Logo" className="w-12 h-12 mx-auto"/>
                <h2 className="text-xl font-semibold mt-4 text-gray-600">
                    Skill Share
                </h2>
                <h3 className="text-xl font-semibold mt-4 text-gray-600">
                    Registration
                </h3>
            </div>
            <Form method="post" replace className="mt-8">
                <input type="hidden" name="redirectTo" value={from}/>
                <div className="mb-4">
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-600 text-left"
                    >
                        Full Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="w-full py-2 px-3 rounded border border-gray-300"
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-600 text-left"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full py-2 px-3 rounded border border-gray-300"
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-600 text-left"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="w-full py-2 px-3 rounded border border-gray-300"
                    />
                </div>
                <div className="form-control">
                    <label className="label cursor-pointer justify-start">
                        <input type="checkbox" checked="checked" className="checkbox mr-2"/>
                        <span className="label-text">I agree to the Terms and Conditions</span>
                    </label>
                </div>
                <button
                    type="submit"
                    className="w-full mt-6 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                    disabled={isRegistering}
                >
                    {isRegistering ? "Registering..." : "Register"}
                </button>
                {actionData && actionData.error ? (
                    <p style={{color: "red"}}>{actionData.error}</p>
                ) : null}
            </Form>
            <div className="text-center mt-4">
                <p className="text-sm text-gray-600">Already have an account?</p>
                <a href="/login" className="text-sm text-blue-600 hover:underline">
                    Login
                </a>
            </div>
        </div>
    );
}
