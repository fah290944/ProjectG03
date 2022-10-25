import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
//สี
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { green } from '@mui/material/colors';
import { PatientsInterface } from "../../models/IPatient";
import moment from "moment";


const theme = createTheme({
  palette: {
    primary: {
      main: green[400],
    },
    secondary: {
      main: '#e8f5e9',
    },
  },
});

function PatientsShow() {

 const [patients, setPatients] = React.useState<PatientsInterface[]>([]);

 const getPatients = async () => {
   const apiUrl = "http://localhost:8080/patients";
   const requestOptions = {
     method: "GET",

     headers: {Authorization: `Bearer ${localStorage.getItem("token")}`, "Content-Type": "application/json" },
   };

   fetch(apiUrl, requestOptions)

     .then((response) => response.json())

     .then((res) => {
       console.log(res.data);

       if (res.data) {
        setPatients(res.data);
       }

     });
 };

 console.log(patients)

 const columns: GridColDef[] = [

   { field: "ID", headerName: "ID", width: 50 },

   { field: "PatientsName", headerName: "ชื่อผู้ป่วย", width: 150 },

   { field: "DateAdmit", headerName: "วันที่เข้ารักษา", width: 200 ,valueFormatter:(params) => moment(params.value.DateAdmit).format("DD/MM/YYYY HH:mm:ss A")},

   { field: "Age", headerName: "อายุ(ปี)", width: 70 },

   { field: "Doctor", headerName: "หมอที่ดูแล", width: 200 , valueFormatter: (params) => params.value.Name},

   { field: "PatientType", headerName: "ประเภทผู้ป่วย", width: 150, valueFormatter: (params) => params.value.Type},

   { field: "Symptoms", headerName: "โรคที่รักษา", width: 200 , valueFormatter: (params) => params.value.SymptomsName},
 ];


 useEffect(() => {
  getPatients();
 }, []);


 return (
   <div>
    <ThemeProvider theme={theme}>
     <Container maxWidth="md">
       <Box
         display="flex"
         sx={{
           marginTop: 2,
         }}
       >
         <Box flexGrow={1}>
           <Typography
             component="h2"
             variant="h6"
             color="primary"
             gutterBottom
           >
            Patients
           </Typography>
         </Box>
       </Box>
       <div style={{ height: 400, width: "100%", marginTop: '20px'}}>
         <DataGrid
           rows={patients}
           getRowId={(row) => row.ID}
           columns={columns}
           pageSize={5}
           rowsPerPageOptions={[5]}
         />
       </div>
     </Container>
     </ThemeProvider>
   </div>
 );

}
export default PatientsShow;