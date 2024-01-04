import Background from "/Register.png";

export default function Register() {
  return (
    <div
      className="flex justify-center items-center h-screen w-screen fixed"
      style={{
        backgroundImage: `url(${Background})`,
        backgroundSize: "cover",
      }}
    >
      <div className="flex flex-col max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
        <div className="self-center mb-2 text-xl font-light text-gray-800 sm:text-2xl dark:text-white">
          Registration
        </div>
        <div className="p-6 mt-8">
          <form action="#">
            <div className="flex flex-col gap-4 mb-2">
              <div className=" relative ">
                <input
                  type="text"
                  id="create-account-first-name"
                  className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  name="email"
                  placeholder="Enter Your Email"
                />
              </div>
              <div className=" relative ">
                <input
                  type="text"
                  id="create-account-last-name"
                  className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  name="password"
                  placeholder="Enter Your Password"
                />
              </div>
              <div className=" relative ">
                <input
                  type="text"
                  id="create-account-email"
                  className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  name="confirmPassword"
                  placeholder="Confirm Your Password"
                />
              </div>
            </div>
            <div className="flex w-full my-4">
              <button
                type="submit"
                className="py-2 px-4  bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
              >
                Register
              </button>
            </div>
          </form>
          <div className="flex items-center justify-center mt-6">
            <div>
              <label className="flex items-center mb-3 space-x-3">
                <input
                  type="checkbox"
                  name="checked-demo"
                  className="form-tick appearance-none bg-white bg-check h-4 w-4 border border-gray-300 rounded-full checked:bg-blue-500 checked:border-transparent focus:outline-none"
                />
                <span className="font-normal text-gray-700 dark:text-white">
                  I Agree Terms & Condition
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
