import { useContext, useEffect, useState } from "react";
import Facilities from "../components/Facilities.jsx";
import { UserContext } from "../context/userContext.jsx";
import { Navigate, useParams, useSearchParams } from "react-router-dom";
import Photos from "../components/Photos.jsx";
import axios from "axios";
import LoadingOverlay from "../components/LoadingOverlay.jsx";

const PlacesForm = () => {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState("");
  const { loading, setLoading } = useContext(UserContext);
  const [redirect, setRedirect] = useState("");
  const [searchParam, setSearchParams] = useSearchParams();
  const [price, setPrice] = useState(0);
  const id = searchParam.get("id");
  //console.log(id);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios
      .get(`place/place/${id}`)
      .then((data) => {
        //console.log(data);
        setAddedPhotos(data.data.photos);
        setTitle(data.data.title);
        setAddress(data.data.address);
        setDescription(data.data.description);
        setPerks(data.data.perks);
        setExtraInfo(data.data.extraInfo);
        setCheckIn(data.data.checkIn);
        setCheckOut(data.data.checkOut);
        setMaxGuests(data.data.maxGuests);
        setPrice(data.data.price);
        // setPlaceData(data.data.document);
      })
      .catch((err) => {
        //console.log(err.message);
        alert(err.response.data.message);
      });
  }, [id]);

  //sending data to server

  async function sendImageLink(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post("file/upload-by-link", { photoLink });
      //console.log(data.path);
      setAddedPhotos((prevPhotos) => {
        return [...prevPhotos, data.url];
      });
      setLoading(false);
    } catch (err) {
      //console.log(err.message);
      alert(err.response.data.message);
    }
  }

  const filehandler = async (e) => {
    const formdata = new FormData();
    const file = e.target.files;
    for (let i = 0; i < file.length; i++) {
      formdata.append("photo", file[i]);
    }
    try {
      setLoading(true);
      const { data } = await axios.post("file/upload", formdata, {
        headers: {
          "Content-Type": "multipart/form-data", // set default content type
        },
      });
      setAddedPhotos((prevPhotos) => {
        return [...prevPhotos, ...data];
      });
      setLoading(false);
    } catch (err) {
      //console.log(err.message);
      alert(err.response.data.message);
    }
    // //console.log(data);
    // const  = response
  };

  async function submitHandler(e) {
    e.preventDefault();
    if (id) {
      try {
        setLoading(true);
        const response = await axios.put(`place/place/${id}`, {
          title,
          address,
          addedPhotos,
          description,
          perks,
          extraInfo,
          checkIn,
          checkOut,
          maxGuests,
          price,
        });
        setLoading(false);
        alert("Place updated successfully");
        setRedirect("/account/places");
        //console.log(response);
      } catch (err) {
        //console.log(err);
        //console.log(err.message);
        alert(err.response.data.message);
      }
    } else {
      try {
        setLoading(true);
        const response = await axios.post("place/place", {
          title,
          address,
          addedPhotos,
          description,
          perks,
          extraInfo,
          checkIn,
          checkOut,
          maxGuests,
          price,
        });
        setLoading(false);
        alert("Place added successfully");
        setRedirect("/account/places");

        //console.log(response);
      } catch (err) {
        //console.log(err);
        //console.log(err.message);
        alert(err.response.data.message);
      }
    }
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <>
      (
      <div className="m-8">
        <form>
          <h2 className="text-2xl">Title *</h2>
          <input
            type="text"
            placeholder="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <h2 className="text-2xl">Address *</h2>
          <input
            type="text"
            placeholder="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <Photos
            sendImageLink={sendImageLink}
            photoLink={photoLink}
            setPhotoLink={setPhotoLink}
            addedPhotos={addedPhotos}
            setAddedPhotos={setAddedPhotos}
            filehandler={filehandler}
          ></Photos>
          <h2 className="text-2xl mt-4">Description*</h2>
          <textarea
            rows={5}
            name=""
            id=""
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <Facilities selected={perks} changeHandler={setPerks} />
          <h2>Extra Info</h2>
          <textarea
            rows={3}
            value={extraInfo}
            onChange={(e) => setExtraInfo(e.target.value)}
          />

          <h2>Check In and Check Out Times *</h2>
          <div className="grid lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-1 gap-4 items-end">
            <div className="text-lg mt-4 px-2">
              <h3>Check in time</h3>
              <input
                type="text"
                placeholder="Check In time"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
              />
            </div>
            <div className="text-lg mt-4 px-2">
              <h3>Check out time</h3>
              <input
                type="text"
                placeholder="Check Out time"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
              />
            </div>
            <div className="text-lg mt-4 px-2">
              <h3>Max Guest</h3>
              <input
                type="text"
                placeholder="huest no."
                value={maxGuests}
                onChange={(e) => setMaxGuests(e.target.value)}
              />
            </div>
            <div className="text-lg mt-4 px-2">
              <h3>Price</h3>
              <input
                type="text"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>
          <button
            type="submit"
            className="submit mt-10 mb-4"
            onClick={submitHandler}
          >
            Submit
          </button>
        </form>
      </div>
      )
    </>
  );
};

export default PlacesForm;
