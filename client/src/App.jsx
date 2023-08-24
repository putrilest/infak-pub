import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { api } from "./utils.js";
// import Footer from "./components/Footer.jsx";

export default function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    api("/me").then((user) => {
      if (!user) {
        setUser(null);
      }
    });
  }, []);

  return (
    <>
      
      <Outlet context={[user, setUser]} />
      {/* <Footer/> */}
    </>
  );
}
