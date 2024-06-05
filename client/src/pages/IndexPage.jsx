import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function IndexPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("/place/homePlaces")
      .then((e) => {
        //console.log(e);
        setData(e.data);
      })
      .catch((e) => {
        //console.log(e.message);
        alert(e.response.data.message);
      });
  }, []);

  return (
    <>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-3 mx-12 justify-items-center">
        {data.map((value, index) => (
          <Link to={`/place/${value._id}`} className=" h-84 rounded-2xl w-60">
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
