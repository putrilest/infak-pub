import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../utils";

export default function EditPlanet() {
  const [infak, setInfak] = useState();
  const { id } = useParams();
  const navigate = useNavigate();


  useEffect(() => {
    api(`/infak/${id}`).then((infak) => setInfak(infak));
  }, [id]);

  return (
    <main>
      {infak ? (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const message = await api(`/infak/${infak.id}`, "PUT", infak);
            alert(message);
            navigate("/");
          }}
        >
          <h1>Edit Planet</h1>
          <label>
            Tanggal :
            <input
              type="date"
              value={infak.tanggal}
              onChange={(e) => setInfak({ ...infak, tanggal: e.target.value })}
            />
          </label>
          <label>
            Id Alumni :
            <input
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
              value={infak.idRekening}
              onChange={(e) =>
                setInfak({ ...infak, idRekening: e.target.value })
              }
            />
          </label>
          <label>
            Jumlah Infak :
            <input
              type="number"
              value={infak.jumlahInfak}
              onChange={(e) =>
                setInfak({ ...infak, jumlahInfak: e.target.value })
              }
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
