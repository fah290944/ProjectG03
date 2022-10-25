import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

// สี
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { green } from "@mui/material/colors";

import moment from "moment";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { DoctorsInterface } from "../../models/IManage";

const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: green[500],
    },
    secondary: {
      // This is green.A700 as hex.
      main: "#e8f5e9",
    },
  }
});

function Doctors() {
  const [doctors, setDoctors] = React.useState<DoctorsInterface[]>([]);
  const getDoctors = async () => {
    const apiUrl = "http://localhost:8080/doctors";
    const requestOptions = {
      method: "GET",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}`, "Content-Type": "application/json" },
    };

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setDoctors(res.data);
        }
      });
  };

  useEffect(() => {
    getDoctors();
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
                ตารางข้อมูลแพทย์
              </Typography>
            </Box>

            <Box>
              <Button
                component={RouterLink}
                to="/Doctor"
                variant="contained"
                color="primary"
              >
                <Typography
                  color="secondary"
                  component="div"
                  sx={{ flexGrow: 1 }}
                >
                  บันทึกข้อมูลแพทย์

                </Typography>
              </Button>
            </Box>
          </Box>

          <ThemeProvider theme={theme}>
            <div>
              <Container maxWidth="md">
                <div style={{ height: 500, width: "100%", marginTop: "20px" }}>
                  <TableContainer >
                    <Table aria-label="simple table">
                      <TableHead>
                        {/* หัวข้อตาราง */}
                        <TableRow>
                          <TableCell align="center" width="20%"> ID </TableCell>
                          <TableCell align="center" width="20%"> Personal ID </TableCell>
                          <TableCell align="center" width="20%"> Name </TableCell>
                          <TableCell align="center" width="20%"> Position </TableCell>
                          <TableCell align="center" width="20%"> Email </TableCell>
                          <TableCell align="center" width="20%"> Password </TableCell>
                          <TableCell align="center" width="20%"> Salary </TableCell>
                          <TableCell align="center" width="20%"> Tel </TableCell>
                          <TableCell align="center" width="20%"> Gender </TableCell>
                          <TableCell align="center" width="20%"> Date of Birth </TableCell>
                          <TableCell align="center" width="20%"> Year of Start </TableCell>
                          <TableCell align="center" width="20%"> Address </TableCell>
                          <TableCell align="center" width="20%"> Admin </TableCell>
                          <TableCell align="center" width="20%"> Branch </TableCell>
                          <TableCell align="center" width="20%"> location </TableCell>
                        </TableRow>
                      </TableHead>
                      
                      <TableBody>
                        {doctors.map((item: DoctorsInterface) => (
                          <TableRow key={item.ID}>
                            <TableCell align="center">{item.ID}</TableCell>
                            <TableCell align="center">{item.PersonalID}</TableCell>
                            <TableCell align="center">{item.Name}</TableCell>
                            <TableCell align="center">{item.Position}</TableCell>
                            <TableCell align="center">{item.Email}</TableCell>
                            <TableCell align="center">{item.Password}</TableCell>
                            <TableCell align="center">{item.Salary}</TableCell>
                            <TableCell align="center">{item.Tel}</TableCell>
                            <TableCell align="center">{item.Gender}</TableCell>
                            <TableCell align="center">{moment(item.DateOfBirth).format("DD/MM/YYYY HH:mm:ss A")}</TableCell>
                            <TableCell align="center">{moment(item.YearOfStart).format("DD/MM/YYYY HH:mm:ss A")}</TableCell>
                            <TableCell align="center">{item.Address}</TableCell>
                            <TableCell align="center">{item.Admin.Aname}</TableCell>
                            <TableCell align="center">{item.MedicalField?.Bname}</TableCell>
                            <TableCell align="center">{item.WorkPlace?.Paddress}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              </Container>
            </div>
          </ThemeProvider>
      </Container>
      </ThemeProvider>
    </div>
  );
}

export default Doctors;