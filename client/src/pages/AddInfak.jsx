import { useNavigate, useOutletContext, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { api } from "../utils";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function AddInfak(){
    const navigate = useNavigate();
    const [infaks, setInfaks] = useState([]);
    const [newInfak, setNewInfak] = useState({});
    const user = useOutletContext()[0];
  
    useEffect(() => {
      api("/infak").then((infaks) => setInfaks(infaks));
    }, [user, navigate]);

    if(user){
        return(
          <div>
            <Header/>
            <div className="flex">
              <Sidebar/>
              <form className="bg-white p-8 rounded shadow-md max-w-md ml-36 mt-24"
                onSubmit={async (e) => {
                  e.preventDefault();
                  setNewInfak({});
                  const message = await api("/infak", "POST", newInfak);
                  const infaks = await api ("/infak");
                  setInfaks(infaks);
                  alert(message);
                }}>
                <h1 className="text-xl font-semibold mb-4 text-center">Tambah Infak</h1>
                <label>
                  Tanggal :
                  <input
                  className="w-full border rounded py-2 px-3 my-2"
                  type="date"
                  value={newInfak.tanggal ?? ""}
                  onChange={(e) =>
                      setNewInfak({ ...newInfak, tanggal: e.target.value })
                  }
                  required
                  />
                </label>

                <label>
                  Id Alumni
                  <input
                  className="w-full border rounded py-2 px-3 my-2"
                  type="number"
                  value={newInfak.idAlumni ?? ""}
                  onChange={(e) =>
                      setNewInfak({ ...newInfak, idAlumni: e.target.value })
                  }
                  required
                  />
                </label>

                <label>
                  Id Rekening
                  <input
                  className="w-full border rounded py-2 px-3 my-2"
                  type="number"
                  value={newInfak.idRekening ?? ""}
                  onChange={(e) =>
                      setNewInfak({ ...newInfak, idRekening: e.target.value })
                  }
                  required
                  />
                </label>

                <label>
                  Jumlah Infak
                  <input
                  className="w-full border rounded py-2 px-3 my-2"
                  type="number"
                  value={newInfak.jumlahInfak ?? ""}
                  onChange={(e) =>
                      setNewInfak({ ...newInfak, jumlahInfak: e.target.value })
                  }
                  required
                  />
                </label>

              
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