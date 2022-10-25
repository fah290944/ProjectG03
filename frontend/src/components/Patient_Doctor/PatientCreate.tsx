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
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import MenuItem from "@mui/material/MenuItem";
//สี
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { green } from '@mui/material/colors';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AccountBoxTwoToneIcon from '@mui/icons-material/AccountBoxTwoTone';
import { DoctorInterface } from "../../models/ISchedule";
import { PatientsInterface, PatientTypeInterface, SymptomsInterface } from "../../models/IPatient";
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


function PatientsCreate() {

  

  const [time, setTime] = React.useState<Date | null>(
    new Date()
  );
  const [patienttype, setPatienttype] = React.useState<PatientTypeInterface[]>([]);
  const [symptoms, setSymptoms] = React.useState<SymptomsInterface[]>([]);
  const [patients, setPatients] = React.useState<Partial<PatientsInterface>>({
    Age: 1,
    SymptomsID: 0,
    PatientTypeID: 0,
    DoctorID: 0,
  });
  const [doctor, setDoctor] = React.useState<DoctorInterface[]>([]);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [user, setUser] = React.useState<DoctorInterface>();

  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date()
  );

  const handleDateChange = (date: Date | null) => {
    setTime(date);
  };

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
  //_-------------ทำแบบนี้ไปก่อนนนนนนนนนนนนนนนนนนนนนนนนนนนนนนนนนนนนนนนนนนนนนนนนนนนนนนนนนนนน

  const getDoctor = async () => {
    const apiUrl = `http://localhost:8080/doctors`;

    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };

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


  // getSymptoms
  const getSymptoms = async () => {
    const apiUrl = `http://localhost:8080/symptoms`;

    const requestOptions = {
      method: "GET",

      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },

    };

    fetch(apiUrl, requestOptions)

      .then((response) => response.json())

      .then((res) => {
        console.log(res.data); //show ข้อมูล

        if (res.data) {
          setSymptoms(res.data);

        } else {
          console.log("else");
        }
      });
  };

  // getPatienttype
  const getPatienttype = async () => {

    const apiUrl = `http://localhost:8080/patient_types`;
    const requestOptions = {

      method: "GET",

      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },

    };

    fetch(apiUrl, requestOptions)

      .then((response) => response.json())
      .then((res) => {

        console.log(res.data); //show ข้อมูล
        if (res.data) {

          setPatienttype(res.data);

        } else {

          console.log("else");

        }

      });

  };


  const handleInputChange = (

    event: React.ChangeEvent<{ id?: string; value: any }>

  ) => {

    const id = event.target.id as keyof typeof PatientsCreate;

    const { value } = event.target;

    setPatients({ ...patients, [id]: value });

  };


  const handleInputChangenumber = (

    event: React.ChangeEvent<{ id?: string; value: any }>

  ) => {

    const id = event.target.id as keyof typeof patients;

    const { value } = event.target;

    setPatients({ ...patients, [id]: value  === "" ? "" : Number(value)  });

  };


  function submit() {
    let data = {
      DoctorID: user?.ID,
      PatientTypeID: patients?.PatientTypeID,
      SymptomsID: patients?.SymptomsID,   
      PatientsName: patients?.PatientsName,
      DateAdmit: time,
      Age: typeof patients?.Age === "string" ? (patients?.Age === "" ? 0 : patients?.Age) : patients?.Age,

    };


    const apiUrl = "http://localhost:8080/cpatients";

    const requestOptions = {

      method: "POST",

      headers: { Authorization: `Bearer ${localStorage.getItem("token")}`,"Content-Type": "application/json" },

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

  console.log(patients)
  useEffect(() => {
    const getToken = localStorage.getItem("token");
    if (getToken) {
        setUser(JSON.parse(localStorage.getItem("user") || ""));
    }
    getPatienttype();
    getSymptoms();
    getDoctor();
  }, []);

  const handleChange = (
    event: SelectChangeEvent<number>
  ) => {
    const name = event.target.name as keyof typeof patients;
    setPatients({
      ...patients,
      [name]: event.target.value,
    });
  };

  // reset ข้อมูล
  function handleCancer(){
   setPatients({
      Age: 1,
      SymptomsID: 0,
      PatientTypeID: 0,
      DoctorID: 0,
    });
  };
  

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
        {/* ---------------------------------------------------------------------------------------------------- */}
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

              color="primary"

              gutterBottom

            >

              บันทึกข้อมูลผู้ป่วย

            </Typography>

          </Box>

        </Box>
        {/* ------------------------------------------------------------------------------------------------------- */}
        <Divider />
        <Grid container spacing={2}>
        <Grid item xs={8}>
        <Grid container spacing={3} sx={{ padding: 2 }}>

          <Grid item xs={6}>

            <p>ชื่อ-นามสกุลผู้ป่วย</p>

            <FormControl fullWidth variant="outlined">

              <TextField

                id="PatientsName"

                variant="outlined"

                type="string"

                size="medium"

                value={patients?.PatientsName || ""}

                onChange={handleInputChange}

              />

            </FormControl>

          </Grid>


          {/* ------------------------------------แพทย์--------------------------------------------------------------- */}
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
          {/* ---------------- อายุ-------------------------------------------- */}

          <Grid item xs={6}>

            <FormControl fullWidth variant="outlined">

              <p>อายุ</p>

              <TextField

                id="Age"

                variant="outlined"

                type="number"

                size="medium"

                InputProps={{ name: "MinPrice"}}

                InputLabelProps={{

                  shrink: true,

                }}

                value={patients?.Age}

                onChange={handleInputChangenumber}

              />

            </FormControl>

          </Grid>
          
          {/* ---------------- ประเภท-------------------------------------------- */}
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>ประเภทผู้ป่วย</p>
              <Select
                
                value={patients?.PatientTypeID}
                onChange={handleChange}
                inputProps={{
                  name: "PatientTypeID",
                }}
              >
                <MenuItem aria-label="None" value={0} key={0}>
                  กรุณาเลือกประเภทผู้ป่วย
                </MenuItem>
                {patienttype.map((item: PatientTypeInterface) => (
                  <MenuItem value={item.ID}>
                    {item.Type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* ---------------- โรค-------------------------------------------- */}
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>โรคที่กำลังรักษา</p>
              <Select
                
                value={patients?.SymptomsID}
                onChange={handleChange}
                inputProps={{
                  name: "SymptomsID",
                }}
              >
                <MenuItem aria-label="None" value={0} key={0}>
                  กรุณาเลือกโรค
                </MenuItem>
                {symptoms.map((item: SymptomsInterface) => (
                  <MenuItem value={item.ID}>
                    {item.SymptomsName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* ---------------- วันที่-------------------------------------------- */}
          <Grid item xs={6}>

            <FormControl fullWidth variant="outlined">

              <p>วันที่เข้ารักษา</p>

              <LocalizationProvider dateAdapter={AdapterDateFns}>

                <DateTimePicker

                  renderInput={(props) => <TextField {...props} />}

                  label="Time"

                  value={time}

                  onChange={setSelectedDate}
                />

              </LocalizationProvider>

            </FormControl>

          </Grid>

          </Grid>
          </Grid>

          {/* ---------------- -------------------------------------------- */}
          <Grid item xs={4}>
          <Grid container spacing={1}  >
          <Grid item xs={12} >
          <AccountBoxTwoToneIcon style={{color: "#a5d6a7" , fontSize: '200px',marginLeft:35,}}/>
          <Typography  
             variant="h5"
             style={{color: "green",marginLeft:80,}}
             gutterBottom>PATIENTS</Typography>
          </Grid>
          <Grid item xs={12}>
            <Button
              style={{marginLeft:50,marginTop:10,width:170,}}
              onClick={submit}
              variant="contained"

              color="primary"
            >
            <Typography
             color="secondary"
           >
              Save
            </Typography>
            </Button>
            </Grid>  

            <Grid item xs={12}>
            <Button 
            style={{marginLeft:50,marginTop:20,width:170}}
            component={RouterLink} to="/PatientShow" variant="contained"
            onClick = {handleCancer}
            >
            <Typography
             color="secondary"
           >
              BACK
              </Typography>
            </Button>
            </Grid>
            

            </Grid>
          </Grid>
        

        </Grid>
      </Paper>

    </Container>
    </ThemeProvider>
  );

}


export default PatientsCreate;