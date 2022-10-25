
import React, { useEffect } from "react";

import { Link as RouterLink } from "react-router-dom";

import Typography from "@mui/material/Typography";

import Container from "@mui/material/Container";

import Box from "@mui/material/Box";

import { green } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { LeaveInterface } from "../../models/ILeave";
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

function LeaveShow() {

  const [leave, setLeave] = React.useState<LeaveInterface[]>([]);


  const getLeave = async () => {

    const apiUrl = "http://localhost:8080/leaves";

    const requestOptions = {

      method: "GET",

      headers: { Authorization: `Bearer ${localStorage.getItem("token")}`, "Content-Type": "application/json" },

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
        <div>
          <Container maxWidth="md">
            <div style={{ height: 500, width: "100%", marginTop: "20px" }}>
              <TableContainer >
                <Table aria-label="simple table">
                  <TableHead>
                    {/* หัวข้อตาราง */}
                    <TableRow>
                      <TableCell align="center" width="20%"> ID </TableCell>
                      <TableCell align="center" width="20%"> Reason </TableCell>
                      <TableCell align="center" width="20%"> First date </TableCell>
                      <TableCell align="center" width="20%"> Last date </TableCell>
                      <TableCell align="center" width="20%"> Type </TableCell>
                      <TableCell align="center" width="20%"> Doctor </TableCell>
                      <TableCell align="center" width="20%"> Evidence </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {leave.map((item: LeaveInterface) => (
                      <TableRow key={item.ID}>
                        <TableCell align="center">{item.ID}</TableCell>
                        <TableCell align="center">{item.Reason}</TableCell>
                        <TableCell align="center">{moment(item.Fdate).format("DD/MM/YYYY HH:mm:ss A")}</TableCell>
                        <TableCell align="center">{moment(item.Ldate).format("DD/MM/YYYY HH:mm:ss A")}</TableCell>
                        <TableCell align="center">{item.Type?.Tleave}</TableCell>
                        <TableCell align="center">{item.Doctor?.Name}</TableCell>
                        <TableCell align="center">{item.Evidence?.Etype}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </Container>
        </div>

      </Container>

    </div>

  );

}


export default LeaveShow;