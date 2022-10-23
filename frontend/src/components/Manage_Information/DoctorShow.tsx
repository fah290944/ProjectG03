import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { DoctorsInterface } from "../../models/IManage";

function Doctors() {
  const [doctors, setDoctors] = React.useState<DoctorsInterface[]>([]);
  const getDoctors = async () => {
    const apiUrl = "http://localhost:8080/doctors";
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
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

  const columns: GridColDef[] = [

    { field: "ID", headerName: "ID", width: 10 },
    { field: "PersonalID", headerName: "Personal ID", width: 130 },
    { field: "Name", headerName: "Name", width: 170 },
    { field: "Position", headerName: "Position", width: 125 },
    { field: "Email", headerName: "Email", width: 170 },
    { field: "Password", headerName: "Password", width: 125 },
    { field: "Salary", headerName: "Salary", width: 60 },
    { field: "Tel", headerName: "Tel", width: 100 },
    { field: "Gender", headerName: "Gender", width: 70 },
    { field: "DateOfBirth", headerName: "Date Of Birth", width: 205 },
    { field: "YearOfStart", headerName: "Year Of Start", width: 205 },
    { field: "Address", headerName: "Address", width: 400 },
    { field: "AdminID", headerName: "Admin ID", width: 80 },
    { field: "MedicalFieldID", headerName: "Medical Field ID", width: 120 },
    { field: "WorkPlaceID", headerName: "Work Place ID", width: 110 },

  ];

  useEffect(() => {
    getDoctors();
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
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              Doctors!
            </Typography>
          </Box>

          <Box>
            <Button
              component={RouterLink}
              to="/Doctor"
              variant="contained"
              color="primary"
            >
              Create Doctors
            </Button>
          </Box>
        </Box>
        <div style={{ height: 400, width: "100%", marginTop: '20px' }}>
          <DataGrid
            rows={doctors}
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

export default Doctors;