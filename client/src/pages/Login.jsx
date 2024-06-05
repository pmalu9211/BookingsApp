import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/userContext.jsx";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("user/login", { email, password });
      alert("Logged in successfully");
      setUser(response.data.data);
      navigate("/");
    } catch (err) {
      //console.log(err);
      alert(err.response.data.message);
    }
  };
  return (
    <>
      <div className="p-4 justify-center flex flex-col flex-grow">
        <div className="mb-60">
          <h1 className="text-2xl text-center">Login</h1>
          <form className="max-w-xl mx-auto">
            <input
              value={email}
              type="email"
              placeholder="your email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              value={password}
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="submit" type="submit" onClick={handleSubmit}>
              Submit
            </button>
          </form>
          <div className="text-center">
            Don't have an account{" "}
            <Link to={"/register"} className="underline">
              register
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
