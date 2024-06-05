import { useContext, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { UserContext } from "../context/userContext";
import axios from "axios";
import BookingWidget from "../components/BookingWidget";

const Place = () => {
  //generate code to show places accoriding to the id query in the url
  const { id } = useParams();
  //console.log(id);
  const { loading } = useContext(UserContext);
  const [placeData, setPlaceData] = useState({});
  useEffect(() => {
    axios
      .get(`place/place/${id}`)
      .then((data) => {
        //console.log(data);
        setPlaceData(data.data);
      })
      .catch((err) => {
        //console.log(err.message);
        console.log(err);
        alert(err.response.data.message);
      });
  }, []);

  const [morePhotos, setMorePhotos] = useState(false);

  if (morePhotos) {
    return (
      <>
        <div className="bg-black text-white absolute w-full">
          <h2 className=" ml-14 mt-4 font-semibold text-3xl">
            {placeData.title}
          </h2>
          {placeData.photos.map((photo, index) => (
            <img
              key={index}
              src={photo}
              alt=""
              className="my-5 w-10/12 mx-auto rounded-lg "
            ></img>
          ))}
          <div
            onClick={() => setMorePhotos(false)}
            className=" fixed top-8 right-8 bg-white text-black font-bold px-4 py-2 rounded-lg cursor-pointer text-2xl"
          >
            Show Less
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {placeData?.photos && (
        <div className="w-full h-full bg-gray-50 px-10 py-4 mt-2">
          <h2 className="font-semibold text-3xl">{placeData.title}</h2>
          <a
            href={`https://www.google.com/maps/search/` + placeData.address}
            target="_blank"
            className="inline-flex gap-2 text-xl underline cursor-pointer  items-center font-bold mt-3 mb-3 max-w-screen-sm "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                clipRule="evenodd"
              />
            </svg>
            {placeData.address}
          </a>
          <div className="grid lg:grid-cols-4 grid-rows-2 grid-cols-3 gap-2 relative">
            <img
              className="aspect-square col-span-2 row-span-2 w-full h-full flex object-cover rounded-l-2xl lg:col-span-2 "
              src={placeData.photos[0]}
              alt=""
            />
            <img
              className="w-full h-full flex object-cover rounded-tr-2xl lg:rounded-none"
              src={placeData.photos[1]}
              alt=""
            />
            <img
              className="w-full h-full flex object-cover rounded-br-2xl lg:rounded-tr-2xl"
              src={placeData.photos[2]}
              alt=""
            />
            <img
              className="
              w-0 h-0
              lg:w-full lg:h-full lg:flex lg:object-cover invisible lg:visible"
              src={placeData.photos[3]}
              alt=""
            />
            <img
              className="w-0 h-0
              lg:w-full lg:h-full lg:flex lg:object-cover invisible lg:visible"
              src={placeData.photos[4]}
              alt=""
            />

            <div
              className="absolute bottom-1 right-1 p-2 bg-black rounded-2xl text-sm text-white bg-opacity-50 cursor-pointer"
              onClick={(e) => {
                setMorePhotos(true);
              }}
            >
              See more photos
            </div>
          </div>
          <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
            <div>
              <h2 className="font-semibold text-4xl ">Description</h2>
              <div className="mt-3 mb-5 ">{placeData.description}</div>
              Check-in: {placeData.checkIn}
              <br />
              Check-out: {placeData.checkOut}
              <br />
              Max number of guests: {placeData.maxGuests}
            </div>
            <div>
              <BookingWidget place={placeData} />
            </div>
          </div>
          <div className="bg-white -mx-8 px-8 py-8 border-t">
            <div>
              <h2 className="font-semibold text-2xl">Extra info</h2>
            </div>
            <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">
              {placeData.extraInfo}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Place;
