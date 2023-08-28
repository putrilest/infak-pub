import { useNavigate, useOutletContext, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { api } from "../utils";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function AddInfak(){
    const navigate = useNavigate();
    const [rekenings, setRekenings] = useState([]);
    const [newRekening, setNewRekening] = useState({});
    const user = useOutletContext()[0];
  
    useEffect(() => {
      api("/rekening").then((rekenings) => setRekenings(rekenings));
    }, [user, navigate]);

    if(user){
        return(
          <div>
            <Header/>
            <div className="flex">
              <Sidebar/>
              <form className="bg-white p-8 rounded shadow-md max-w-md ml-28 mt-12 h-full"
                onSubmit={async (e) => {
                  e.preventDefault();
                  setNewRekening({});
                  const message = await api("/rekening", "POST", newRekening);
                  const infaks = await api ("/rekening");
                  setRekenings(infaks);
                  alert(message);
                }}>
                <h1 className="text-xl font-semibold mb-4 text-center">Tambah Rekening</h1>
                <label>
                  Nama Rekening :
                  <input
                  className="w-full border rounded py-2 px-3 my-2"
                  type="text"
                  value={newRekening.nama ?? ""}
                  onChange={(e) =>
                      setNewRekening({ ...newRekening, nama: e.target.value })
                  }
                  required
                  />
                </label>

                <label>
                  Nomor Rekening :
                  <input
                  className="w-full border rounded py-2 px-3 my-2"
                  type="text"
                  value={newRekening.nomorRek ?? ""}
                  onChange={(e) =>
                      setNewRekening({ ...newRekening, nomorRek: e.target.value })
                  }
                  required
                  />
                </label>

                <label>
                  Saldo
                  <input
                  className="w-full border rounded py-2 px-3 my-2"
                  type="number"
                  value={newRekening.saldo ?? ""}
                  onChange={(e) =>
                      setNewRekening({ ...newRekening, saldo: e.target.value })
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