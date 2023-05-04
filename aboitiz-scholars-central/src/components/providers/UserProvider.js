import { useEffect } from "react";
import { createContext, useState } from "react";
import { getUsers } from "../services/UserService";

export const UserContext = createContext();

// Provider for users array
export const UserProvider = (props) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getUsers();
      setUsers(response.data);
      try {
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, [users]);

  return (
    <UserContext.Provider value={[users, setUsers]}>
      {props.children}
    </UserContext.Provider>
  );
};

const userExport = { UserContext, UserProvider };
export default userExport;
