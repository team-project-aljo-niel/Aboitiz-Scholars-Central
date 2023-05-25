import { useEffect } from 'react';
import { createContext, useState } from 'react';
import { getAccountUpdates } from '../services/UserService';
import { useContext } from 'react';
import { TriggerContext } from './TriggerProvider';
import axios from 'axios';

export const UpdatesContext = createContext();

// Provider for scholars array
export const UpdatesProvider = (props) => {
  const [updates, setUpdates] = useState([]);
  const [trigger] = useContext(TriggerContext);
  const accessToken = localStorage.getItem('token-auth');

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        if (accessToken) {
          axios.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${accessToken}`;
          const response = await getAccountUpdates();
          setUpdates(response.data);
        }
      } catch (error) {}
    };
    fetchUpdates();
  }, [accessToken, trigger]);

  return (
    <UpdatesContext.Provider value={[updates, setUpdates]}>
      {props.children}
    </UpdatesContext.Provider>
  );
};

const userExport = { UpdatesContext, UpdatesProvider };
export default userExport;
