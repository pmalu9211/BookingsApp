import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useWindowWidth } from "@react-hook/window-size";
export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const width = useWindowWidth();

  useEffect(() => {
    if (location.pathname != "/login" && location.pathname != "/register") {
      setLoading(true);
      axios
        .get("/user/profile")
        .then((res) => {
          //console.log(res);
          setUser(res.data);
          setLoading(false);
        })
        .catch((e) => {
          //console.log(e);
          setLoading(false);
          if (location.pathname == "/") {
            if (
              e.response.data?.message !=
              "User is not logged in, token not found"
            ) {
              alert(e.response.data?.message);
            }
          } else {
            alert(e.response.data.message);
          }
          console.log(e);
        });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading, setLoading, width }}>
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
