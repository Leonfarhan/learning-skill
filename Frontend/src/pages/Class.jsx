import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Card from "../components/Card";
import Search from "../components/Search";

const Class = () => {
  const setSidebarClassOpen = () => {
    if (window.parent && window.parent.setClassOpen) {
      window.parent.setClassOpen(true);
    }
  };

  useEffect(() => {
    setSidebarClassOpen();
  }, []);

  return (
    <>
      <div className="flex fixed">
        <Sidebar />
        <section className="flex-1 p-10">
          <Search placeHolderText="Cari kelas yang kamu inginkan" />
          <div className="mb-4">
            Atau Kamu Mempunyai keahlian disuatu bidang dan ingin membuat kelas
            baru? bisa klik tombol disamping berikut
            <button
              type="submit"
              className="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-blue-600 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 "
            >
              <svg
                className="w-4 h-4 me-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 10 15 10M10 5 10 15"
                />
              </svg>{" "}
              Tambah
            </button>
          </div>
          <Card />
        </section>
      </div>
    </>
  );
};

export default Class;
