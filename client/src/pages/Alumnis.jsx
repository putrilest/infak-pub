import { useEffect, useState } from "react";
import {api} from "../utils.js"
import {Link, Navigate, useOutletContext } from "react-router-dom";
import {AiFillEdit, AiFillDelete} from "react-icons/ai"
import Header from "../components/Header.jsx";
import Sidebar from "../components/Sidebar.jsx";

const Alumnis = () => {
  const [alumni, setAlumni] = useState([]);
  const user = useOutletContext()[0];
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
      api("/alumni").then((alumni) => setAlumni(alumni));
    }, [user]);

    const sortedFilteredAlumni = alumni.filter((alumnus) =>
    alumnus.nama.toLowerCase().includes(search.toLowerCase())
  );

  if(user){
      return (
        <> 
          <Header/>
          <div className="flex">
            <Sidebar/>
            <div className="ml-36 mt-24 ">
                <h1 className="text-3xl font-bold pb-4">Data Almuni</h1>
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Cari berdasarkan nama..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border p-2 rounded"
                  />
                </div>
                <div className="overflow-y-auto max-h-[15rem]">
                  <table className="border-collapse border border-slate-400 p-2">
                      <thead className="bg-blue-900 text-white sticky top-0">
                          <tr className="border border-slate-300">
                              <th className="px-8">Nama</th>
                              <th className="px-8">Angkatan</th>
                              <th className="px-8">Total Infak</th>
                              <th className="px-8">Keterangan</th>
                              <th className="px-8">Tindakan</th>
                          </tr>
                      </thead>
                      <tbody className="border-collapse border border-slate-400 p-4">
                      {sortedFilteredAlumni
                      .filter((_alumni, index) => index >= page * 5 - 5 && index < page * 5)
                      .map((alumni,index) => (
                        <tr key={alumni.id} className={index % 2 === 0 ? "bg-white " : "bg-gray-100"}>
                          <td className="px-4">{alumni.nama}</td>
                          <td className="px-14">{alumni.angkatan}</td>
                          <td className="px-14">{alumni.totalInfak}</td>
                          <td className="px-8">{alumni.keterangan}</td>
                          <td className="px-12 flex flex-row gap-4 cursor-pointer">
                            <Link to={`/alumni/${alumni.id}/edit`}>
                              <button><AiFillEdit/></button>
                            </Link>
                            <button
                              onClick={async () => {
                                if (
                                  confirm(`Apakah Anda yakin ingin menghapus ${alumni.nama}?`)
                                ) {
                                  const message = await api(`/alumni/${alumni.id}`, "DELETE");
                                  const alumnis = await api("/alumni");
                                  setAlumni(alumnis);
                                  alert(message);
                                }
                              }}
                            >
                              <AiFillDelete/>
                            </button>
                            <Link to={`/alumni/${alumni.id}`}>
                              <button>Detail</button>
                            </Link>
                          </td>
                        </tr>
                      ))
                      }
                      </tbody>
                  </table>
                  <div className="flex flex-row gap-2 mt-4">
                    <button 
                      className="w-1/4 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300" 
                      onClick={() => setPage(page - 1)} disabled={page === 1}>
                      Sebelumnya
                    </button>
                    {page}
                    <button
                      className="w-1/4 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                      onClick={() => setPage(page + 1)}
                      disabled={page === Math.ceil(sortedFilteredAlumni.length / 5)}
                    >
                      Selanjutnya
                    </button>
                  </div>
                </div>
            </div>
          </div>
        </>
      )
  }else{
    return <Navigate to="/login" />;
  }
}

export default Alumnis