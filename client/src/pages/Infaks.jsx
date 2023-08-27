import { useEffect, useState } from "react";
import {api} from "../utils.js"
import { Link, Navigate, useOutletContext } from "react-router-dom";
import {AiFillEdit, AiFillDelete} from "react-icons/ai"
import Header from "../components/Header.jsx";
import Sidebar from "../components/Sidebar.jsx";

const Infaks = () => {
  const [infaks, setInfaks] = useState([]);
  const user = useOutletContext()[0];


  useEffect(() => {
      api("/infak").then((infak) => setInfaks(infak));
    }, [user]);

  if(user){
      return (
        <>
          <Header/>
          <div className="flex">
            <Sidebar/>
            <div className="ml-36 mt-24 ">
                <h1 className="text-3xl font-bold pb-4">Data Infak PUB</h1>
                <div className="overflow-y-auto max-h-[15rem]">
                  <table className="border-collapse border border-slate-400 p-2">
                      <thead className="bg-blue-900 text-white sticky top-0">
                          <tr className="border border-slate-300">
                              <th className="px-8">Tanggal</th>
                              <th className="px-8">Id Alumni</th>
                              <th className="px-8">Id Rekening</th>
                              <th className="px-8">Jumlah Infak</th>
                              <th className="px-8">Tindakan</th>
                          </tr>
                      </thead>
                      <tbody className="border-collapse border border-slate-400 p-4">
                      {infaks
                      .map((infak,index) => (
                        <tr key={infaks.id} className={index % 2 === 0 ? "bg-white " : "bg-gray-100"}>
                          <td className="px-4">{infak.tanggal}</td>
                          <td className="px-14">{infak.idAlumni}</td>
                          <td className="px-14">{infak.idRekening}</td>
                          <td className="px-8">{infak.jumlahInfak.toLocaleString("id-ID", {
                                style: "currency",
                                currency: "IDR",
                                maximumFractionDigits: 0,
                            })}
                          </td>
                          <td className="px-12 flex flex-row gap-4 cursor-pointer">
                            <button>
                              <Link to={`/infak/${infak.id}/edit`}><AiFillEdit/></Link>
                            </button>
                            <button
                              onClick={async () => {
                                if (
                                  confirm(`Apakah Anda yakin ingin menghapus Infak ini?`)
                                ) {
                                  const message = await api(`/infak/${infak.id}`, "DELETE");
                                  const infaks = await api("/infak");
                                  setInfaks(infaks);
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

export default Infaks