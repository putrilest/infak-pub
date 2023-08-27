import { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex bg-slate-600 w-1/6 h-screen ml-0">
      {/* Sidebar */}
      
      <aside
        className={`bg-lightBlue md:w-1/4 ${
          isSidebarOpen ? 'w-4' : 'w-2'
        } transition-all duration-300`}
      >
        <div className="p-4">
          <button
            onClick={toggleSidebar}
            className="block md:hidden text-black focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              {isSidebarOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
          {/* <h1 className="text-2xl text-black font-semibold mb-4">Sidebar</h1> */}
          <nav className={`${isSidebarOpen ? 'block' : 'hidden'} md:block`}>
            <ul className="space-y-2 flex flex-col gap-2">
              <Link to="/">Dashboard</Link>
              <Link to="/alumni">Data Alumni</Link>
              <Link to="/addAlumni">Tambah Alumni</Link>
              <Link to="/infak">Data Infak</Link>
              <Link to="/addInfak">Tambah Infak</Link>
              <Link to="/rekening">Data Rekening</Link>
              <Link to="/addRekening">Tambah Rekening</Link>
            </ul>
          </nav>
        </div>
      </aside>

      {/* Main Content
      <main className="flex-1 p-4">Main Content Goes Here</main> */}
    </div>
  );
};

export default Sidebar;