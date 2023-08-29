import { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex bg-blue-900 text-white w-40 h-screen ml-0">      
      <aside
        className={`bg-lightBlue md:w-1/4${
          isSidebarOpen ? 'w-1/2' : 'w-0'
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
          <nav className={`${isSidebarOpen ? 'block' : 'hidden'} md:block`}>
            <ul className="space-y-2 flex flex-col gap-4">
              <li><Link className="truncate hover:text-blue-200 hover:text-lg" to="/">Dashboard</Link></li>
              <li><Link className="truncate hover:text-blue-200 hover:text-lg" to="/alumni">Data Alumni</Link></li>
              <li><Link className="truncate hover:text-blue-200 hover:text-lg" to="/addAlumni">Tambah Alumni</Link></li>
              <li><Link className="truncate hover:text-blue-200 hover:text-lg" to="/infak">Data Infak</Link></li>
              <li><Link className="truncate hover:text-blue-200 hover:text-lg" to="/addInfak">Tambah Infak</Link></li>
              <li><Link className="truncate hover:text-blue-200 hover:text-lg" to="/rekening">Data Rekening</Link></li>
              <li><Link className="truncate hover:text-blue-200 hover:text-lg" to="/addRekening">Tambah Rekening</Link></li>
            </ul>
          </nav>
        </div>
        <div className="whitespace-nowrap text-xm text-center text-blue-200 ml-auto mt-72">&copy; 2023 PutriL</div>
      </aside>
    </div>
  );
};

export default Sidebar;
