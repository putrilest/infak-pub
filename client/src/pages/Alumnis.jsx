import { useEffect, useState } from "react";
import {api} from "../utils.js"
import {Link, Navigate, useOutletContext } from "react-router-dom";
import {AiFillEdit, AiFillDelete} from "react-icons/ai"
import Header from "../components/Header.jsx";
import Sidebar from "../components/Sidebar.jsx";

const Alumnis = () => {
  const [alumni, setAlumni] = useState([]);
  const user = useOutletContext()[0];


  useEffect(() => {
      api("/alumni").then((alumni) => setAlumni(alumni));
    }, [user]);

  if(user){
      return (
        <>
          <Header/>
          <div className="flex">
            <Sidebar/>
            <div className="ml-36 mt-24 ">
                <h1 className="text-3xl font-bold pb-4">Data Almuni</h1>
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
                      {alumni
                      .map((alumni,index) => (
                        <tr key={alumni.id} className={index % 2 === 0 ? "bg-white " : "bg-gray-100"}>
                          <td className="px-4">{alumni.nama}</td>
                          <td className="px-14">{alumni.angkatan}</td>
                          <td className="px-14">{alumni.totalInfak}</td>
                          <td className="px-8">{alumni.keterangan}</td>
                          <td className="px-12 flex flex-row gap-4 cursor-pointer">
                            <button>
                              <Link to={`/alumni/${alumni.id}/edit`}><AiFillEdit/></Link>
                            </button>
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
                          </td>
                        </tr>
                      ))
                      }
                      </tbody>
                  </table>
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