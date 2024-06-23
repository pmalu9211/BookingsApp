import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/userContext.jsx";
import LoadingOverlay from "../components/LoadingOverlay.jsx";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser, loading, setLoading } = useContext(UserContext);
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
      const response = await axios.post("user/login", { email, password });
      setLoading(false);
      alert("Logged in successfully");
      setUser(response.data.data);
      navigate("/");
    } catch (err) {
      setLoading(false);
      console.log(err);
      alert(err.response.data.message);
    }
  };
  return (
    <>
      {loading && <LoadingOverlay />}
      <div className="p-4 justify-center flex flex-col flex-grow">
        <div className="mb-60">
          <h1 className="text-2xl text-center">Login</h1>
          <form className="max-w-xl mx-auto">
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
