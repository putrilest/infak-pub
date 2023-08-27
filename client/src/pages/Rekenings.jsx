import { useEffect, useState } from "react";
import {api} from "../utils.js"
import {Link, Navigate, useOutletContext } from "react-router-dom";
import {AiFillEdit, AiFillDelete} from "react-icons/ai"
import Header from "../components/Header.jsx";
import Sidebar from "../components/Sidebar.jsx";

const Rekenings = () => {
  const [rekenings, setRekenings] = useState([]);
  const user = useOutletContext()[0];


  useEffect(() => {
      api("/rekening").then((rekening) => setRekenings(rekening));
  }, [user]);

  if(user){
      return (
        <>
          <Header/>
          <div className="flex">
            <Sidebar/>
            <div className="ml-36 mt-24 ">
                <h1 className="text-3xl font-bold pb-4">Data Rekening PUB</h1>
                <div className="overflow-y-auto max-h-[15rem]">
                  <table className="border-collapse border border-slate-400 p-2">
                      <thead className="bg-blue-900 text-white sticky top-0">
                          <tr className="border border-slate-300">
                              <th className="px-8">Nama</th>
                              <th className="px-8">Nomor Rekening</th>
                              <th className="px-8">Saldo</th>
                              <th className="px-8">Tindakan</th>
                          </tr>
                      </thead>
                      <tbody className="border-collapse border border-slate-400 p-4">
                      {rekenings
                      .map((rek,index) => (
                        <tr key={rekenings.id} className={index % 2 === 0 ? "bg-white " : "bg-gray-100"}>
                          <td className="px-4">{rek.nama}</td>
                          <td className="px-8">{rek.nomorRek}</td>
                          <td className="px-8">{rek.saldo.toLocaleString("id-ID", {
                                style: "currency",
                                currency: "IDR",
                                maximumFractionDigits: 0,
                            })}
                          </td>
                          <td className="px-12 flex flex-row gap-4 cursor-pointer">
                            <button>
                              <Link to={`/rekening/${rek.id}/edit`}><AiFillEdit/></Link>
                            </button>
                            <button
                              onClick={async () => {
                                if (
                                  confirm(`Apakah Anda yakin ingin menghapus Rekening ini?`)
                                ) {
                                  const message = await api(`/rekening/${rek.id}`, "DELETE");
                                  const rekenings = await api("/rekening");
                                  setRekenings(rekenings);
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

export default Rekenings