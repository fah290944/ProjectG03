import React, { useEffect } from "react";

import { Link as RouterLink } from "react-router-dom";

import Typography from "@mui/material/Typography";

import Container from "@mui/material/Container";

import Box from "@mui/material/Box";

//import { UsersInterface } from "../models/IUser";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import { green } from "@mui/material/colors";
import { OvertimeInterface } from "../../models/IOvertiome";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import moment from "moment";

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

function OvertimeShow() {

  const [overtimes, setOvertimes] = React.useState<OvertimeInterface[]>([]);


  const getOvertimes = async () => {

    const apiUrl = "http://localhost:8080/overtimes";

    const requestOptions = {

      method: "GET",

      headers: { Authorization: `Bearer ${localStorage.getItem("token")}`, "Content-Type": "application/json" },

    };


    fetch(apiUrl, requestOptions)

      .then((response) => response.json())

      .then((res) => {

        console.log(res.data);

        if (res.data) {

          setOvertimes(res.data);

        }

      });

  };

  useEffect(() => {

    getOvertimes();

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
              <Typography // ตารางเวลา
                component="h1"
                variant="h6"
                color="inherit"
                gutterBottom
              >

                ข้อมูลล่วงเวลางานของแพทย์

              </Typography>

            </Box>

            <Box>

              <Button //ตัวบันทึก
                component={RouterLink} //ลิ้งหน้าต่อไป
                to="/Overtime"
                variant="contained"
                color="primary"
              >
                <Typography
                  color="secondary"
                  component="div"
                  sx={{ flexGrow: 1 }}
                >
                  บันทึกข้อมูลล่วงเวลางาน

                </Typography>
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
                        <TableCell align="center" width="20%"> ชื่อ-นามสกุล </TableCell>
                        <TableCell align="center" width="20%"> กิจกรรมที่ทำ </TableCell>
                        <TableCell align="center" width="20%"> สถานที่ทำงาน </TableCell>
                        <TableCell align="center" width="20%"> จำนวนชั่วโมงที่ทำ </TableCell>
                        <TableCell align="center" width="20%"> วันที่และเวลา </TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {overtimes.map((item: OvertimeInterface) => (
                        <TableRow key={item.ID}>
                          <TableCell align="center">{item.ID}</TableCell>
                          <TableCell align="center">{item.Doctor?.Name}</TableCell>
                          <TableCell align="center">{item.Activity?.Name}</TableCell>
                          <TableCell align="center">{item.Locationwork?.Name}</TableCell>
                          <TableCell align="center">{item.Num}</TableCell>
                          <TableCell align="center">{moment(item.Time).format("DD/MM/YYYY HH:mm:ss A")}</TableCell>
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

export default OvertimeShow;