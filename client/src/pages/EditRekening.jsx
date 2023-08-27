import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../utils";

export default function EditRekening() {
  const [rekening, setRekening] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    api(`/rekening/${id}`).then((rekening) => setRekening(rekening));
  }, [id]);

  return (
    <main>
      {rekening ? (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const message = await api(`/rekening/${rekening.id}`, "PUT", rekening);
            alert(message);
            navigate("/");
          }}
        >
          <h1>Edit Planet</h1>
          <label>
            Nama :
            <input
              type="text"
              value={rekening.nama}
              onChange={(e) => setRekening({ ...rekening, nama: e.target.value })}
            />
          </label>
          <label>
            Nomor Rekening :
            <input
              type="text"
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
              value={rekening.saldo}
              onChange={(e) =>
                setRekening({ ...rekening, saldo: e.target.value })
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
