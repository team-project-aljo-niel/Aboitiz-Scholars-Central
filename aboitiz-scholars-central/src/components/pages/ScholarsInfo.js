import { Alert, Box, Snackbar, Typography, useTheme } from "@mui/material";
import { themeColors } from "../../theme";
import { useCallback, useContext } from "react";
import { useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { updateScholarDetails } from "../services/UserService";
import { ScholarContext } from "../providers/ScholarProvider";
import { TriggerContext } from "../providers/TriggerProvider";

// Manage Scholars Info Page
const ScholarsInfo = () => {
  const theme = useTheme();
  const colors = themeColors(theme.palette.mode);
  const [scholars] = useContext(ScholarContext);
  const [trigger, setTrigger] = useContext(TriggerContext);
  const [snackbar, setSnackbar] = useState();

  const handleCloseSnackbar = () => setSnackbar(null);

  const processRowUpdate = useCallback(async (newRow, oldRow) => {
    // Make the HTTP request to save in the backend
    try {
      const updatedDetails = {
        schoolAttended: newRow.schoolAttended,
        degreeOrProgram: newRow.degreeOrProgram,
        yearAdmitted: newRow.yearAdmitted,
        yearEndedOrGraduated: newRow.yearEndedOrGraduated,
        latinHonors: newRow.latinHonors,
        employed: newRow.employed,
        aboitizCompany: newRow.aboitizCompany,
        designation: newRow.designation,
        company: newRow.company,
        sponsoringBusinessUnit: newRow.sponsoringBusinessUnit,
      };
      const response = await updateScholarDetails(newRow._id, updatedDetails);
      setSnackbar({
        children: "Scholar status successfully updated",
        severity: "success",
      });
      setTrigger(!trigger);
      return response;
    } catch (error) {
    }
    // eslint-disable-next-line
  }, []);

  const handleProcessRowUpdateError = (error) => {
  };

  const date = new Date();
  const currentYear = date.getFullYear();
  let years = [];

  for (let i = currentYear; i >= currentYear - 20; i--) {
    years.push(i);
  }

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      minWidth: 200,
      flex: 1,
      headerAlign: "center",
      align: "center",
      cellClassName: "id-column--cell",
    },
    {
      field: "fullName",
      headerName: "Name",
      minWidth: 150,
      flex: 1,
      valueGetter: (params) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 30,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "terminationRemarks",
      headerName: "Termination Remarks",
      minWidth: 250,
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "gender",
      headerName: "Gender",
      minWidth: 20,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "phone",
      headerName: "Phone",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 250,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "age",
      headerName: "Age",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "address",
      headerName: "Address",
      minWidth: 300,
      headerAlign: "center",
      align: "center",
      flex: 1,
      width: 400,
      cellClassName: "address-column--cell",
      valueGetter: (params) =>
        `${params.row.address || ""} ${params.row.city || ""} ${
          params.row.province || ""
        } ${params.row.island || ""}`,
    },
    {
      field: "sponsoringBusinessUnit",
      headerName: "Business Unit",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
      editable: true,
    },
    {
      field: "schoolAttended",
      headerName: "School Attended",
      minWidth: 200,
      flex: 1,
      editable: true,
    },
    {
      field: "degreeOrProgram",
      headerName: "Degree",
      minWidth: 200,
      flex: 1,
      editable: true,
    },
    {
      field: "yearAdmitted",
      headerName: "Admitted",
      headerAlign: "center",
      align: "center",
      type: "singleSelect",
      valueOptions: [...years],
      editable: true,
    },
    {
      field: "yearEndedOrGraduated",
      headerName: "Ended",
      headerAlign: "center",
      align: "center",
      type: "singleSelect",
      valueOptions: ["N/A", ...years],
      editable: true,
    },
    {
      field: "latinHonors",
      headerName: "Latin Honors",
      flex: 1,
      minWidth: 120,
      type: "singleSelect",
      valueOptions: ["N/A", "Summa Cum Laude", "Magna Cum Laude", "Cum Laude"],
      editable: true,
    },
    {
      field: "employed",
      headerName: "Employed",
      headerAlign: "center",
      align: "center",
      type: "singleSelect",
      valueOptions: ["Yes", "No"],
      editable: true,
    },
    {
      field: "aboitizCompany",
      headerName: "Aboitiz",
      headerAlign: "center",
      align: "center",
      type: "singleSelect",
      valueOptions: ["Yes", "No"],
      editable: true,
    },
    {
      field: "company",
      headerName: "Company",
      minWidth: 120,
      flex: 1,
      editable: true,
    },
    {
      field: "designation",
      headerName: "Designation",
      minWidth: 120,
      editable: true,
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
      <Typography
        variant="h2"
        color={colors.black[500]}
        fontWeight="bold"
        sx={{ mb: "5px" }}
      >
        Scholars Information
      </Typography>
      <Typography variant="h5" color={colors.redAccent[400]}>
        Double-click
        <span style={{ color: colors.redAccent[300], fontWeight: "bold" }}>
          {" "}
          cells{" "}
        </span>
        to edit
      </Typography>
      <Box
        mt="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            border: "none",
            fontSize: "13px",
          },
          "& .address-column--cell": {
            fontSize: "12px",
          },
          "& .MuiDataGrid-columnHeaders": {
            borderBottom: "none",
            backgroundColor: colors.grey[400],
            color: colors.black[500],
            fontSize: "14px",
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.grey[400],
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[900],
          },
          width: "100%",
        }}
      >
        <DataGrid
          rows={scholars}
          columns={columns}
          getRowId={(row) => row._id}
          components={{ Toolbar: GridToolbar }}
          processRowUpdate={processRowUpdate}
          checkboxSelection
          disableRowSelectionOnClick
          onProcessRowUpdateError={handleProcessRowUpdateError}
          initialState={{
            columns: {
              columnVisibilityModel: {
                // Hide columns status and traderName, the other columns will remain visible
                _id: false,
                age: false,
                gender: false,
                phone: false,
                email: false,
                address: false,
                terminationRemarks: false,
              },
            },
          }}
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

export default ScholarsInfo;
