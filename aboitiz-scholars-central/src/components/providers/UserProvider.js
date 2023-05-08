import { useEffect } from "react";
import { createContext, useState } from "react";
import { getUsers } from "../services/UserService";
import { useContext } from "react";
import { TriggerContext } from "./TriggerProvider";

export const UserContext = createContext();

// Provider for users array
export const UserProvider = (props) => {
  const [users, setUsers] = useState([]);
  const [trigger] = useContext(TriggerContext);
  const accessToken = localStorage.getItem("token-auth");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        setUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, [accessToken, trigger]);

  return (
    <UserContext.Provider value={[users, setUsers]}>
      {props.children}
    </UserContext.Provider>
  );
};

const userExport = { UserContext, UserProvider };
export default userExport;
