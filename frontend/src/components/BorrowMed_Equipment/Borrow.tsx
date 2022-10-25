import React, { useEffect } from "react";

import { Link as RouterLink } from "react-router-dom";

import Typography from "@mui/material/Typography";

import Button from "@mui/material/Button";

import Container from "@mui/material/Container";

import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { green } from "@mui/material/colors";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import moment from "moment";
import { BorrowInterface } from "../../models/IBorrow";
import { DoctorInterface } from "../../models/ISchedule";

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

function Borrow() {
  // const classes = useStyles();
  const [borrow, setBorrow] = React.useState<BorrowInterface[]>([]);
  const [user, setUser] = React.useState<DoctorInterface>();
 
  const getBorrow = async () => {
    const apiUrl = "http://localhost:8080/borrows";

    const requestOptions = {
      method: "GET",

      headers: {Authorization: `Bearer ${localStorage.getItem("token")}`,"Content-Type": "application/json" },
    };

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())

      .then((res) => {
        console.log(res.data);

        if (res.data) {
          setBorrow(res.data);
        }
      });
  };
  console.log(borrow)
  
  useEffect(() => {
    const getToken = localStorage.getItem("token");
        if (getToken) {
            setUser(JSON.parse(localStorage.getItem("user") || ""));
        }
    getBorrow();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div>
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
                ยืมเครื่องมือแพทย์
              </Typography>
            </Box>

            <Box>
              <Button //ตัวบันทึก
                component={RouterLink} //ลิ้งหน้าต่อไป
                to="/Borrow"
                variant="contained"
                color="primary"
              >
                <Typography
                  color="secondary"
                  component="div"
                  sx={{ flexGrow: 1 }}
                >
                  บันทึกข้อมูลตารางเวลาแพทย์
                </Typography>
              </Button>
            </Box>
          </Box>

          <div style={{ height: 400, width: "100%", marginTop: "20px" }}>
            <TableContainer >
              <Table aria-label="simple table">
                <TableHead>
                  {/* หัวข้อตาราง */}
                  <TableRow>
                    <TableCell align="center" width="20%">
                      ID
                    </TableCell>

                    <TableCell align="center" width="20%">
                      Name
                    </TableCell>

                    <TableCell align="center" width="20%">
                      WorkPlace
                    </TableCell>

                    <TableCell align="center" width="20%">
                      MedicalEquipment
                    </TableCell>

                    <TableCell align="center" width="20%">
                      BorrowDate
                    </TableCell>

                    <TableCell align="center" width="20%">
                      ReturnDate
                    </TableCell>

                    <TableCell align="center" width="20%">
                      Quant
                    </TableCell>
                  </TableRow>
                </TableHead>
                {/* ดึงช้อมูล */}
                <TableBody>
                  {borrow.map((item: BorrowInterface) => (
                    <TableRow key={item.ID}>
                      <TableCell align="center">{item.ID}</TableCell>

                      <TableCell align="center">{item.Doctor?.Name}</TableCell>

                      <TableCell align="center">{item.Worklocation?.Name}</TableCell>

                      <TableCell align="center">{item.MedicalEquipment?.Name}</TableCell>

                      <TableCell align="center">{moment(item.BorrowDate).format("DD/MM/YYYY HH:mm:ss A")}</TableCell>

                      <TableCell align="center">{moment(item.ReturnDate).format("DD/MM/YYYY HH:mm:ss A")}</TableCell>

                      <TableCell align="center">{item.Quant}</TableCell>

                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default Borrow;