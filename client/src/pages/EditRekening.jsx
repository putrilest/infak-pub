import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../utils";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function EditRekening() {
  const [rekening, setRekening] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    api(`/rekening/${id}`).then((rekening) => setRekening(rekening));
  }, [id]);

  return (
    <main>
      <Header/>
      <div className="flex">
        <Sidebar/>
        {rekening ? (
          <form
            className="bg-white p-8 rounded shadow-md max-w-md ml-28 mt-12 h-full"
            onSubmit={async (e) => {
              e.preventDefault();
              const message = await api(`/rekening/${rekening.id}`, "PUT", rekening);
              alert(message);
              navigate("/");
            }}
          >
            <h1 className="text-xl font-semibold mb-4 text-center">Edit Data Rekening</h1>
            <label>
              Nama :
              <input
                className="w-full border rounded py-2 px-3 my-2"
                type="text"
                value={rekening.nama}
                onChange={(e) => setRekening({ ...rekening, nama: e.target.value })}
              />
            </label>
            <label>
              Nomor Rekening :
              <input
                type="text"
                className="w-full border rounded py-2 px-3 my-2"
                value={rekening.nomorRek}
                onChange={(e) =>
                  setRekening({ ...rekening, nomorRek: e.target.value })
                }
              />
            </label>
            <label>
              Saldo :
              <input
                type="number"
                className="w-full border rounded py-2 px-3 my-2"
                value={rekening.saldo}
                onChange={(e) =>
                  setRekening({ ...rekening, saldo: e.target.value })
                }
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
        ) : (
          "Loading..."
        )}
      </div>
    </main>
  );
}
