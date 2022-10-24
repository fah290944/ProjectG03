import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { green } from "@mui/material/colors";

import Select, { SelectChangeEvent } from "@mui/material/Select";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import MenuItem from '@mui/material/MenuItem';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers";
import FormLabel from "@mui/material/FormLabel";
import Borrow from "./Borrow";
import { BorrowInterface, MedicalEquimentInterface, WorklocationInterface } from "../../models/IBorrow";
import { DoctorInterface } from "../../models/ISchedule";
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
    },
  });
  
  //เด้งบันทึกสำเร็จ ไม่สำเร็จ
  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
  
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  
  function Borrowed() {
    //Partial คือเลือกค่า set ค่าได้เฉพาะตัวได้

    const [dateStop, setDateStop] = React.useState<Date | null>(new Date());
    const [dateStart, setDateStart] = React.useState<Date | null>(new Date());
  
    const [success, setSuccess] = React.useState(false);
  
    const [error, setError] = React.useState(false);
    const [borrow, setBorrow] = React.useState<Partial<BorrowInterface>>({
    });
    //เราส่งมาในรูปแบบอาเรย์ ทำการดึงข้อมูล
    const [worklocation, setWorklocation] = React.useState<WorklocationInterface[]>([]);
    const [medicalequipment, setMedicalEquipment] = React.useState<MedicalEquimentInterface[]>([]);
    const [doctor, setDoctor] = React.useState<DoctorInterface>();

    const [user, setUser] = React.useState<DoctorInterface>();

  
    const getWorkPlace = async () => {
      const apiUrl = `http://localhost:8080/worklocations`;
  
      const requestOptions = {
        method: "GET",
  
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}`, "Content-Type": "application/json" },
      };
      //การกระทำ //json
      fetch(apiUrl, requestOptions)
        .then((response) => response.json())
  
        .then((res) => {
          console.log(res.data); //show ข้อมูล
  
          if (res.data) {
            setWorklocation(res.data);
          } else {
            console.log("else");
          }
        });
    };
    //activity
    const getMedicalEquipments = async () => {
      const apiUrl = `http://localhost:8080/medicalEquipments`;
  
      const requestOptions = {
        method: "GET",
  
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}`, "Content-Type": "application/json" },
      };
      //การกระทำ
      fetch(apiUrl, requestOptions)
        .then((response) => response.json())
  
        .then((res) => {
          console.log(res.data);
  
          if (res.data) {
            setMedicalEquipment(res.data);
          } else {
            console.log("else");
          }
        });
    };
    //activity
  
    //เปิดปิดตัว Alert
    const handleClose = (
      event?: React.SyntheticEvent | Event,
  
      reason?: string
    ) => {
      if (reason === "clickaway") {
        return;
      }
  
      setSuccess(false);
      setError(false);
    };

    const getDoctor = async () => {
      const apiUrl = `http://localhost:8080/doctors`;
  
      const requestOptions = {
        method: "GET",
  
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, "Content-Type": "application/json"
        },
      };
      //การกระทำ //json
      fetch(apiUrl, requestOptions)
        .then((response) => response.json())
  
        .then((res) => {
          console.log(res.data); //show ข้อมูล
  
          if (res.data) {
            setDoctor(res.data);
          } else {
            console.log("else");
          }
        });
    };
  
    console.log(borrow);
  
    //ทุกครั้งที่พิมพ์จะทำงานเป็น state เหมาะสำหรับกับคีย์ textfield
    const handleInputChange = (
      event: React.ChangeEvent<{ id?: string; value: any }>
    ) => {
      const id = event.target.id as keyof typeof Borrowed;
  
      const { value } = event.target;
  
       setBorrow({ ...borrow, [id]: value });
    };
    
  // กดเลือกคอมโบไม่ได้
    const handleChange = (
      event: SelectChangeEvent<number>
    ) => {
      const name = event.target.name as keyof typeof borrow;
      setBorrow({
        ...borrow,
        [name]: event.target.value,
      });
    };
  
    // const handleChange = (event: SelectChangeEvent<{ name?: string; value: unknown }>) => {
    //   const name = event.target.name as keyof typeof schedule;
    //     setSchedule({
    //       ...schedule,
    //       [name]: event.target.value,
    //     });
    // };
  
    function submit() {
      let data = {
        //กับ คอน บรรทัด 48-50 แค่ข้างหน้า ชื่อต้องตรง!!!!!!!
        DoctorID:  user?.ID,
  
        WorklocationID:  borrow.WorklocationID,
  
        MedicalEquipmentID:  borrow.MedicalEquipmentID,

        BorrowDate: dateStart,

        ReturnDate: dateStop,
  
        Quant: typeof borrow.Quant === "string" ? parseInt(borrow.Quant) : 0,
      };
  
      console.log(data)
      const apiUrl = "http://localhost:8080/borrow";
  
      const requestOptions = {
        method: "POST",
  
        headers: 
        {  Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json" 
        },
  
        body: JSON.stringify(data),
        //แปลงข้อมูล
      };
  
      fetch(apiUrl, requestOptions)
        .then((response) => response.json())
  
        .then((res) => {
          if (res.data) {
            setSuccess(true);
          } else {
            setError(true);
          }
        });
    }
  
    useEffect(() => {
      const getToken = localStorage.getItem("token");
    if (getToken) {
        setUser(JSON.parse(localStorage.getItem("user") || ""));
    }
      //เอามาใช้ๆๆๆๆๆๆๆ*********
      getWorkPlace();
      getMedicalEquipments();
      getDoctor();
    }, []);
  
    return (
      <ThemeProvider theme={theme}>
        <Container maxWidth="md">
          <Snackbar
            open={success}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert onClose={handleClose} severity="success">
              บันทึกข้อมูลสำเร็จ
            </Alert>
          </Snackbar>
  
          <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
              บันทึกข้อมูลไม่สำเร็จ
            </Alert>
          </Snackbar>
  
          <Paper>
            <Box
              display="flex"
              sx={{
                marginTop: 2,
              }}
            >
              <Box sx={{ paddingX: 2, paddingY: 1 }}>
                <Typography
                  component="h2"
                  variant="h6"
                  color="inherit"
                  gutterBottom
                >
                  ยืมเครื่องมือแพทย์
                </Typography>
              </Box>
            </Box>
  
            <Divider />
  
            <Grid container spacing={3} sx={{ padding: 2 }}>
              <Grid item xs={6}>
                <p>เครื่องมือแพทย์</p>
  
                <FormControl fullWidth variant="outlined">
                  <Select
                    value = {borrow.MedicalEquipmentID}
                    onChange = {handleChange}
                    inputProps={{
                      name: "MedicalEquipmentID",
                    }}
                    // defaultValue={0}
                  >
                    <MenuItem value={0} key={0}>
                      ชื่อเครื่องมือ
                    </MenuItem>
                    {medicalequipment.map((item: MedicalEquimentInterface) => (
                      <MenuItem value={item.ID}>{item.Name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <p>สถานที่</p>
  
                <FormControl fullWidth variant="outlined">
                  <Select
                    value = {borrow.WorklocationID}
                    onChange = {handleChange}
                    inputProps={{
                      name: "WorklocationID",
                    }}
                    // defaultValue={0}
                  >
                    <MenuItem value={0} key={0}>
                      เลือกสถานที่
                    </MenuItem>
                    {worklocation.map((item:WorklocationInterface) => (
                      <MenuItem value={item.ID}>{item.Name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
              <p>จำนวน</p>
                <TextField
                  id="Quant"
                  variant="outlined"
                  type="number"
                  size="medium"
                  InputProps={{ inputProps: { max: 9999999999999, min: 1111111111111 } }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={borrow.Quant || ""}
                  onChange={handleInputChange}
                />
              </FormControl>
            </Grid>
  
              {/* //วันที่และเวลา */}
              <Grid item xs={7}>
                <FormControl fullWidth variant="outlined">
                  <p>วันที่ยืม</p>
  
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      renderInput={(props) => <TextField {...props} />}
                      label="กรุณาเลือกวันและเวลา"
                      value={dateStart} //แก้
                      // onChange={(newValue) => {
                      // setDate(newValue);
  
                      // }}
                      onChange={setDateStart}
                    />
                  </LocalizationProvider>
                </FormControl>
              </Grid>

              {/* //วันที่และเวลา */}
              <Grid item xs={7}>
                <FormControl fullWidth variant="outlined">
                  <p>วันที่คืน</p>
  
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      renderInput={(props) => <TextField {...props} />}
                      label="กรุณาเลือกวันและเวลา"
                      value={dateStop} //แก้
                      // onChange={(newValue) => {
                      // setDate(newValue);
  
                      // }}
                      onChange={setDateStop}
                    />
                  </LocalizationProvider>
                </FormControl>
              </Grid>
  
              <Grid item xs={12}>
                <Button component={RouterLink} to="/Borrowshow" variant="contained">
                  <Typography
                    color="secondary"
                    component="div"
                    sx={{ flexGrow: 1 }}
                  >
                    ย้อนกลับ
                  </Typography>
                </Button>
  
                <Button
                  style={{ float: "right" }}
                  onClick={submit}
                  variant="contained"
                  color="primary"
                >
                  <Typography
                    color="secondary"
                    component="div"
                    sx={{ flexGrow: 1 }}
                  >
                    บันทึกตารางเวลาแพทย์
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </ThemeProvider>
    );
  }
  
  export default Borrowed;