import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  useTheme,
} from "@mui/material";
import { DataGrid, GridToolbar, GridValueGetterParams } from "@mui/x-data-grid";
import { themeColors } from "../../theme";
import {
  AdminPanelSettingsOutlined,
  SecurityOutlined,
  SchoolOutlined,
} from "@mui/icons-material";
import Header from "../Header";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../providers/UserProvider";

const Users = () => {
  const theme = useTheme();
  const colors = themeColors(theme.palette.mode);
  const [users, setUsers] = useContext(UserContext);
  const [newAccess, setNewAccess] = useState();

  useEffect(() => {
    setUsers(users);
  }, [newAccess, users]);
  // const handleChange = (e) => {

  // };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "fullName",
      headerName: "Name",
      flex: 1,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
    {
      field: "sex",
      headerName: "Sex",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "access",
      headerName: "Access Level",
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: ({ row: { access, id } }) => {
        return (
          <FormControl variant="standard" sx={{ width: "60%" }}>
            <InputLabel id="demo-simple-select-label">Access</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={access}
              label="Access"
              onChange={(e) => {
                setNewAccess(e.target.value);
                const user = users.find((user) => user.id === id);
                const indexOfUser = users.findIndex((user) => user.id === id);
                const usersCopy = [...users];
                const newUser = { ...user, access: newAccess };
                usersCopy.splice(indexOfUser, 1, newUser);
                setUsers(usersCopy);
                console.log(users);
              }}
            >
              <MenuItem value={"Admin"}>Admin</MenuItem>
              <MenuItem value={"Officer"}>Officer</MenuItem>
              <MenuItem value={"Scholar"}>Scholar</MenuItem>
            </Select>
          </FormControl>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Header title="Users" subtitle="List of users" />
      <Box
        mt="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            border: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            borderBottom: "none",
            backgroundColor: colors.grey[400],
            color: colors.black[500],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.grey[400],
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[500],
          },
        }}
      >
        <DataGrid
          rows={users}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Users;
