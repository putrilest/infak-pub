import {HiOutlineLogout} from "react-icons/hi"

const Header = () => {
  const logout= () => {
    if(localStorage.getItem("token")){
      alert("Apakah anda yakin keluar dari program ?");
      localStorage.removeItem("token");
      window.location.reload();
    }
  }
  return (
    <header className="flex justify-between h-16  bg-blue-900 items-center text-white px-3">
      <div className="flex fllex-row">
        <img src="https://pubpasim.org/imgs/pub-logo.png" className="w-8 h-8 mr-2 tablet:w-6 tablet:h-6 mobile:w-6 mobile:h-6"/>
        <h1 className="text-xl  font-bold">INFAK PUB</h1>
      </div>
      <HiOutlineLogout size={28} className="cursor-pointer" onClick={logout}/>
    </header>
  )
}

export default Header