import { useState } from "react";
import { createContext } from "react";

export const TriggerContext = createContext();

export const TriggerProvider = (props) => {
  const [trigger, setTrigger] = useState(false);

  return (
    <TriggerContext.Provider value={[trigger, setTrigger]}>
      {props.children}
    </TriggerContext.Provider>
  );
};

const TriggerExport = { TriggerContext, TriggerProvider };

export default TriggerExport;
