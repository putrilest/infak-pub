import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../utils";

export default function DetailAlumni() {
  const [alumni, setAlumni] = useState();
  const { id } = useParams();

  useEffect(() => {
    api(`/alumni/${id}`).then((alumniData) => setAlumni(alumniData));
  }, [id]);

  return (
    <main>
      {alumni ? (
        <>
          <h1>{alumni.gambar}</h1>
          <p>{alumni.nama}</p>
          <p>{alumni.angkatan}</p>
          <p>{alumni.prodi}</p>
          <p>{alumni.noHp}</p>
          <p>{alumni.alamat}</p>
          <p>{alumni.totalInfak}</p>
          <p>{alumni.keterangan}</p>
        </>
      ) : (
        "Loading..."
      )}
    </main>
  );
}
