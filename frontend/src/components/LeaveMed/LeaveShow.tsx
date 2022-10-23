
import React, { useEffect } from "react";

import { Link as RouterLink } from "react-router-dom";

import Typography from "@mui/material/Typography";

import Button from "@mui/material/Button";

import Container from "@mui/material/Container";

import Box from "@mui/material/Box";

import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { green} from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { LeaveInterface } from "../../models/ILeave";


      
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

function LeaveShow() {

 const [leave, setLeave] = React.useState<LeaveInterface[]>([]);


 const getLeave = async () => {

   const apiUrl = "http://localhost:8080/leaves";

   const requestOptions = {

     method: "GET",

     headers: { Authorization: `Bearer ${localStorage.getItem("token")}`, "Content-Type": "application/json"},

   };


   fetch(apiUrl, requestOptions)

     .then((response) => response.json())

     .then((res) => {

       console.log(res.data);

       if (res.data) {

         setLeave(res.data);

       }

     });

 };


 const columns: GridColDef[] = [

   { field: "ID", headerName: "ID", width: 50 },

   { field: "Reason", headerName: "Reason", width: 200 },

   { field: "Fdate", headerName: "First date", width: 150 },

   { field: "Ldate", headerName: "Last date", width: 150 },
   
   { field: "Type", headerName: "Type", width: 200 ,valueFormatter: (params) => params.value.Tleave},

   { field: "Doctor", headerName: "Doctor", width: 200 ,valueFormatter: (params) => params.value.Name},

   { field: "Evidence", headerName: "Evidence", width: 200,valueFormatter: (params) => params.value.Etype },

 ];


 useEffect(() => {

   getLeave();

 }, []);


 return (

   <div>

     <Container maxWidth="md">

       <Box

         display="flex"

         sx={{

           marginTop: 2,

         }}

       >

         <Box flexGrow={1}>
         <ThemeProvider theme={theme}>
           <Typography

             component="h2"

             variant="h6"

             color="primary"

             gutterBottom

           >

             ตารางข้อมูลการลาพักงานของแพทย์

           </Typography>
           </ThemeProvider>
         </Box>

         <Box>
         <ThemeProvider theme={theme}>
           <Button
             component={RouterLink}

             size="large"

             to="/Leave"

             variant="contained"

             color="primary"

           > 
           
            <Typography

            color="secondary"

            variant="h6"

            component="div"

            sx={{ flexGrow: 1 }}
         >
             ยื่นใบขอลาพักงาน 
             
             </Typography>
            </Button>
           </ThemeProvider>
         </Box>

       </Box>

       <div style={{ height: 400, width: "100%", marginTop: '20px'}}>

         <DataGrid

           rows={leave}

           getRowId={(row) => row.ID}

           columns={columns}

           pageSize={5}

           rowsPerPageOptions={[5]}

         />

       </div>

     </Container>

   </div>

 );

}


export default LeaveShow;