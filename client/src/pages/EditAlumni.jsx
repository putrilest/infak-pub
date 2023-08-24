import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../utils";

export default function EditAlumni() {
  const [alumni, setAlumni] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3000/api/alumni/${id}`)
      .then((response) => response.json())
      .then((planet) => setAlumni(planet));
  }, [id]);

  return (
    <main>
      {alumni ? (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const message = await api(`/planets/${alumni.id}`, "PUT", alumni);
            alert(message);
            navigate("/");
          }}
        >
          <h1>Edit Data Alumni</h1>
          <label>
            Nama:
            <input
              type="text"
              value={alumni.nama}
              onChange={(e) => setAlumni({ ...alumni, nama: e.target.value })}
            />
          </label>
          <label>
            Foto:
            <input
              type="text"
              value={alumni.gambar}
              onChange={(e) => setAlumni({ ...alumni, gambar: e.target.value })}
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
          
          <button>Simpan</button>
        </form>
      ) : (
        "Loading..."
      )}
    </main>
  );
}
