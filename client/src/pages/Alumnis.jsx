import { useEffect, useState } from "react";
import {api} from "../utils.js";
import {Link, Navigate, useOutletContext } from "react-router-dom";
import {AiFillEdit, AiFillDelete} from "react-icons/ai";
import {BiDetail} from "react-icons/bi";
import Header from "../components/Header.jsx";
import Sidebar from "../components/Sidebar.jsx";

const Alumnis = () => {
  const [alumni, setAlumni] = useState([]);
  const user = useOutletContext()[0];
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
      api("/alumni").then((alumni) => setAlumni(alumni));
    }, [user]);

    const sortedFilteredAlumni = alumni
    .filter((alumnus) =>
      alumnus.nama.toLowerCase().includes(search.toLowerCase())
    )
    .toSorted((a,b) => {
      if (sortOrder === "asc") {
        return a[sortBy] < b[sortBy] ? -1 : 1;
      } else {
        return a[sortBy] > b[sortBy] ? -1 : 1;
      }
    });

  if(user){
      return (
        <> 
          <Header/>
          <div className="flex">
            <Sidebar/>
            <div className="ml-36 mt-16">
                <h1 className="text-3xl font-bold pb-4">Data Almuni</h1>
                <div className="flex flex-row gap-4 text-center items-center">
                  <div className="mb-4">
                    <input
                      type="text"
                      placeholder="Cari berdasarkan nama..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="border p-2 rounded"
                    />
                  </div>
                  <label className="text-lg font-semibold mb-2 flex">
                    <h2 className="text-sm pt-2">Urutkan : </h2>
                    <div className="flex gap-4 items-center">
                      <select
                        className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                        onChange={(e) => setSortBy(e.target.value)}
                      >
                        <option value="id">Normal</option>
                        <option value="nama">Nama</option>
                        <option value="angkatan">Angkatan</option>
                      </select>
                      <select
                        className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                        onChange={(e) => setSortOrder(e.target.value)}
                      >
                        <option value="asc">Naik</option>
                        <option value="desc">Turun</option>
                      </select>
                    </div>
                  </label>
                </div>
                <div className="max-h-[15rem]">
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
                      .filter((_alumni, index) => index >= page * 10 - 10 && index < page * 10)
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
                              <BiDetail/>
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
                      disabled={page === Math.ceil(sortedFilteredAlumni.length / 10)}
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