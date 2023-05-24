import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { getWidgetsVisibility } from "../services/UserService";
import { useContext } from "react";
import { TriggerContext } from "./TriggerProvider";
import axios from "axios";

export const VisibilityContext = createContext();

export const VisibilityProvider = (props) => {
  const [visibility, setVisibility] = useState();
  const [trigger] = useContext(TriggerContext);
  const accessToken = localStorage.getItem("token-auth");

  useEffect(() => {
    const fetchWidgets = async () => {
      try {
        if (accessToken) {
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${accessToken}`;
          const response = await getWidgetsVisibility();
          setVisibility(response.data);
        }
      } catch (error) {}
    };
    fetchWidgets();
  }, [accessToken, trigger]);
  return (
    <VisibilityContext.Provider value={[visibility, setVisibility]}>
      {props.children}
    </VisibilityContext.Provider>
  );
};

const VisibilityExport = { VisibilityContext, VisibilityProvider };

export default VisibilityExport;
