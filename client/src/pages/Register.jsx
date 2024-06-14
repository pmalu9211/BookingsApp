import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import LoadingOverlay from "../components/LoadingOverlay";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/user/register", {
        name,
        email,
        password,
      });
      setLoading(false);
      alert("registered successfully");
      //console.log(response);
    } catch (err) {
      setLoading(false);
      console.log(err);
      alert(err.response.data.message);
      //console.log(err);
    }

    // setName("");
    // setEmail("");
    // setPassword("");
  };

  return (
    <>
      {loading && <LoadingOverlay />}
      <div className="p-4 justify-center flex flex-col flex-grow">
        <div className="mb-60">
          <h1 className="text-2xl text-center">Register</h1>
          <form className="max-w-xl mx-auto">
            <input
              value={name}
              type="text"
              placeholder="your name"
              onChange={(e) => setName(e.target.value)}
            />
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
            already have an account{" "}
            <Link to={"/login"} className="underline">
              login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
