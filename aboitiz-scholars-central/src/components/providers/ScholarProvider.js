import { useEffect } from "react";
import { createContext, useState } from "react";
import { getScholars } from "../services/UserService";
import { useContext } from "react";
import { TriggerContext } from "./TriggerProvider";

export const ScholarContext = createContext();

// Provider for scholars array
export const ScholarProvider = (props) => {
  const [scholars, setScholars] = useState([]);
  const [trigger] = useContext(TriggerContext);
  const accessToken = localStorage.getItem("token-auth");

  useEffect(() => {
    const fetchScholars = async () => {
      try {
        const response = await getScholars();
        setScholars(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchScholars();
  }, [accessToken, trigger]);

  return (
    <ScholarContext.Provider value={[scholars, setScholars]}>
      {props.children}
    </ScholarContext.Provider>
  );
};

const userExport = { ScholarContext, ScholarProvider };
export default userExport;
