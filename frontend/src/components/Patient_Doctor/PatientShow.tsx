import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
//สี
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { green } from '@mui/material/colors';
import { PatientsInterface } from "../../models/IPatient";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
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

      headers: { Authorization: `Bearer ${localStorage.getItem("token")}`, "Content-Type": "application/json" },
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
            <Box>
              <Button
                component={RouterLink}
                to="/Patient"
                variant="contained"
                color="success"
              >
                บันทึกข้อมูลผู้ป่วย
              </Button>
            </Box>
          </Box>
          <div>
            <Container maxWidth="md">
              <div style={{ height: 500, width: "100%", marginTop: "20px" }}>
                <TableContainer >
                  <Table aria-label="simple table">
                    <TableHead>
                      {/* หัวข้อตาราง */}
                      <TableRow>
                        <TableCell align="center" width="20%"> ID </TableCell>
                        <TableCell align="center" width="20%"> ชื่อผู้ป่วย </TableCell>
                        <TableCell align="center" width="20%"> วันที่เข้ารักษา </TableCell>
                        <TableCell align="center" width="20%"> อายุ(ปี) </TableCell>
                        <TableCell align="center" width="20%"> หมอที่ดูแล </TableCell>
                        <TableCell align="center" width="20%"> ประเภทผู้ป่วย </TableCell>
                        <TableCell align="center" width="20%"> โรคที่รักษา </TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {patients.map((item: PatientsInterface) => (
                        <TableRow key={item.ID}>
                          <TableCell align="center">{item.ID}</TableCell>
                          <TableCell align="center">{item.PatientsName}</TableCell>
                          <TableCell align="center">{moment(item.DateAdmit).format("DD/MM/YYYY HH:mm:ss A")}</TableCell>
                          <TableCell align="center">{item.Age}</TableCell>
                          <TableCell align="center">{item.Doctor.Name}</TableCell>
                          <TableCell align="center">{item.PatientType.Type}</TableCell>
                          <TableCell align="center">{item.Symptoms.SymptomsName}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </Container>
          </div>
        </Container>
      </ThemeProvider>
    </div>
  );

}
export default PatientsShow;