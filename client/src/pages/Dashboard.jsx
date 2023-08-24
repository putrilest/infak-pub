import { Navigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const Dashboard = () => {
  const user= useOutletContext()[0];
  if(user){
    return (
      <div>
        <Header/>
        <Sidebar/>
      </div>
    )
  }else{
    return <Navigate to="/login"/>;
  }
}

export default Dashboard