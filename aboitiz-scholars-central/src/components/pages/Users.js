import { Alert, Box, Snackbar, useTheme } from "@mui/material";
import { DataGrid, GridToolbar, GridValueGetterParams } from "@mui/x-data-grid";
import { themeColors } from "../../theme";
import Header from "../Header";
import { useContext, useState } from "react";
import { UserContext } from "../providers/UserProvider";
import { updateAccess } from "../services/UserService";
import { useCallback } from "react";

const Users = () => {
  const theme = useTheme();
  const colors = themeColors(theme.palette.mode);
  const [users] = useContext(UserContext);
  const [snackbar, setSnackbar] = useState();

  const handleCloseSnackbar = () => setSnackbar(null);

  const processRowUpdate = useCallback(async (newRow) => {
    // Make the HTTP request to save in the backend
    const access = { access: newRow.access };
    const response = await updateAccess(newRow._id, access);
    setSnackbar({
      children: "User role successfully saved",
      severity: "success",
    });
    return response;
  }, []);

  // const handleProcessRowUpdateError = useCallback((error) => {
  //   setSnackbar({ children: error.message, severity: "error" });
  // }, []);

  const columns = [
    {
      field: "_id",
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
      field: "gender",
      headerName: "Gender",
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
      type: "singleSelect",
      valueOptions: ["Admin", "Officer", "Scholar"],
      editable: true,
      cellClassName: "access-column--cell",
    },
    // {
    //   field: "actions",
    //   headerName: "Actions",
    //   type: "actions",
    //   renderCell: (params) => (
    //     <UsersActions {...{ params, rowId, setRowId }} />
    //   ),
    // },
  ];

  return (
    <Box m="20px">
      <Header title="Users" subtitle="User Database" />
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
          "& .access-column--cell": {
            color: colors.redAccent[300],
            fontSize: "18px",
            fontWeight: "bold",
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
          width: "100%",
        }}
      >
        <DataGrid
          rows={users}
          columns={columns}
          getRowId={(row) => row._id}
          components={{ Toolbar: GridToolbar }}
          processRowUpdate={processRowUpdate}
          checkboxSelection
          disableRowSelectionOnClick
          // onProcessRowUpdateError={handleProcessRowUpdateError}
        />
        {!!snackbar && (
          <Snackbar
            open
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            onClose={handleCloseSnackbar}
            autoHideDuration={6000}
          >
            <Alert {...snackbar} onClose={handleCloseSnackbar} />
          </Snackbar>
        )}
      </Box>
    </Box>
  );
};

export default Users;
