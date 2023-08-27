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
            <div key={rek.id} className="ml-36 mt-24">
              <p className="px-8">{rek.nama}</p>
              <p className="px-8">{rek.nomorRek}</p>
              <p className="px-8 font-bold">{rek.saldo.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    maximumFractionDigits: 0,
              })}
              </p>
            </div>
          ))}
          <h1>Jumlah Alumni : {totalAlumni}</h1>
        </div>
      </div>
    )
  }else{
    return <Navigate to="/login"/>;
  }
}

export default Dashboard