import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [fetched, setFetched] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  //console.log(location.pathname);

  useEffect(() => {
    if (
      location.pathname != "/login" &&
      location.pathname != "/" &&
      location.pathname != "/register"
    ) {
      axios
        .get("/user/profile")
        .then((res) => {
          //console.log(res);
          setUser(res.data);
          setFetched(true);
        })
        .catch((e) => {
          //console.log(e);
          setFetched(true);
          console.log(e);
          alert(e.response.data.message);
        });
    }
  }, []);

  return (
    <UserContext.Provider
      value={{ user, setUser, fetched, loading, setLoading }}
    >
      {children}
    </UserContext.Provider>
  );
}

// //console.log("Hello");
// axios
//   .get("/profile")
//   .then((res) => {
//     //console.log("hi", res);
//   })
//   .catch((err) => {
//     //console.log(err);
//   });
