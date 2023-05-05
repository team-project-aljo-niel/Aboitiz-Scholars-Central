import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { getCurrentUser } from "../services/UserService";

export const CurrentUserContext = createContext();

export const CurrentUserProvider = (props) => {
  const [currentUser, setCurrentUser] = useState();
  const accessToken = localStorage.getItem("token-auth");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        if (!currentUser && accessToken) {
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${accessToken}`;
          const response = await getCurrentUser();
          setCurrentUser(response.data);
        }
      } catch (error) {
        console.log("userDetails", error);
      }
    };
    fetchUserDetails();
  }, [accessToken, currentUser]);

  return (
    <CurrentUserContext.Provider value={[currentUser, setCurrentUser]}>
      {props.children}
    </CurrentUserContext.Provider>
  );
};

const currentUserExport = { CurrentUserContext, CurrentUserProvider };

export default currentUserExport;
