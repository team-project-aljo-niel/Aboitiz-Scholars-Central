// import {
//   Box,
//   CircularProgress,
//   Fab,
//   useTheme,
// } from "@mui/material";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
// import { themeColors } from "../theme";
// import { useState } from "react";
// import { green } from "@mui/material/colors";
// import { updateAccess } from "./services/UserService";
// import { useEffect } from "react";

// const UsersActions = ({ params, rowId, setRowId }) => {
//   const theme = useTheme();
//   const colors = themeColors(theme.palette.mode);
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);

//   const handleSubmit = async () => {
//     setLoading(true);
//     try {
//       const rowData = params.row;
//       console.log("row",rowData);
//       const newAccess = {
//         access: rowData.access
//       }
//       const response = await updateAccess(rowData._id, newAccess);
//       if (response){
//         setSuccess(true);
//         setRowId(null);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//     setLoading(false);
//   };

//   // useEffect(() => {
//   //   if (rowId === params.id && success) setSuccess(false);
//   // }, [rowId]);

//   return (
//     <Box sx={{ m: 1, position: "relative" }}>
//       {success ? (
//         <Fab
//           onClick={() => {
//             setSuccess(true);
//             console.log(success);
//           }}
//           sx={{
//             width: "40px",
//             height: "40px",
//             bgcolor: green[400],
//             "&:hover": { bgcolor: colors.redAccent[700] },
//           }}
//         >
//           <CheckCircleIcon />
//         </Fab>
//       ) : (
//         <Fab
//           sx={{
//             width: "40px",
//             height: "40px",
//             bgcolor: colors.redAccent[700],
//             "&:hover": { bgcolor: colors.redAccent[600] },
//           }}
//           disabled={params.id !== rowId || loading}
//           onClick={handleSubmit}
//         >
//           <SaveRoundedIcon />
//         </Fab>
//       )}
//       {loading && (
//         <CircularProgress
//           size={52}
//           sx={{
//             color: green[500],
//             position: "absolute",
//             top: -6,
//             left: -6,
//             zIndex: 1,
//           }}
//         />
//       )}
//     </Box>
//   );
// };

// export default UsersActions;
