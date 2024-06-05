import { Link, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import LoadingOverlay from "../components/LoadingOverlay";
import { UserContext } from "../context/userContext";

export default function PlacesPage() {
  const { action } = useParams();
  const { loading, setLoading } = useContext(UserContext);
  const [placesData, setPlacesData] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get("place/places")
      .then((data) => {
        //console.log(data);
        setLoading(false);

        setPlacesData(data.data.document);
      })
      .catch((err) => {
        setLoading(false);

        alert(err.response.data.message);
        //console.log(err.message);
      });
  }, []);

  const deletePlace = async (e, val) => {
    let foo = prompt('Type "DELETE" to confirm the action');
    if (foo === "DELETE") {
      e.preventDefault();
      setLoading(true);

      axios
        .post("place/deletePlace", { id: val })
        .then((data) => {
          setLoading(false);

          alert("Place deleted successfully");
          setPlacesData((e) => {
            return e.filter((value) => value._id != data.data._id);
          });
          //console.log(data);
        })
        .catch((err) => {
          //console.log(err.message);
          setLoading(false);

          alert(err.response.data.message);
        });
    }
  };

  return (
    <>
      {loading && <LoadingOverlay />}
      {placesData.length > 0 &&
        placesData.map((data, index) => (
          <Link
            key={index}
            className="bg-gray-300 rounded-lg mx-6 p-4 mt-5 flex gap-4 relative"
            to={"/account/places/place?id=" + data._id}
          >
            <div
              className="absolute top-0 right-0 cursor-pointer px-2 py-2 rounded-xl my-2 mx-2 bg-gray-500 bg-opacity-70 "
              onClick={(e) => deletePlace(e, data._id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </div>
            <div className="w-32 h-32 bg-gray-500 rounded-lg shrink-0">
              <img
                src={data.photos[0]}
                alt=""
                className="object-cover flex h-full w-full rounded-lg"
              />
            </div>
            <div className="shrink-1 grow-1 ">
              <h2>{data.title}</h2>
              <div>{data.description}</div>
            </div>
          </Link>
        ))}
      {action !== "new" && (
        <div className="text-center mt-10">
          <Link
            to={"/account/places/new"}
            className="border border-primary-300 rounded-full py-1 px-4  bg-primary text-white inline-flex gap-1 max-w-44 "
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
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add new place
          </Link>
          <div>Bookings here</div>
        </div>
      )}
    </>
  );
}
