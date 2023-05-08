import { Alert, Box, Snackbar, Typography, useTheme } from "@mui/material";
import { themeColors } from "../../theme";
import { useCallback, useContext } from "react";
import { useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { updateScholarDetails } from "../services/UserService";
import { ScholarContext } from "../providers/ScholarProvider";

const ScholarsStatus = () => {
  const theme = useTheme();
  const colors = themeColors(theme.palette.mode);
  const [scholars] = useContext(ScholarContext);
  const [snackbar, setSnackbar] = useState();

  const handleCloseSnackbar = () => setSnackbar(null);

  const processRowUpdate = useCallback(async (newRow, oldRow) => {
    // Make the HTTP request to save in the backend
    try {
      if (newRow.status !== "Terminated") {
        newRow.terminationRemarks = "N/A";
      }

      const updatedDetails = {
        status: newRow.status,
        terminationRemarks: newRow.terminationRemarks,
      };
      const response = await updateScholarDetails(newRow._id, updatedDetails);
      setSnackbar({
        children: "Scholar status successfully updated",
        severity: "success",
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleProcessRowUpdateError = (error) => {
    // console.log(error);
    // setSnackbar({ children: error.message, severity: "error" });
  };

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      width: 300,
      headerAlign: "center",
      align: "center",
      cellClassName: "id-column--cell",
    },
    {
      field: "fullName",
      headerName: "Name",
      flex: 1,
      valueGetter: (params) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
    {
      field: "status",
      headerName: "Status",
      headerAlign: "center",
      align: "center",
      flex: 1,
      type: "singleSelect",
      valueOptions: ["Active", "Graduated", "Terminated"],
      editable: true,
      cellClassName: "status-column--cell",
    },
    {
      field: "terminationRemarks",
      headerName: "Termination Remarks",
      headerAlign: "center",
      align: "center",
      flex: 1,
      type: "singleSelect",
      valueOptions: [
        "N/A",
        "Stopped Schooling",
        "Failed to Meet Grade Requirement",
        "Transferred School",
        "Availed Other Scholarships",
        "No Communication",
        "Shifted to Another Degree Program",
        "Deceased",
      ],
      editable: true,
      cellClassName: "remarks-column--cell",
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
        Scholars Status
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
            fontSize: "18px",
          },
          "& .status-column--cell": {
            color: colors.redAccent[300],
            fontSize: "18px",
            fontWeight: "bold",
          },
          "& .remarks-column--cell": {
            color: colors.redAccent[300],
            fontSize: "18px",
            fontWeight: "bold",
          },
          "& .MuiDataGrid-columnHeaders": {
            borderBottom: "none",
            backgroundColor: colors.grey[400],
            color: colors.black[500],
            fontSize: "18px",
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

export default ScholarsStatus;
