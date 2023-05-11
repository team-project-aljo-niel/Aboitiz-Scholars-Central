import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { getCurrentUser } from "../services/UserService";
import { useContext } from "react";
import { TriggerContext } from "./TriggerProvider";

export const CurrentUserContext = createContext();

// Provider for logged in user details
export const CurrentUserProvider = (props) => {
  const [currentUser, setCurrentUser] = useState();
  const [trigger] = useContext(TriggerContext);
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
        if (error.response.status === 401) {
          localStorage.removeItem("token-auth");
          setCurrentUser();
          window.location.reload(true);
        }
      }
    };
    fetchUserDetails();
    // eslint-disable-next-line
  }, [accessToken, trigger]);

  return (
    <CurrentUserContext.Provider value={[currentUser, setCurrentUser]}>
      {props.children}
    </CurrentUserContext.Provider>
  );
};

const currentUserExport = { CurrentUserContext, CurrentUserProvider };

export default currentUserExport;
