import { useEffect } from "react";
import { useState } from "react";
import { Navigate, useNavigate, useParams, useOutletContext } from "react-router-dom";
import { api } from "../utils";

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
      <main>
      {alumni ? (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const message = await api(`/alumni/${alumni.id}`, "PUT", alumni);
            alert(message);
            navigate("/");
          }}
        >
          <h1>Edit Data Alumni</h1>
          <label>
            Foto:
            <input
              type="text"
              value={alumni.gambar}
              onChange={(e) => setAlumni({ ...alumni, gambar: e.target.value })}
            />
          </label>
          <label>
            Nama:
            <input
              type="text"
              value={alumni.nama}
              onChange={(e) => setAlumni({ ...alumni, nama: e.target.value })}
            />
          </label>

          <label>
            Angkatan:
            <input
              type="number"
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
              value={alumni.prodi}
              onChange={(e) => setAlumni({ ...alumni, prodi: e.target.value })}
            />
          </label>
          <label>
            No HP:
            <input
              type="text"
              value={alumni.noHp}
              onChange={(e) => setAlumni({ ...alumni, noHp: e.target.value })}
            />
          </label>
          <label>
            Alamat:
            <textarea
              value={alumni.alamat}
              onChange={(e) =>
                setAlumni({ ...alumni, alamat: e.target.value })
              }
              cols={64}
              rows={8}
            />
          </label>
          <label>
            Keterangan:
            <input
              type="text"
              value={alumni.keterangan}
              onChange={(e) => setAlumni({ ...alumni, keterangan: e.target.value })}
            />
          </label>
          
          <button type="submit">Simpan</button>
        </form>
      ) : (
        "Loading..."
      )}
    </main>
  );
}else{
  return <Navigate to="/login" />;
}
}
