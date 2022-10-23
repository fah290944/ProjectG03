import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Snackbar from "@mui/material/Snackbar";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

// assige type

// service
// import { GetAdminByID } from "../service/HttpClientService";
import { AdminsInterface, DoctorsInterface, MedicalFieldsInterface, WorkPlacesInterface } from "../../models/IManage";


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function DoctorCreate() {
  // เอาไว้เก็บค่าวันที่และเวลา
  const [dateBirth, setDateBirth] = React.useState<Date | null>(new Date());
  const [dateStart, setDateStart] = React.useState<Date | null>(new Date());
  // ตารางหลัก
  const [doctor, setDoctor] = React.useState<Partial<DoctorsInterface>>({});
  // ประกาศแบบ Array เตรียม ComboBox
  const [admin, setAdmin] = React.useState<Partial<AdminsInterface>>({ Aname: "" });
  const [medicalfield, setMedicalField] = React.useState<MedicalFieldsInterface[]>([]);
  const [workplace, setWorkPlace] = React.useState<WorkPlacesInterface[]>([]);
  // เอ่ไว้ใช้เพื่อ เช็คค่า
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);

  // แสดงใน console f12/console
  const [user, setUser] = React.useState<AdminsInterface>();

  console.log(doctor);

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
    const id = event.target.id as keyof typeof DoctorCreate;
    const { value } = event.target;
    setDoctor({ ...doctor, [id]: value });
  };

  const handleChange = (
    event: SelectChangeEvent<number>
  ) => {
    const name = event.target.name as keyof typeof doctor;
    setDoctor({
      ...doctor,
      [name]: event.target.value
    });
  };

  const [value, setValue] = React.useState('Female');

  const handleChangeRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
    const id = event.target.id as keyof typeof DoctorCreate;
    setDoctor({ ...doctor, [id]: value });
  };


    function submit() {
      let data = {
        PersonalID: typeof doctor.PersonalID === "string" ? parseInt(doctor.PersonalID) : 0,
        Name: doctor.Name ?? "",
        Position: doctor.Position ?? "",
        Salary: typeof doctor.Salary === "string" ? parseInt(doctor.Salary) : 0,
        Tel: doctor.Tel ?? "",
        Gender: doctor.Gender ?? "",
        DateOfBirth: dateBirth,
        YearOfStart: dateStart,
        Address: doctor.Address ?? "",
        AdminID: user?.ID ?? "",
        WorkPlaceID: typeof doctor.WorkPlaceID === "string" ? parseInt(doctor.WorkPlaceID) : 0,
        MedicalFieldID: typeof doctor.MedicalFieldID === "string" ? parseInt(doctor.MedicalFieldID) : 0,
        Email: doctor.Email ?? "",
        Password: doctor.Password ?? "",
        Signin:{
          Username: doctor.Email ?? "",
          Password: doctor.Password ?? "",
        }
     
      };

      // fetch POST
      const requestOptions = {
        method: "POST",
        headers: {Authorization: `Bearer ${localStorage.getItem("token")}`, "Content-Type": "application/json" },
        body: JSON.stringify(data),
      };
      fetch(`${apiUrl}/doctors`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
          if (res.data) {
            setSuccess(true);
          } else {
            setError(true);
          }
        });
    }

    // fetch GET
    // apiUrl + /หน้าเว็บต่างๆ เพื่อสั้นต่อการเขียน code
    const requestOptions = {
      headers: {Authorization: `Bearer ${localStorage.getItem("token")}`, "Content-Type": "application/json"},
    };
    const apiUrl = "http://localhost:8080";
    const fetchAdmins = async () => {
      fetch(`${apiUrl}/admins`,requestOptions)
        .then(response => response.json())
        .then(res => {
          setAdmin(res.data);
        })
    }
    const fetchMedicalFields = async () => {
      fetch(`${apiUrl}/medicalfields`,requestOptions)
        .then(response => response.json())
        .then(res => {
          setMedicalField(res.data);
        })
    }
    const fetchWorkPlaces = async () => {
      fetch(`${apiUrl}/workplaces`,requestOptions)
        .then(response => response.json())
        .then(res => {
          setWorkPlace(res.data);
        })
    }
    // const fetchAdminByID = async () => {
    //   let res = await GetAdminByID();
    //   doctor.AdminID = res.ID;
    //   if (res) {
    //     setAdmin(res);
    //   }
    // };

    // เพื่อเอา api มาใช้งาน
    useEffect(() => {
      const getToken = localStorage.getItem("token");
      if (getToken) {
          setUser(JSON.parse(localStorage.getItem("user") || ""));
      }
      fetchAdmins();
      fetchMedicalFields();
      fetchWorkPlaces();
      // fetchAdminByID();
    }, []);

    // html หน้าเว็บ
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

        <Snackbar
          open={error}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="error">
            บันทึกข้อมูลไม่สำเร็จ
          </Alert>
        </Snackbar>

        <Paper>
          {/* ไม่ให้ล้น navbar ขึ้นมา*/}
          <Divider />
          <Grid container spacing={1} sx={{ padding: 3 }}>
            <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
                <FormLabel>Personal ID</FormLabel>
                <TextField
                  id="PersonalID"
                  variant="outlined"
                  type="number"
                  size="medium"
                  InputProps={{ inputProps: { max: 9999999999999, min: 1111111111111 } }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={doctor.PersonalID || ""}
                  onChange={handleInputChange}
                />
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
                <FormLabel>Name</FormLabel>
                <TextField
                  id="Name"
                  variant="outlined"
                  type="string"
                  size="medium"
                  value={doctor.Name || ""}
                  onChange={handleInputChange}
                />
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
                <FormLabel>Position</FormLabel>
                <TextField
                  id="Position"
                  variant="outlined"
                  type="string"
                  size="medium"
                  value={doctor.Position || ""}
                  onChange={handleInputChange}
                />
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
                <FormLabel>Salary</FormLabel>
                <TextField
                  id="Salary"
                  variant="outlined"
                  type="number"
                  size="medium"
                  InputProps={{ inputProps: { max: 150000, min: 15000 } }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={doctor.Salary || ""}
                  onChange={handleInputChange}
                />
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
                <FormLabel>E-mail</FormLabel>
                <TextField
                  id="Email"
                  variant="outlined"
                  type="string"
                  size="medium"
                  value={doctor.Email || ""}
                  onChange={handleInputChange}
                />
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
                <FormLabel>Password</FormLabel>
                <TextField
                  id="Password"
                  variant="outlined"
                  type="string"
                  size="medium"
                  value={doctor.Password || ""}
                  onChange={handleInputChange}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <FormLabel>Address</FormLabel>
                <TextField
                  id="Address"
                  variant="outlined"
                  type="string"
                  size="medium"
                  value={doctor.Address || ""}
                  onChange={handleInputChange}
                />
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
                <FormLabel>Tel</FormLabel>
                <TextField
                  id="Tel"
                  variant="outlined"
                  type="string"
                  size="medium"
                  value={doctor.Tel || ""}
                  onChange={handleInputChange}
                />
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl>
                <FormLabel>Gender</FormLabel>
                <RadioGroup
                  row
                  value={value}
                  onChange={handleChangeRadio}
                >
                  {/* สลับ */}
                  <FormControlLabel value="Female" control={
                    <Radio inputProps={{ id: 'Gender' }} />}
                    label="Male" />
                  <FormControlLabel value="Male" control={
                    <Radio inputProps={{ id: 'Gender' }} />}
                    label="Female" />
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
                <FormLabel>Date of Birth</FormLabel>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    value={dateBirth}
                    onChange={setDateBirth}
                  />
                </LocalizationProvider>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
                <FormLabel>Year of Start</FormLabel>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    value={dateStart}
                    onChange={setDateStart}
                  />
                </LocalizationProvider>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormLabel>Medical Field</FormLabel>
              <FormControl fullWidth variant="outlined">
                <Select
                  native
                  value={doctor.MedicalFieldID}
                  onChange={handleChange}
                  inputProps={{
                    name: "MedicalFieldID",
                  }}
                >
                  <option aria-label="None" value="">
                    Choose Medical Field
                  </option>
                  {medicalfield.map((item: MedicalFieldsInterface) => (
                    <option value={item.ID}>{item.Bname}</option>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormLabel>Work Place</FormLabel>
              <FormControl fullWidth variant="outlined">
                <Select
                  native
                  value={doctor.WorkPlaceID}
                  onChange={handleChange}
                  inputProps={{
                    name: "WorkPlaceID",
                  }}
                >
                  <option aria-label="None" value="">
                    Choose Work Place
                  </option>
                  {workplace.map((item: WorkPlacesInterface) => (
                    <option value={item.ID}>{item.Pname}</option>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormLabel>Admin</FormLabel>
              <FormControl fullWidth variant="outlined">
                <TextField
                  fullWidth
                  disabled
                  id="AdminID"
                  value={user?.Aname}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Button
                component={RouterLink}
                to="/DoctorShow"
                variant="contained"
              >
                Back
              </Button>

              <Button
                style={{ float: "right" }}
                onClick={submit}
                variant="contained"
                color="primary"
              >
                SAVE DATA
              </Button>
            </Grid>

          </Grid>
        </Paper>
      </Container>
    );
  }

  export default DoctorCreate;