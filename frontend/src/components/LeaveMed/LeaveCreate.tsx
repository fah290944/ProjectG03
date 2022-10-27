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

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { green } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { EvidenceInterface, LeaveInterface, TypeInterface } from "../../models/ILeave";
import { DoctorInterface } from "../../models/ISchedule";

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


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(

  props,

  ref

) {

  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;

});


function LeaveCreate() {
    //Partial คือเลือกค่า แล้ว set ค่าได้เฉพาะตัวได้
  const [Fdate, setFdate] = React.useState<Date | null>(null);

  const [Ldate, setLdate] = React.useState<Date | null>(null);

  const [leave, setLeave] = React.useState<Partial<LeaveInterface>>({});

  const [doctor, setDoctor] = React.useState<Partial<DoctorInterface>>();

  const [type, setType] = React.useState<TypeInterface[]>([]);

  const [evidence, setEvidence] = React.useState<EvidenceInterface[]>([]);

  const [success, setSuccess] = React.useState(false);

  const [error, setError] = React.useState(false);

  const [user, setUser] = React.useState<DoctorInterface>();

  console.log(leave);

  // combobox
  const handleChange = (
    event: SelectChangeEvent<number>
  ) => {
    const name = event.target.name as keyof typeof leave;
    setLeave({
      ...leave,
      [name]: event.target.value,
    });
  };

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


  const handleInputChange = (

    event: React.ChangeEvent<{ id?: string; value: any }>

  ) => {

    const id = event.target.id as keyof typeof LeaveCreate;

    const { value } = event.target;

    setLeave({ ...leave, [id]: value });

  };


  function submit() {

    let data = {

      Reason: leave.Reason ?? "",

      DoctorID:  user?.ID,

      TypeID:typeof leave.TypeID === "string" ? parseInt(leave.TypeID) : 0,

      EvidenceID:typeof leave.EvidenceID === "string" ? parseInt(leave.EvidenceID) : 0,

      Fdate: Fdate,

      Ldate: Ldate,

    };


    const apiUrl = "http://localhost:8080/leave";

    const requestOptions = {

      method: "POST",

      headers: { Authorization: `Bearer ${localStorage.getItem("token")}`, "Content-Type": "application/json" },

      body: JSON.stringify(data),

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
  const requestOptions = {
    headers: {Authorization: `Bearer ${localStorage.getItem("token")}`, "Content-Type": "application/json"},
  };
  const apiUrl = "http://localhost:8080";
  const fetchDoctor = async () => {
    fetch(`${apiUrl}/doctors`,requestOptions)
      .then(response => response.json())
      .then(res => {
        setDoctor(res.data);
      })
  }
  const fetchType = async () => {
    fetch(`${apiUrl}/types`,requestOptions)
      .then(response => response.json())
      .then(res => {
        setType(res.data);
      })
  }
  const fetchEvidence = async () => {
    fetch(`${apiUrl}/evidences`,requestOptions)
      .then(response => response.json())
      .then(res => {
        setEvidence(res.data);
      })
  }

  useEffect(() => {
    const getToken = localStorage.getItem("token");
    if (getToken) {
        setUser(JSON.parse(localStorage.getItem("user") || ""));
    }
    fetchDoctor();
    fetchType();
    fetchEvidence();
  }, []);

  return (

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

          <Box sx={{ paddingX: 35, paddingY: 1 }}>
            <ThemeProvider theme={theme}>
              <Typography

                component="h2"

                variant="h6"

                color="primary"

                gutterBottom

              >

                แบบฟอร์มยื่นขอลาหยุดพักงาน

              </Typography>
            </ThemeProvider>
          </Box>

        </Box>

        <Divider />

        <Grid container spacing={3} sx={{ padding: 2 }}>
          {/* ของหมอ */}
          <Grid item xs={6}>
              <p>แพทย์</p>
              <FormControl fullWidth variant="outlined">
                <TextField
                  fullWidth
                  disabled
                  id="DoctorID"
                  value={user?.Name}
                />
              </FormControl>
            </Grid>
            
            <Grid item xs={6}></Grid>

          {/* ประเภทการลา */}
          <Grid item xs={6}>
            <p>ประเภทการลา</p>

            <FormControl fullWidth variant="outlined">
              <Select
              native
                value={leave.TypeID}
                onChange={handleChange}
                inputProps={{
                  name: "TypeID",
                }}

              >
                  <option aria-label="None" value="">
                    กรุณาเลือกประเภทการลา
                  </option>
                {type.map((item: TypeInterface) => (
                  <option value={item.ID}>{item.Tleave}</option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* เหตุผล */}
          <Grid item xs={12}>

            <p>เหตุผล</p>

            <FormControl fullWidth variant="outlined">

              <TextField

                id="Reason"

                variant="outlined"

                type="string"

                size="medium"

                value={leave.Reason || ""}

                onChange={handleInputChange}

              />

            </FormControl>

          </Grid>

          {/* ลาก่อน */}
          <Grid item xs={6}>

            <FormControl fullWidth variant="outlined">

              <p>ลาตั้งแต่วันที่</p>

              <LocalizationProvider dateAdapter={AdapterDateFns}>

                <DatePicker

                  value={Fdate}

                  onChange={(newValue) => {

                    setFdate(newValue);

                  }}

                  renderInput={(params) => <TextField {...params} />}

                />

              </LocalizationProvider>

            </FormControl>

          </Grid>

          <Grid item xs={6}>

            <FormControl fullWidth variant="outlined">

              <p>ถึงวันที่</p>

              <LocalizationProvider dateAdapter={AdapterDateFns}>

                <DatePicker

                  value={Ldate}

                  onChange={(newValue) => {

                    setLdate(newValue);

                  }}

                  renderInput={(params) => <TextField {...params} />}

                />

              </LocalizationProvider>

            </FormControl>

          </Grid>

          <Grid item xs={6}>
            <p>หลักฐานการลา</p>

            <FormControl fullWidth variant="outlined">
              <Select
              native
                value={leave.EvidenceID}
                onChange={handleChange}
                inputProps={{
                  name: "EvidenceID",
                }}

              >
                <option aria-label="None" value="">
                  Choose Evidence Field
                </option>
                {evidence.map((item: EvidenceInterface) => (
                  <option value={item.ID}>{item.Etype}</option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <ThemeProvider theme={theme}>
              <Button component={RouterLink} to="/LeaveShow" variant="contained" color="primary">
                <Typography color="secondary">

                  Back

                </Typography>
              </Button>
            </ThemeProvider>

            <ThemeProvider theme={theme}>
              <Button

                style={{ float: "right" }}

                onClick={submit}

                variant="contained"

                color="primary"

              >
                <Typography color="secondary">

                  Submit

                </Typography>
              </Button>
            </ThemeProvider>

          </Grid>

        </Grid>

      </Paper>

    </Container>

  );

}


export default LeaveCreate;