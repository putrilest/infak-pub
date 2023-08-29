import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [register, setRegister] = useState({
    username: "",
    passwordd: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(register),
    });
    if (response.ok) {
      navigate("/login");
    } else {
      const message = await response.text();
      alert(message);
    }
  };

  return (
    <main className="bg-blue-100 min-h-screen flex items-center justify-center flex-col">
      <div className="flex items-center mb-6 text-center">
          <img src="https://pubpasim.org/imgs/pub-logo.png" className="w-16 h-16 mr-2 tablet:w-12 tablet:h-12 mobile:w-10 mobile:h-10"/>
          <h1 className="text-6xl font-semibold font-verdana text-blue-600 tablet:text-5xl  mobile:text-4xl">PUB</h1>
      </div> 
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md  tablet:max-w-sm mobile:max-w-xs">
        <form className="space-y-4" onSubmit={handleRegister}>
          <h3 className="text-2xl font-medium text-center">Register</h3>
          <div>
            <label htmlFor="username" className="block font-medium mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              required
              onChange={(e) =>
                setRegister({ ...register, username: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="password" className="block font-medium mb-1">
              Password
            </label>
            <input
              type="passwordd"
              id="passwordd"
              name="passwordd"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              required
              onChange={(e) =>
                setRegister({ ...register, passwordd: e.target.value })
              }
            />
          </div>
          <div className="flex flex-row gap-2 justify-between items-center ">
            <button
              type="submit"
              className="w-1/2 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"            >
              Register
            </button>
            <button className="bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300 focus:outline-none px-9">
              <Link to="/login">Batal</Link>
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
