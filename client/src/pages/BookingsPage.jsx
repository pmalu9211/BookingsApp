import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import BookingDates from "../components/BookingDates";
import ProfileNav from "../components/ProfileNav";
import { UserContext } from "../context/userContext";
import LoadingOverlay from "../components/LoadingOverlay";

export default function BookingsPage() {
  const { loading, setLoading } = useContext(UserContext);
  const deleteBooking = async (e, val) => {
    e.preventDefault();
    let confirm = prompt('Type "DELETE" to confirm the action');
    if (confirm === "DELETE") {
      setLoading(true);
      axios
        .post("booking/deleteBooking", { id: val })
        .then((data) => {
          alert("Booking Cancled successfully");
          setBookings((e) => {
            return e.filter((value) => value._id != data.data._id);
          });
          setLoading(false);
          //console.log(data);
        })
        .catch((err) => {
          setLoading(false);

          //console.log(err.message);
          console.log(err);
          alert(err.response.data.message);
        });
    }
  };

  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    setLoading(true);

    axios
      .get("booking/bookings")
      .then((response) => {
        setBookings(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        alert(err.response.data.message);
        //console.log(err);
      });
  }, []);
  return (
    <div>
      {loading && <LoadingOverlay />}
      <ProfileNav />
      <div className="mt-6">
        {bookings?.length > 0 &&
          bookings.map((booking) => (
            <Link
              key={booking._id}
              to={`http://localhost:5173/place/${booking?.place?._id}`}
              className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden mb-4 mx-4 pt-2 pl-2 relative content-center flex-wrap align-middle justify-center"
            >
              <div
                className="absolute top-0 right-0 cursor-pointer px-2 py-2 rounded-xl my-2 mx-2 bg-gray-500 bg-opacity-70 "
                onClick={(e) => deleteBooking(e, booking._id)}
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
              <div className="w-48">
                {booking.place?.photos && (
                  <img
                    className="object-cover"
                    src={booking.place?.photos[0]}
                    alt=""
                  />
                )}
              </div>
              <div className="py-3 pr-3 grow">
                <h2 className="text-xl">{booking.place?.title}</h2>
                <div className="text-xl">
                  <BookingDates
                    booking={booking}
                    className="mb-2 mt-4 text-gray-500"
                  />
                  <div className="flex gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-8 h-8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                      />
                    </svg>
                    <span className="text-2xl">
                      Total price: ${booking.price}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
