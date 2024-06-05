import { Link, Navigate, useParams } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { useContext } from "react";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import ProfileNav from "../components/ProfileNav";

export default function AccountPage() {
  const { user, fetched, setUser } = useContext(UserContext);
  const { subpage } = useParams();
  // const activeClick =
  //   "border border-primary-300 rounded-full py-1 px-4 shadow-xl bg-primary text-white inline-flex gap-1";
  // const normalClick =
  //   "border border-gray-250 rounded-full py-1 px-4 inline-flex gap-1 bg-gray-200";

  const logout = async () => {
    //console.log("here");
    try {
      await axios.post("/user/logout");
      setUser(null);
    } catch (err) {
      alert(err.response.data.message);
      //console.log(err.message);
    }
  };

  if (!fetched && !user) {
    return <div>Loading....</div>;
  }

  if (!user && fetched) {
    return <Navigate to={"/login"}></Navigate>;
  }

  return (
    <>
      <ProfileNav />

      {subpage === undefined && (
        <div className="mx-auto mt-16 w-full text-center">
          <div className="mb-2">
            HI there {user?.name}, ({user.email})
          </div>
          <button
            className="p-1 border border-primary rounded-full mx-auto w-60 "
            onClick={() => {
              logout();
            }}
          >
            Logout
          </button>
        </div>
      )}
      {subpage === "places" && <PlacesPage />}
    </>
  );
}
