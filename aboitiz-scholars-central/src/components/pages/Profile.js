import {
  Alert,
  Autocomplete,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Snackbar,
  TextField,
} from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import Header from '../Header';
import { useState } from 'react';
import { CurrentUserContext } from '../providers/CurrentUserProvider';
import { useContext } from 'react';
import { addScholarDetails, addAccountUpdates } from '../services/UserService';
import { TriggerContext } from '../providers/TriggerProvider';
import { phGeoFeatures } from '../data/phGeoFeatures';

// Profile Page for Scholars
const Profile = () => {
  const [, setResponseMessage] = useState('');
  const [currentUser] = useContext(CurrentUserContext);
  const [trigger, setTrigger] = useContext(TriggerContext);
  const [snackbar, setSnackbar] = useState();
  const scholarData = currentUser.scholarData[0];
  if (!currentUser) {
    return <div>...Loading</div>;
  }

  const initialValues = {
    address: scholarData?.address || '',
    city: scholarData?.city || '',
    province: scholarData?.province || '',
    island: scholarData?.island || '',
    schoolAttended: scholarData?.schoolAttended || '',
    degreeOrProgram: scholarData?.degreeOrProgram || '',
    yearAdmitted: scholarData?.yearAdmitted || '',
    yearEndedOrGraduated: scholarData?.yearEndedOrGraduated || '',
    latinHonors: scholarData?.latinHonors || '',
    employed: scholarData?.employed || 'No',
    aboitizCompany: scholarData?.aboitizCompany || 'No',
    designation: scholarData?.designation || '',
    company: scholarData?.company || '',
    age: scholarData?.age || '',
  };

  // Form Validation for scholars' profile
  const userSchema = yup.object().shape({
    address: yup.string().required('required'),
    city: yup.string().required('required'),
    province: yup.string().required('required'),
    island: yup.string().required('required'),
    schoolAttended: yup.string().required('required'),
    degreeOrProgram: yup.string().required('required'),
    yearAdmitted: yup.string().required('required'),
    yearEndedOrGraduated: yup.string().required('required'),
    latinHonors: yup.string().required('required'),
    employed: yup.string().required('required'),
    aboitizCompany: yup.string().required('required'),
    designation: yup.string(),
    company: yup.string(),
    age: yup.number().required('required'),
  });

  const handleCloseSnackbar = () => setSnackbar(null);

  // Year Options for scholars' date admission/graduation/termination
  const date = new Date();
  const currentYear = date.getFullYear();
  let years = [];
  for (let i = currentYear; i >= currentYear - 20; i--) {
    years.push(i);
  }

  // GeoFeatures Array needed for the Autocomplete component
  let properties = [];
  phGeoFeatures.features.forEach((obj) =>
    properties.push({
      city: obj.properties.NAME_2,
      province: obj.properties.NAME_1,
      id: obj.properties.ID_2,
    })
  );
  properties.sort((a, b) => a.city.localeCompare(b.city));

  const handleFormSubmit = async (values) => {
    try {
      const scholarDetails = {
        age: values.age,
        address: values.address,
        city: values.city,
        province: values.province,
        island: values.island,
        schoolAttended: values.schoolAttended,
        degreeOrProgram: values.degreeOrProgram,
        yearAdmitted: values.yearAdmitted,
        yearEndedOrGraduated: values.yearEndedOrGraduated,
        latinHonors: values.latinHonors,
        employed: values.employed,
        aboitizCompany: values.aboitizCompany,
        designation: values.designation,
        company: values.company,
        status: 'Active',
        terminationRemarks: 'N/A',
        sponsoringBusinessUnit: '',
      };
      if (scholarData) {
        const response = await addAccountUpdates(scholarDetails);
        setResponseMessage(response.data);
        setSnackbar({
          children: 'Request for Account Update Sent',
          severity: 'success',
        });
      } else {
        const response = await addScholarDetails(scholarDetails);
        setResponseMessage(response.data);
        setSnackbar({
          children: 'Details successfully added',
          severity: 'success',
        });
      }
      setTrigger(!trigger);
    } catch (error) {
      setResponseMessage(error.response.data.message);
      setSnackbar({ children: error.response.data.message, severity: 'error' });
    }
  };

  return (
    <Box m='20px'>
      <Header title='My Profile' subtitle='Scholar Information' />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={userSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={1}>
                <TextField
                  fullWidth
                  variant='filled'
                  type='text'
                  label='Age'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.age}
                  name='age'
                  error={!!touched.age && !!errors.age}
                  helperText={touched.age && errors.age}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  variant='filled'
                  type='text'
                  label='Address'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.address}
                  name='address'
                  error={!!touched.address && !!errors.address}
                  helperText={touched.address && errors.address}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Autocomplete
                  autoHighlight
                  fullWidth
                  name='city'
                  options={properties}
                  value={{ city: values.city }}
                  getOptionLabel={(option) => option.city}
                  isOptionEqualToValue={(option, value) =>
                    option.city === value.city
                  }
                  renderOption={(props, option) => {
                    return (
                      <li {...props} key={`${option.city}${option.id}`}>
                        {`${option.city}, ${option.province}`}
                      </li>
                    );
                  }}
                  onChange={(e, value) => {
                    setFieldValue(
                      'city',
                      value !== null ? value.city : initialValues.city
                    );
                    setFieldValue(
                      'province',
                      value !== null ? value.province : initialValues.province
                    );
                  }}
                  onBlur={handleBlur}
                  sx={{ gridColumn: 'span 2' }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant='filled'
                      label='Choose a City'
                      error={!!touched.city && !!errors.city}
                      helperText={touched.city && errors.city}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6} sm={6} md={3}>
                <TextField
                  fullWidth
                  variant='filled'
                  InputProps={{ readOnly: true }}
                  type='text'
                  label='Province'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.province}
                  name='province'
                  error={!!touched.province && !!errors.province}
                  helperText={touched.province && errors.province}
                />
              </Grid>
              <Grid item xs={6} sm={6} md={2}>
                <FormControl fullWidth variant='filled'>
                  <InputLabel id='demo-simple-select-label'>
                    Island Group
                  </InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    label='Island Group'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.island}
                    name='island'
                    error={!!touched.island && !!errors.island}
                  >
                    <MenuItem value={'Luzon'}>Luzon</MenuItem>
                    <MenuItem value={'Visayas'}>Visayas</MenuItem>
                    <MenuItem value={'Mindanao'}>Mindanao</MenuItem>
                  </Select>
                  <FormHelperText>
                    {touched.island && errors.island}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <TextField
                  fullWidth
                  variant='filled'
                  type='text'
                  label='School Attended'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.schoolAttended}
                  name='schoolAttended'
                  error={!!touched.schoolAttended && !!errors.schoolAttended}
                  helperText={touched.schoolAttended && errors.schoolAttended}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <TextField
                  fullWidth
                  variant='filled'
                  type='text'
                  label='Degree/Program'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.degreeOrProgram}
                  name='degreeOrProgram'
                  error={!!touched.degreeOrProgram && !!errors.degreeOrProgram}
                  helperText={touched.degreeOrProgram && errors.degreeOrProgram}
                />
              </Grid>
              <Grid item xs={6} sm={6} md={3}>
                <FormControl fullWidth variant='filled'>
                  <InputLabel id='demo-simple-select-label'>
                    Year Admitted
                  </InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    label='Year Admitted'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.yearAdmitted}
                    name='yearAdmitted'
                    error={!!touched.yearAdmitted && !!errors.yearAdmitted}
                  >
                    {years.map((year) => (
                      <MenuItem key={year} value={year}>
                        {year}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>
                    {touched.yearAdmitted && errors.yearAdmitted}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={6} sm={6} md={3}>
                <FormControl fullWidth variant='filled'>
                  <InputLabel id='demo-simple-select-label'>
                    Year Graduated
                  </InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    label='Year Graduated'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.yearEndedOrGraduated}
                    name='yearEndedOrGraduated'
                    error={
                      !!touched.yearEndedOrGraduated &&
                      !!errors.yearEndedOrGraduated
                    }
                  >
                    <MenuItem value={'N/A'}>N/A</MenuItem>
                    {years.map((year) => (
                      <MenuItem key={year} value={year}>
                        {year}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>
                    {touched.yearEndedOrGraduated &&
                      errors.yearEndedOrGraduated}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <FormControl
                  fullWidth
                  variant='filled'
                  disabled={
                    values.yearEndedOrGraduated !== 'N/A' ? false : true
                  }
                >
                  <InputLabel id='demo-simple-select-label'>
                    Latin Honors
                  </InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    label='Latin Honors'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={
                      values.yearEndedOrGraduated !== 'N/A'
                        ? values.latinHonors
                        : (values.latinHonors = 'N/A')
                    }
                    name='latinHonors'
                    error={!!touched.latinHonors && !!errors.latinHonors}
                  >
                    <MenuItem value={'N/A'}>N/A</MenuItem>
                    <MenuItem value={'Summa Cum Laude'}>
                      Summa Cum Laude
                    </MenuItem>
                    <MenuItem value={'Magna Cum Laude'}>
                      Magna Cum Laude
                    </MenuItem>
                    <MenuItem value={'Cum Laude'}>Cum Laude</MenuItem>
                  </Select>
                  <FormHelperText>
                    {touched.latinHonors && errors.latinHonors}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={6} sm={6} md={2}>
                <FormControl>
                  <FormLabel id='employed-row-radio-buttons-group-label'>
                    Employed?
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby='employed-row-radio-buttons-group-label'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.employed}
                    name='employed'
                  >
                    <FormControlLabel
                      value='Yes'
                      control={<Radio />}
                      label='Yes'
                    />
                    <FormControlLabel
                      value='No'
                      control={<Radio />}
                      label='No'
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={6} sm={6} md={2}>
                <FormControl>
                  <FormLabel id='aboitiz-row-radio-buttons-group-label'>
                    Aboitiz Company?
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby='aboitiz-row-radio-buttons-group-label'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={
                      values.employed === 'Yes'
                        ? values.aboitizCompany
                        : (values.aboitizCompany = 'No')
                    }
                    name='aboitizCompany'
                  >
                    <FormControlLabel
                      value='Yes'
                      control={<Radio />}
                      label='Yes'
                    />
                    <FormControlLabel
                      value='No'
                      control={<Radio />}
                      label='No'
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                {' '}
                <TextField
                  fullWidth
                  variant='filled'
                  disabled={values.employed === 'Yes' ? false : true}
                  type='text'
                  label='Company'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={
                    values.employed === 'Yes'
                      ? values.company
                      : (values.company = '')
                  }
                  name='company'
                  error={!!touched.company && !!errors.company}
                  helperText={touched.company && errors.company}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                {' '}
                <TextField
                  fullWidth
                  variant='filled'
                  disabled={values.employed === 'Yes' ? false : true}
                  type='text'
                  label='Designation'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={
                    values.employed === 'Yes'
                      ? values.designation
                      : (values.designation = '')
                  }
                  name='designation'
                  error={!!touched.designation && !!errors.designation}
                  helperText={touched.designation && errors.designation}
                />
              </Grid>
            </Grid>
            <Box display='flex' justifyContent='center' mt='20px'>
              <Button type='submit' color='secondary' variant='contained'>
                Request Update Approval
              </Button>
            </Box>
          </form>
        )}
      </Formik>
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
    </Box>
  );
};

export default Profile;
