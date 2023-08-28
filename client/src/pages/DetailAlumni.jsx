import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../utils";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import {format} from "date-fns";

export default function DetailAlumni() {
  const [alumni, setAlumni] = useState();
  const [infak, setInfak] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    api(`/alumni/${id}`).then((alumniData) => setAlumni(alumniData));
    api(`/infak?a=${id}`).then((infakData) => setInfak(infakData));  
  }, [id]);

  return (
    <main>
      <Header/>
      <div className="flex">
        <Sidebar/>
        <div className="flex ml-28 mt-12 h-full ">
          {alumni ? (
            <div className="bg-white p-6 rounded-lg shadow-md w-96 flex flex-col gap-2 justify-center items-center text-center">
              <h2 className="text-xl font-semibold mb-2 text-center">Data Alumni</h2>
              <img
                src={alumni.gambar}
                className="rounded-lg mb-4 w-32 h-36 flex text-center"
              />
              <h2 className="text-xl font-semibold mb-2">Nama: {alumni.nama}</h2>
              <p className="text-gray-600 mb-2">Angkatan : {alumni.angkatan}</p>
              <p className="text-gray-600 mb-2">Prodi : {alumni.prodi}</p>
              <p className="text-gray-600 mb-2">No Hp : {alumni.noHp}</p>
              <p className="text-gray-600 mb-2">Alamat : {alumni.alamat}</p>
              <p className="text-gray-600 mb-2">Total Infak: {alumni.totalInfak}</p>
              <p className="text-gray-800">Keterangan : {alumni.keterangan}</p>

            </div>
          ) : (
            <p className="text-center text-gray-600">Loading...</p>
            )}

          <div className=" ml-12 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2 text-center">Data Infak</h2>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-blue-200">
                  <th className="border border-gray-300 p-2">Tanggal</th>
                  <th className="border border-gray-300 p-2">Jumlah Infak</th>
                </tr>
              </thead>
              <tbody>
                {infak.map((item) => (
                  <tr key={item.id}>
                    <td className="border border-gray-300 p-2">
                      {format(new Date(item.tanggal), 'yyyy-MM-dd')}
                    </td>
                    <td className="border border-gray-300 p-2">{item.jumlahInfak.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      maximumFractionDigits: 0,
                    })}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </main>
  );
}

