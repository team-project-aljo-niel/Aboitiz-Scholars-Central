import { useEffect } from 'react';
import { createContext, useState } from 'react';
import { getScholars } from '../services/UserService';
import { useContext } from 'react';
import { TriggerContext } from './TriggerProvider';
import axios from 'axios';

export const ScholarContext = createContext();

// Provider for scholars array
export const ScholarProvider = (props) => {
  const [scholars, setScholars] = useState([]);
  const [trigger] = useContext(TriggerContext);
  const accessToken = localStorage.getItem('token-auth');

  useEffect(() => {
    const fetchScholars = async () => {
      try {
        if (accessToken) {
          axios.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${accessToken}`;
          const response = await getScholars();
          setScholars(response.data);
        }
      } catch (error) {
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
