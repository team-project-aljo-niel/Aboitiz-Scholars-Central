import { useEffect } from 'react';
import { createContext, useState } from 'react';
import { getGrades } from '../services/UserService';
import { useContext } from 'react';
import { TriggerContext } from './TriggerProvider';
import axios from 'axios';

export const GradesContext = createContext();

// Provider for scholars array
export const GradeProvider = (props) => {
  const [grades, setGrades] = useState([]);
  const [trigger] = useContext(TriggerContext);
  const accessToken = localStorage.getItem('token-auth');

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        if (accessToken) {
          axios.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${accessToken}`;
        }
        const response = await getGrades();
        console.log(response.data);
        setGrades(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGrades();
  }, [accessToken, trigger]);

  return (
    <GradesContext.Provider value={[grades, setGrades]}>
      {props.children}
    </GradesContext.Provider>
  );
};

const userExport = { GradesContext, GradeProvider };
export default userExport;
