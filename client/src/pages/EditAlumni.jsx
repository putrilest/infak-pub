import { useEffect } from "react";
import { useState } from "react";
import { Navigate, useNavigate, useParams, useOutletContext } from "react-router-dom";
import { api } from "../utils";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function EditAlumni() {
  const [alumni, setAlumni] = useState();
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useOutletContext()[0];

  useEffect(() => {
    api(`/alumni/${id}`).then((alumniData) => setAlumni(alumniData));
  }, [id]);
  
  if(user){
    return (
      <div>
        <Header/>
        <div className="flex">
          <Sidebar/>
          {alumni ? (
            <form
              className="bg-white p-8 rounded shadow-md ml-28 mt-12 h-full max-w-3xl mb-8"
              onSubmit={async (e) => {
                e.preventDefault();
                const message = await api(`/alumni/${alumni.id}`, "PUT", alumni);
                alert(message);
                navigate("/");
              }}
            >
              <h1 className="text-xl font-semibold mb-8 text-center">Edit Data Alumni</h1>
              <div className="flex flex-row gap-20">
                <div>
                  <label>
                    Nama:
                    <input
                      type="text"
                      className="w-full border rounded py-2 px-3 my-2"
                      value={alumni.nama}
                      onChange={(e) => setAlumni({ ...alumni, nama: e.target.value })}
                    />
                  </label>
                  <label>
                    Foto:
                    <input
                      type="text"
                      className="w-full border rounded py-2 px-3 my-2"
                      value={alumni.gambar}
                      onChange={(e) => setAlumni({ ...alumni, gambar: e.target.value })}
                    />
                  </label>

                  <label>
                    Angkatan:
                    <input
                      type="number"
                      className="w-full border rounded py-2 px-3 my-2"
                      value={alumni.angkatan}
                      onChange={(e) =>
                        setAlumni({ ...alumni, angkatan: e.target.value })
                      }
                    />
                  </label>
                  <label>
                    Prodi:
                    <input
                      type="text"
                      className="w-full border rounded py-2 px-3 my-2"
                      value={alumni.prodi}
                      onChange={(e) => setAlumni({ ...alumni, prodi: e.target.value })}
                    />
                  </label>
                </div>
                <div>
                  <label>
                    No HP:
                    <input
                      type="text"
                      className="w-full border rounded py-2 px-3 my-2"
                      value={alumni.noHp}
                      onChange={(e) => setAlumni({ ...alumni, noHp: e.target.value })}
                    />
                  </label>
                  <label>
                    Alamat:
                    <textarea
                      value={alumni.alamat}
                      className="w-full border rounded py-2 px-3 my-2"
                      onChange={(e) =>
                        setAlumni({ ...alumni, alamat: e.target.value })
                      }
                    />
                  </label>
                  <label>
                    Keterangan:
                    <input
                      type="text"
                      className="w-full border rounded py-2 px-3 my-2"
                      value={alumni.keterangan}
                      onChange={(e) => setAlumni({ ...alumni, keterangan: e.target.value })}
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
          ) : (
            "Loading..."
          )}
        </div>
    </div>
  );
}else{
  return <Navigate to="/login" />;
}
}
