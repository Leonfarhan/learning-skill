import {Form, useActionData, useLocation, useNavigation,} from "react-router-dom";

export const loginAction = async (formData) => {
  try {
    // Perform authentication logic here, for example, making an API request
    // to validate user credentials.
    const response = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      // Successful login, return user data or a success message.
      const user = await response.json();
      return { user };
    } else {
      // Authentication failed, return an error message.
      return { error: "Invalid credentials" };
    }
  } catch (error) {
    // Handle network or other errors.
    return { error: "Network error" };
  }
};

export const loginLoader = () => {
  // You can implement this function to load data needed for the login page.
  // For example, you might fetch some initial data or perform any setup required.
  return null;
};


export default function LoginPage() {
  let location = useLocation();
  let params = new URLSearchParams(location.search);
  let from = params.get("from") || "/";

  let navigation = useNavigation();
  let isLoggingIn = navigation.formData?.get("username") != null;

  let actionData = useActionData();
  return (
    <div className="bg-white p-8 rounded shadow-md w-96">
      <div className="text-center">
        <img src="your-logo.png" alt="Logo" className="w-12 h-12 mx-auto" />
        <h2 className="text-xl font-semibold mt-4 text-gray-600">
          Skill Share
        </h2>
      </div>
      <Form method="post" replace className="mt-8">
        <input type="hidden" name="redirectTo" value={from} />
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
            className="w-full py-2 px-3 rounded border border-gray-300 "
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
        <a href="#" className="text-sm text-blue-600 hover:underline">
          Forgot your password?
        </a>
        <button
          type="submit"
          className="w-full mt-6 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
          disabled={isLoggingIn}
        >
          {isLoggingIn ? "Logging in..." : "Login"}
        </button>
        {actionData && actionData.error ? (
          <p style={{ color: "red" }}>{actionData.error}</p>
        ) : null}
      </Form>
      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">Don't have an account?</p>
        <a href="#" className="text-sm text-blue-600 hover:underline">
          Register
        </a>
      </div>
    </div>
  );
}
