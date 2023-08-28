import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../utils";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function EditPlanet() {
  const [infak, setInfak] = useState();
  const { id } = useParams();
  const navigate = useNavigate();


  useEffect(() => {
    api(`/infak/${id}`).then((infak) => setInfak(infak));
  }, [id]);

  return (
    <main>
      <Header/>
      <div className="flex">
        <Sidebar/>
        {infak ? (
          <form
          className="bg-white p-8 rounded shadow-md max-w-md ml-24 mt-12 h-full mb-8"
            onSubmit={async (e) => {
              e.preventDefault();
              const message = await api(`/infak/${infak.id}`, "PUT", infak);
              alert(message);
              navigate("/");
            }}
          >
            <h1 className="text-xl font-semibold mb-4 text-center">Edit Data Infak</h1>
            <label>
              Tanggal :
              <input
              className="w-full border rounded py-2 px-3 my-2"
                type="date"
                value={infak.tanggal}
                onChange={(e) => setInfak({ ...infak, tanggal: e.target.value })}
              />
            </label>
            <label>
              Id Alumni :
              <input
              className="w-full border rounded py-2 px-3 my-2"
                type="number"
                value={infak.idAlumni}
                onChange={(e) =>
                  setInfak({ ...infak, idAlumni: e.target.value })
                }
              />
            </label>
            <label>
              Id Rekening :
              <input
                type="number"
                className="w-full border rounded py-2 px-3 my-2"
                value={infak.idRekening}
                onChange={(e) =>
                  setInfak({ ...infak, idRekening: e.target.value })
                }
              />
            </label>
            <label>
              Jumlah Infak :
              <input
                className="w-full border rounded py-2 px-3 my-2"
                type="number"
                value={infak.jumlahInfak}
                onChange={(e) =>
                  setInfak({ ...infak, jumlahInfak: e.target.value })
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
