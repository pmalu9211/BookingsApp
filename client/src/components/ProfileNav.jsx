import { useContext } from "react";
import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import { UserContext } from "../context/userContext";

const ProfileNav = () => {
  const location = useLocation();
  const { user, fetched } = useContext(UserContext);
  const activeClick =
    "border border-primary-300 rounded-full py-1 px-4 shadow-xl bg-primary text-white inline-flex gap-1";
  const normalClick =
    "border border-gray-250 rounded-full py-1 px-4 inline-flex gap-1 bg-gray-200";

  //console.log(location);
  const subpage = location.pathname.split("/").at(-1);

  //console.log(subpage);

  if (!fetched && !user) {
    return <div>Loading....</div>;
  }

  if (!user && fetched) {
    return <Navigate to={"/login"}></Navigate>;
  }

  return (
    <nav className="flex gap-4 justify-center mt-5">
      <Link
        to={"/account"}
        className={`${subpage == "account" ? activeClick : normalClick}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
        My profile
      </Link>

      <Link
        to={"/account/bookings"}
        className={`${subpage == "bookings" ? activeClick : normalClick}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z"
          />
        </svg>
        My bookings
      </Link>
      <Link
        to={"/account/places"}
        className={`${subpage == "places" ? activeClick : normalClick}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </svg>
        My accomodations
      </Link>
    </nav>
  );
};

export default ProfileNav;
