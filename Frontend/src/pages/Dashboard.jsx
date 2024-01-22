import { Link } from 'react-router-dom';
import Sidebar from "../components/Sidebar";

export default function Dashboard() {
  return (
    <>
      <div className="flex fixed">
        <Sidebar />
        <section className="flex-1 h-full pt-24">
          <div className="px-8 py-8">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="bg-[#2B3467] p-8 md:p-12 lg:px-16 lg:py-24">
                <div className="mx-auto max-w-xl text-center">
                  <h2 className="text-2xl font-bold text-white md:text-3xl">  
                    Selamat Datang Leonfarhan
                  </h2>

                  <p className="hidden text-white/90 sm:mt-4 sm:block">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et,
                    egestas tempus tellus etiam sed. Quam a scelerisque amet
                    ullamcorper eu enim et fermentum, augue. Aliquet amet
                    volutpat quisque ut interdum tincidunt duis.
                  </p>

                  <div className="flex justify-center mt-28 space-x-4">
                    <Link to="/class">
                      <a
                        href="#"
                        className="inline-block rounded border border-white bg-white px-12 py-3 text-sm font-medium text-black transition hover:bg-transparent hover:text-white focus:outline-none focus:ring focus:ring-yellow-400"
                      >
                        Jelajahi Class
                      </a>
                    </Link>

                    <Link to='/threads'>
                      <a
                        href="#"
                        className="inline-block rounded border border-white bg-white px-12 py-3 text-sm font-medium text-black transition hover:bg-transparent hover:text-white focus:outline-none focus:ring focus:ring-yellow-400"
                      >
                        Jelajahi Threads
                      </a>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 md:grid-cols-1 lg:grid-cols-2">
                <img
                  alt="Student"
                  src="https://images.unsplash.com/photo-1621274790572-7c32596bc67f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=654&q=80"
                  className="h-40 w-full object-cover sm:h-56 md:h-full"
                />

                <img
                  alt="Student"
                  src="https://images.unsplash.com/photo-1567168544813-cc03465b4fa8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
                  className="h-40 w-full object-cover sm:h-56 md:h-full"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}