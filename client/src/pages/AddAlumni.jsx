import { useNavigate, useOutletContext, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { api } from "../utils";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function AddAlumni(){
    const navigate = useNavigate();
    const [alumnis, setAlumnis] = useState([]);
    const [newAlumni, setNewAlumni] = useState({});
    const user = useOutletContext()[0];
  
    useEffect(() => {
      api("/alumni").then((alumnis) => setAlumnis(alumnis));
    }, [user, navigate]);

    if(user){
        return(
          <div>
            <Header/>
            <div className="flex">
              <Sidebar/>
              <form className="bg-white p-8 rounded shadow-md ml-28 mt-12 h-full max-w-3xl mb-8"
                onSubmit={async (e) => {
                  e.preventDefault();
                  setNewAlumni({});
                  const message = await api("/alumni", "POST", newAlumni);
                  const alumnis = await api ("/alumni");
                  setAlumnis(alumnis);
                  alert(message);
                }}>
                <h1 className="text-xl font-semibold mb-8 text-center">Tambah Alumni</h1>
                <div className="flex flex-row gap-20">
                  <div>
                    <label>
                      Nama:
                      <input
                      className="w-full border rounded py-2 px-3 my-2"
                      type="text"
                      value={newAlumni.nama ?? ""}
                      onChange={(e) =>
                          setNewAlumni({ ...newAlumni, nama: e.target.value })
                      }
                      required
                      />
                    </label>
                    <label>
                      Gambar
                      <input
                      className="w-full border rounded py-2 px-3 my-2"
                      type="text"
                      value={newAlumni.gambar ?? ""}
                      onChange={(e) =>
                          setNewAlumni({ ...newAlumni, gambar: e.target.value })
                      }
                      />
                    </label>
                    <label>
                      Angkatan
                      <input
                      className="w-full border rounded py-2 px-3 my-2"
                      type="number"
                      value={newAlumni.angkatan ?? ""}
                      onChange={(e) =>
                          setNewAlumni({ ...newAlumni, angkatan: e.target.value })
                      }
                      required
                      />
                    </label>
                    <label>
                      Prodi
                      <input
                      className="w-full border rounded py-2 px- my-2"
                      type="text"
                      value={newAlumni.prodi ?? ""}
                      onChange={(e) =>
                          setNewAlumni({ ...newAlumni, prodi: e.target.value })
                      }
                      required
                      />
                    </label>
                  </div>
                  <div>
                    <label>
                      NO HP :
                      <input
                      className="w-full border rounded py-2 px-3 my-2"
                      type="text"
                      value={newAlumni.noHp ?? ""}
                      onChange={(e) =>
                          setNewAlumni({ ...newAlumni, noHp: e.target.value })
                      }
                      required
                      />
                    </label>
                    <label>
                      Alamat:
                      <textarea
                      className="w-full border rounded py-2 px-3 my-2"
                      value={newAlumni.alamat ?? ""}
                      onChange={(e) =>
                          setNewAlumni({
                          ...newAlumni,
                          alamat: e.target.value,
                          })
                      }
                      required
                      // cols={16}
                      // rows={8}
                      />
                    </label>
                    <label>
                      Total Infak :
                      <input
                      className="w-full border rounded py-2 px-3 my-2"
                      type="number"
                      value={newAlumni.totalInfak ?? ""}
                      onChange={(e) =>
                          setNewAlumni({ ...newAlumni, totalInfak: e.target.value })
                      }
                      required
                      />
                    </label>
                    <label>
                      Keterangan :
                      <input
                      type="text"
                      className="w-full border rounded py-2 px-3 my-2"
                      value={newAlumni.keterangan ?? ""}
                      onChange={(e) =>
                          setNewAlumni({ ...newAlumni, keterangan: e.target.value })
                      }
                      required
                      />
                    </label>
                  </div>
                </div>
                <div className="flex justify-center">
                  <button 
                  type="submit"
                  className="w-1/2 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 my-2"
                  >
                      Simpan
                  </button>
                </div>
              </form>
            </div>
          </div>
        )
    }else{
        return <Navigate to="/login" />;
    }
}