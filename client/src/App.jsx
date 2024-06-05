import { Route, Routes } from "react-router-dom";
import "./App.css";
import IndexPage from "./pages/IndexPage";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import axios from "axios";
import { UserContextProvider } from "./context/userContext.jsx";
import AccountPage from "./pages/AccountPage.jsx";
import PlacesForm from "./pages/PlacesForm.jsx";
import Place from "./pages/Place.jsx";
import BookingsPage from "./pages/BookingsPage.jsx";
//http://localhost:4000/api/v1  https://bookingsapp.onrender.com https://638a-152-58-21-4.ngrok-free.app/
axios.defaults.baseURL = "https://bookingsapp.onrender.com/api/v1";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<IndexPage />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/account" element={<AccountPage />}></Route>
          <Route path="/account/:subpage" element={<AccountPage />}></Route>
          <Route path="/account/bookings" element={<BookingsPage />}></Route>
          <Route path="/account/bookings/:Id" element={<Place />}></Route>
          <Route path="/account/places/new" element={<PlacesForm />} />
          <Route path="/account/places/:place" element={<PlacesForm />} />
          <Route path="/place/:id" element={<Place />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
