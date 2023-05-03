import { createContext, useState } from "react";

export const UserContext = createContext();

// Provider for users array
export const UserProvider = (props) => {
  const [users, setUsers] = useState([
    {
      id: 1,
      username: "jon",
      password: "Secret123!",
      firstName: "Jon",
      lastName: "Snow",
      sex: "Male",
      email: "jonsnow@gmail.com",
      phone: "(665)121-5454",
      access: "Admin",
    },
    {
      id: 2,
      username: "cersei",
      password: "Secret123!",
      firstName: "Cersei",
      lastName: "Lannister",
      sex: "Female",
      email: "cerseilannister@gmail.com",
      phone: "(421)314-2288",
      access: "Officer",
    },
    {
      id: 3,
      username: "jaime",
      password: "Secret123!",
      firstName: "Jaime",
      lastName: "Lannister",
      sex: "Male",
      email: "jaimelannister@gmail.com",
      phone: "(422)982-6739",
      access: "Scholar",
    },
    {
      id: 4,
      username: "arya",
      password: "Secret123!",
      firstName: "Anya",
      lastName: "Stark",
      sex: "Female",
      email: "anyastark@gmail.com",
      phone: "(921)425-6742",
      access: "Admin",
    },
    {
      id: 5,
      username: "daenarys",
      password: "Secret123!",
      firstName: "Daenerys",
      lastName: "Targaryen",
      sex: "Female",
      email: "daenerystargaryen@gmail.com",
      phone: "(421)445-1189",
      access: "Scholar",
    },
    {
      id: 6,
      username: "ever",
      password: "Secret123!",
      firstName: "Ever",
      lastName: "Melisandre",
      sex: "Female",
      email: "evermelisandre@gmail.com",
      phone: "(232)545-6483",
      access: "Officer",
    },
    {
      id: 7,
      username: "fera",
      password: "Secret123!",
      firstName: "Ferrara",
      lastName: "Clifford",
      sex: "Female",
      email: "ferraraclifford@gmail.com",
      phone: "(543)124-0123",
      access: "Scholar",
    },
    {
      id: 8,
      username: "ross",
      password: "Secret123!",
      firstName: "Rossini",
      lastName: "Frances",
      sex: "Male",
      email: "rossinifrances@gmail.com",
      phone: "(222)444-5555",
      access: "Scholar",
    },
    {
      id: 9,
      username: "harvey",
      password: "Secret123!",
      firstName: "Harvey",
      lastName: "Roxie",
      sex: "Male",
      email: "harveyroxie@gmail.com",
      phone: "(444)555-6239",
      access: "Admin",
    },
  ]);

  return (
    <UserContext.Provider value={[users, setUsers]}>
      {props.children}
    </UserContext.Provider>
  );
};

const userExport = { UserContext, UserProvider };
export default userExport;
