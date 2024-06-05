import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/userContext";
import LoadingOverlay from "../components/LoadingOverlay";

export default function IndexPage() {
  const [data, setData] = useState([]);
  const { loading, setLoading } = useContext(UserContext);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/place/homePlaces")
      .then((e) => {
        console.log(e);
        setData(e.data);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);

        //console.log(e.message);
        console.log(e);
        alert(e.response.data?.message);
      });
  }, []);

  return (
    <>
      {loading && <LoadingOverlay />}
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-3 mx-12 justify-items-center">
        {data?.map((value, index) => (
          <Link
            key={index}
            to={`/place/${value._id}`}
            className=" h-84 rounded-2xl w-60"
          >
            <img
              src={value.photos[0]}
              alt=""
              className="aspect-square object-cover flex w-full rounded-2xl"
            />
            <h2 className="font-bold text-xl ml-1 mt-2">{value.address}</h2>
            <h3 className=" truncate text-sm font-light ml-1 ">
              {value.description}
            </h3>
            <div>
              <span className="font-bold ml-1">{value.price}$</span> /night
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
