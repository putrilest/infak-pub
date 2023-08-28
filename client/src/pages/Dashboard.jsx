import { Navigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { api } from "../utils";
import { useEffect, useState } from "react";


const Dashboard = () => {
  const user= useOutletContext()[0];
  const [rekenings, setRekenings] = useState([]);
  const [totalAlumni, setTotalAlumni] = useState(0);

  useEffect(() => {
      api("/alumni").then((alumni) => {
        setTotalAlumni(alumni.length);
      })
    }, [user]);

  useEffect(() => {
      api("/rekening").then((rekening) => setRekenings(rekening));
  }, [user]);

  if(user){
    return (
      <div>
        <Header/>
        <div className="flex">
          <Sidebar/>
          {rekenings
          .map((rek) => (
            <div key={rek.id} className="flex flex-col gap-3 bg-white rounded shadow p-4 ml-24 mt-24 h-full">
              <h1 className="px-4 font-bold text-2xl">REKENING PUB</h1>
              <p className="px-4">Nama Rekening : {rek.nama}</p>
              <p className="px-4">Nomor Rekening : {rek.nomorRek}</p>
              <p className="px-4 font-bold">Saldo Pemasukan Infak : {rek.saldo.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    maximumFractionDigits: 0,
              })}
              </p>
            </div>
          ))}
          <div className="flex flex-col gap-3 bg-white rounded shadow p-4 ml-36 mt-24 h-full">
            Jumlah Alumni : 
            <div className="font-bold">{totalAlumni} Orang</div>
          </div>
        </div>
      </div>
    )
  }else{
    return <Navigate to="/login"/>;
  }
}

export default Dashboard