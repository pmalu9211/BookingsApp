import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import LoadingOverlay from "../components/LoadingOverlay";
import { UserContext } from "../context/userContext";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, setLoading } = useContext(UserContext);
  const [isValid, setIsValid] = useState(false);

  const validateEmail = (email) => {
    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setIsValid(validateEmail(newEmail));
  };

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
              onChange={handleInputChange}
            />
            <input
              value={password}
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              disabled={!isValid}
              className={`submit ${isValid ? "bg-primary" : "bg-slate-600"}`}
              type="submit"
              onClick={handleSubmit}
            >
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
