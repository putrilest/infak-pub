import {BsPersonCircle} from "react-icons/bs"

const Header = () => {
  return (
    <header className="flex justify-between h-16  bg-blue-900 items-center text-white px-3">
      <div className="flex fllex-row">
        <img src="https://pubpasim.org/imgs/pub-logo.png" className="w-8 h-8 mr-2 tablet:w-6 tablet:h-6 mobile:w-6 mobile:h-6"/>
        <h1 className="text-xl  font-bold">INFAK PUB</h1>
      </div>
      <BsPersonCircle size={28}/>
    </header>
  )
}

export default Header