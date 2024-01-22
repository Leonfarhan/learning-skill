import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const Sidebar = () => {
  const [isClassOpen, setIsClassOpen] = useState(false);

  const setClassOpen = (value) => {
    setIsClassOpen(value);
  };

  const location = useLocation();

  return (
    <div>
      <div className="flex h-screen flex-col justify-between border-e bg-[#2B3467]">
        <div className="px-4 py-6">
          <img src="src/assets/logo-text.svg" className="w-32 h-auto mx-auto" />

          <ul className="mt-6 space-y-1">
            <li>
              <Link
                href=""
                to="/dashboard"
                // className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
                className={`${location.pathname === '/dashboard' ? 'block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700' : 'block rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-100 text-white hover:text-gray-700'}`}
              >
                Dashboard
                
              </Link>
            </li>
            <li>
              <details
                open={isClassOpen}
                className={`${location.pathname === '/class' ? 'rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700' : 'block rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-100 text-white hover:text-gray-700'}`}
                // className="group [&_summary::-webkit-details-marker]:hidden"
              >
                <summary
                  onClick={() => setIsClassOpen(!isClassOpen)}
                  className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-white hover:bg-gray-100 hover:text-gray-700"
                  
                >
                  <Link to="/class" className="text-sm font-medium w-full">
                    Class
                  </Link>

                  <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </summary>

                <ul className="mt-2 space-y-1 px-4">
                  <li>
                    <a
                      href=""
                      className="block rounded-lg px-4 py-2 text-sm font-medium text-white hover:bg-gray-100 hover:text-gray-700"
                    >
                      Front-End Developer
                    </a>
                  </li>

                  <li>
                    <a
                      href=""
                      className="block rounded-lg px-4 py-2 text-sm font-medium text-white hover:bg-gray-100 hover:text-gray-700"
                    >
                      Back-End Developer
                    </a>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <Link
                to="/threads"
                className={`${location.pathname === '/threads' ? 'block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700' : 'block rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-100 text-white hover:text-gray-700'}`}
              >
                Threads
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <Link to="/account">
          <a
            href="#"
            className="flex items-center gap-2 bg-white py-4 px-5 m-2 rounded-lg hover:bg-gray-50"
          >
            <img
              alt="Man"
              src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              className="h-10 w-10 rounded-full object-cover"
            />

            <div>
              <p className="text-xs">
                <strong className="block font-medium">Leonfarhan</strong>
              </p>
            </div>
          </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;