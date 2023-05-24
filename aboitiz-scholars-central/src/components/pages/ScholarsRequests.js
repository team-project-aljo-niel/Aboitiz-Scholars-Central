import {
  Alert,
  Box,
  Snackbar,
  Typography,
  useTheme,
  Modal,
  Button,
} from '@mui/material';
import { themeColors } from '../../theme';
import { useContext, useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import {
  updateScholarDetails,
  deleteAccountUpdates,
} from '../services/UserService';
import { ScholarContext } from '../providers/ScholarProvider';
import { UpdatesContext } from '../providers/UpdatesProvider';

// Manage Scholar Status Page
const ScholarsRequests = () => {
  const theme = useTheme();
  const colors = themeColors(theme.palette.mode);
  const [updates, setUpdates] = useContext(UpdatesContext);
  const [scholar] = useContext(ScholarContext);
  const [snackbar, setSnackbar] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [account, setAccount] = useState(' ');
  const handleCloseSnackbar = () => setSnackbar(null);
  const handleCloseModal = () => setSelectedRow(null);

  useEffect(() => {
    // Refresh the updates when the updates context changes
    setUpdates(updates);
  }, [updates, setUpdates]);

  const handleRequestButtonClick = (row) => {
    const selectedScholar = scholar.filter(
      (item) => item.user[0] === row.user[0]
    );
    setSelectedRow(row);
    setAccount(selectedScholar);
  };

  const handleApproveChange = async () => {
    try {
      const response = await updateScholarDetails(
        selectedRow?.user[0],
        selectedRow
      );
      console.log(response.data);
      if (response.data == 'Scholar info changed successfully') {
        await deleteAccountUpdates(selectedRow?.user[0]);
        setSnackbar({
          children: 'Account update saved succesfully',
          severity: 'success',
        });
      }
      handleCloseModal();
    } catch (error) {
      console.error(error);
    }
  };

  const columns = [
    {
      field: '_id',
      flex: 1,
      minWidth: 300,
      headerName: 'ID',
      headerAlign: 'center',
      align: 'center',
      cellClassName: 'id-column--cell',
    },
    {
      field: 'fullName',
      flex: 1,
      minWidth: 250,
      headerName: 'Name',
      valueGetter: (params) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    {
      field: 'requests',
      flex: 1,
      minWidth: 300,
      headerName: 'Requests',
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <Button onClick={() => handleRequestButtonClick(params.row)}>
          View Requests
        </Button>
      ),
    },
  ];

  return (
    <Box m='20px'>
      <Typography
        variant='h2'
        color={colors.black[500]}
        fontWeight='bold'
        sx={{ mb: '5px' }}
      >
        Scholars Account Update Requests
      </Typography>
      <Typography variant='h5' color={colors.redAccent[400]}>
        Double-click
        <span style={{ color: colors.redAccent[300], fontWeight: 'bold' }}>
          {' '}
          cells{' '}
        </span>
        to edit
      </Typography>
      <Box
        mt='40px'
        height='75vh'
        sx={{
          '& .MuiDataGrid-root': {
            border: 'none',
          },
          '& .MuiDataGrid-cell': {
            border: 'none',
            fontSize: '18px',
          },
          '& .status-column--cell': {
            color: colors.redAccent[300],
            fontSize: '18px',
            fontWeight: 'bold',
          },
          '& .remarks-column--cell': {
            color: colors.redAccent[300],
            fontSize: '18px',
            fontWeight: 'bold',
          },
          '& .MuiDataGrid-columnHeaders': {
            borderBottom: 'none',
            backgroundColor: colors.grey[400],
            color: colors.black[500],
            fontSize: '18px',
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: 'none',
            backgroundColor: colors.grey[400],
          },
          '& .MuiDataGrid-virtualScroller': {
            backgroundColor: colors.primary[900],
          },
          width: '100%',
        }}
      >
        <DataGrid
          rows={updates}
          columns={columns}
          getRowId={(row) => row._id}
          components={{ Toolbar: GridToolbar }}
          checkboxSelection
          disableRowSelectionOnClick
        />
        {!!snackbar && (
          <Snackbar
            open
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            onClose={handleCloseSnackbar}
            autoHideDuration={6000}
          >
            <Alert {...snackbar} onClose={handleCloseSnackbar} />
          </Snackbar>
        )}
        <Modal
          open={!!selectedRow}
          onClose={handleCloseModal}
          aria-labelledby='modal-title'
          aria-describedby='modal-description'
        >
          <div
            style={{ height: '100%' }}
            onClick={(event) => {
              if (event.target === event.currentTarget) {
                handleCloseModal();
              }
            }}
          >
            <Box
              display='flex'
              justifyContent='center'
              alignItems='center'
              height='75vh'
              width='50%'
              margin='10vh auto'
              bgcolor='white'
              borderRadius='5px'
              boxShadow={1}
              style={{ backdropFilter: 'blur(3px)' }}
            >
              <div>
                <Typography
                  variant='h3'
                  component='h3'
                  style={{ textAlign: 'center', margin: '1rem auto' }}
                >
                  {selectedRow?.firstName + ' ' + selectedRow?.lastName}
                </Typography>
                <div style={{ display: 'flex' }}>
                  <div
                    style={{
                      width: '50%',
                      height: '100%',
                      borderRight: '1px solid gray',
                    }}
                  >
                    {/* Left partition */}
                    <Typography
                      variant='h5'
                      component='h3'
                      gutterBottom
                      style={{ textAlign: 'center' }}
                    >
                      Current Details
                    </Typography>
                    {/* Add your content for the current details here */}
                    <Typography variant='body1' component='p' gutterBottom>
                      Age: {account?.[0].age}
                    </Typography>
                    <Typography variant='body1' component='p' gutterBottom>
                      Address: {account?.[0].address}
                    </Typography>
                    <Typography variant='body1' component='p' gutterBottom>
                      City: {account?.[0].city}
                    </Typography>
                    <Typography variant='body1' component='p' gutterBottom>
                      Province: {account?.[0].province}
                    </Typography>
                    <Typography variant='body1' component='p' gutterBottom>
                      Island: {account?.[0].island}
                    </Typography>
                    <Typography variant='body1' component='p' gutterBottom>
                      School Attended: {account?.[0].schoolAttended}
                    </Typography>
                    <Typography variant='body1' component='p' gutterBottom>
                      Degree or Program: {account?.[0].degreeOrProgram}
                    </Typography>
                    <Typography variant='body1' component='p' gutterBottom>
                      Year Admitted: {account?.[0].yearAdmitted}
                    </Typography>
                    <Typography variant='body1' component='p' gutterBottom>
                      Year Ended or Graduated:{' '}
                      {account?.[0].yearEndedorGraduated}
                    </Typography>
                    <Typography variant='body1' component='p' gutterBottom>
                      Latin Honors: {account?.[0].latinHonors}
                    </Typography>
                    <Typography variant='body1' component='p' gutterBottom>
                      Employed: {account?.[0].employed}
                    </Typography>
                    <Typography variant='body1' component='p' gutterBottom>
                      Aboitiz Company: {account?.[0].aboitizCompany}
                    </Typography>
                    <Typography variant='body1' component='p' gutterBottom>
                      Designation: {account?.[0].designation}
                    </Typography>
                    <Typography variant='body1' component='p' gutterBottom>
                      Company: {account?.[0].company}
                    </Typography>
                  </div>
                  <div
                    style={{ width: '50%', height: '100%', marginLeft: '1rem' }}
                  >
                    <Typography
                      variant='h5'
                      component='h3'
                      gutterBottom
                      style={{ textAlign: 'center' }}
                    >
                      Pending Updates
                    </Typography>
                    {/* Add your content for the current details here */}
                    <Typography variant='body1' component='p' gutterBottom>
                      Age: {selectedRow?.age}
                    </Typography>
                    <Typography variant='body1' component='p' gutterBottom>
                      Address:{selectedRow?.address}
                    </Typography>
                    <Typography variant='body1' component='p' gutterBottom>
                      City: {selectedRow?.city}
                    </Typography>
                    <Typography variant='body1' component='p' gutterBottom>
                      Province: {selectedRow?.province}
                    </Typography>
                    <Typography variant='body1' component='p' gutterBottom>
                      Island: {selectedRow?.island}
                    </Typography>
                    <Typography variant='body1' component='p' gutterBottom>
                      School Attended:{selectedRow?.schoolAttended}
                    </Typography>
                    <Typography variant='body1' component='p' gutterBottom>
                      Degree or Program: {selectedRow?.degreeOrProgram}
                    </Typography>
                    <Typography variant='body1' component='p' gutterBottom>
                      Year Admitted: {selectedRow?.yearAdmitted}
                    </Typography>
                    <Typography variant='body1' component='p' gutterBottom>
                      Year Ended or Graduated:{' '}
                      {selectedRow?.yearEndedorGraduated}
                    </Typography>
                    <Typography variant='body1' component='p' gutterBottom>
                      Latin Honors: {selectedRow?.latinHonors}
                    </Typography>
                    <Typography variant='body1' component='p' gutterBottom>
                      Employed: {selectedRow?.employed}
                    </Typography>
                    <Typography variant='body1' component='p' gutterBottom>
                      Aboitiz Company: {selectedRow?.aboitizCompany}
                    </Typography>
                    <Typography variant='body1' component='p' gutterBottom>
                      Designation: {selectedRow?.designation}
                    </Typography>
                    <Typography variant='body1' component='p' gutterBottom>
                      Company: {selectedRow?.company}
                    </Typography>
                  </div>
                </div>

                <Box display='flex' justifyContent='center' marginTop='20px'>
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={() =>
                      handleApproveChange(selectedRow?.user[0], selectedRow)
                    }
                  >
                    Approve Changes
                  </Button>
                </Box>
              </div>
            </Box>
          </div>
        </Modal>
      </Box>
    </Box>
  );
};

export default ScholarsRequests;
