import { Alert, Box, Snackbar, Typography, useTheme } from "@mui/material";
import { themeColors } from "../../theme";
import { useCallback, useContext } from "react";
import { useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { updateGrades } from "../services/UserService";
import { GradesContext } from "../providers/GradeProvider";
import { TriggerContext } from "../providers/TriggerProvider";

const ScholarsGrades = () => {
  const theme = useTheme();
  const colors = themeColors(theme.palette.mode);

  const [grades] = useContext(GradesContext);

  const [trigger, setTrigger] = useContext(TriggerContext);
  const [snackbar, setSnackbar] = useState();
  const handleCloseSnackbar = () => setSnackbar(null);

  const processRowUpdate = useCallback(async (newRow, oldRow) => {
    // Make the HTTP request to save in the backend
    try {
      const updatedDetails = {
        firstYear: {
          firstTerm: newRow.year1Term1 || oldRow.firstYear.firstTerm,
          secondTerm: newRow.year1Term2 || oldRow.firstYear.secondTerm,
          thirdTerm: newRow.year1Term3 || oldRow.firstYear.thirdTerm,
        },
        secondYear: {
          firstTerm: newRow.year2Term1 || oldRow.secondYear.firstTerm,
          secondTerm: newRow.year2Term2 || oldRow.secondYear.secondTerm,
          thirdTerm: newRow.year2Term3 || oldRow.secondYear.thirdTerm,
        },
        thirdYear: {
          firstTerm: newRow.year3Term1 || oldRow.thirdYear.firstTerm,
          secondTerm: newRow.year3Term2 || oldRow.thirdYear.secondTerm,
          thirdTerm: newRow.year3Term3 || oldRow.thirdYear.thirdTerm,
        },
        fourthYear: {
          firstTerm: newRow.year4Term1 || oldRow.fourthYear.firstTerm,
          secondTerm: newRow.year4Term2 || oldRow.fourthYear.secondTerm,
          thirdTerm: newRow.year4Term3 || oldRow.fourthYear.thirdTerm,
        },
      };

      const response = await updateGrades(newRow.user, updatedDetails);

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
      minWidth: 250,
      flex: 1.3,
      valueGetter: (params) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
    {
      field: "year1Term1",
      headerName: "Y1T1 Year1-Term1",
      headerAlign: "center",
      align: "center",
      minWidth: 70,
      editable: true,
      flex: 1,
      valueGetter: (params) => `${params.row.firstYear.firstTerm || ""}`,
    },
    {
      field: "year1Term2",
      headerName: "Y1T2 Year1-Term2",
      headerAlign: "center",
      align: "center",
      minWidth: 70,
      editable: true,
      flex: 1,
      valueGetter: (params) => `${params.row.firstYear.secondTerm || ""}`,
    },

    {
      field: "year1Term3",
      headerName: "Y1T3 Year1-Term3",
      headerAlign: "center",
      align: "center",
      minWidth: 70,
      editable: true,
      flex: 1,
      valueGetter: (params) => `${params.row.firstYear.thirdTerm || ""}`,
    },
    {
      field: "year2Term1",
      headerName: "Y2T1 Year2-Term1",
      headerAlign: "center",
      align: "center",
      minWidth: 70,
      editable: true,
      flex: 1,
      valueGetter: (params) => `${params.row.secondYear.firstTerm || ""}`,
    },
    {
      field: "year2Term2",
      headerName: "Y2T2 Year2-Term2",
      headerAlign: "center",
      align: "center",
      minWidth: 70,
      editable: true,
      flex: 1,
      valueGetter: (params) => `${params.row.secondYear.secondTerm || ""}`,
    },
    {
      field: "year2Term3",
      headerName: "Y2T3 Year2-Term3",
      headerAlign: "center",
      align: "center",
      minWidth: 70,
      editable: true,
      flex: 1,
      valueGetter: (params) => `${params.row.secondYear.thirdTerm || ""}`,
    },
    {
      field: "year3Term1",
      headerName: "Y3T1 Year3-Term1",
      headerAlign: "center",
      align: "center",
      minWidth: 70,
      editable: true,
      flex: 1,
      valueGetter: (params) => `${params.row.thirdYear.firstTerm || ""}`,
    },
    {
      field: "year3Term2",
      headerName: "Y3T2 Year3-Term2",
      headerAlign: "center",
      align: "center",
      minWidth: 70,
      editable: true,
      flex: 1,
      valueGetter: (params) => `${params.row.thirdYear.secondTerm || ""}`,
    },
    {
      field: "year3Term3",
      headerName: "Y3T3 Year3-Term3",
      headerAlign: "center",
      align: "center",
      minWidth: 70,
      editable: true,
      flex: 1,
      valueGetter: (params) => `${params.row.thirdYear.thirdTerm || ""}`,
    },
    {
      field: "year4Term1",
      headerName: "Y4T1 Year4-Term1",
      headerAlign: "center",
      align: "center",
      minWidth: 70,
      editable: true,
      flex: 1,
      valueGetter: (params) => `${params.row.fourthYear.firstTerm || ""}`,
    },
    {
      field: "year4Term2",
      headerName: "Y4T2 Year4-Term2",
      headerAlign: "center",
      align: "center",
      minWidth: 70,
      editable: true,
      flex: 1,
      valueGetter: (params) => `${params.row.fourthYear.secondTerm || ""}`,
    },
    {
      field: "year4Term3",
      headerName: "Y4T3 Year4-Term3",
      headerAlign: "center",
      align: "center",
      minWidth: 70,
      editable: true,
      flex: 1,
      valueGetter: (params) => `${params.row.fourthYear.thirdTerm || ""}`,
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
        Scholars Grades
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
            fontSize: "16px",
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
          rows={grades}
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
                year1Term3: false,
                year2Term3: false,
                year3Term3: false,
                year4Term3: false,
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

export default ScholarsGrades;
