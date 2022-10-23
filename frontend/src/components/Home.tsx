import * as React from 'react';
import { createStyles, makeStyles, Theme } from "@mui/material/styles";
import Container from "@mui/material/Container";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(2),
    },
    table: {
      minWidth: 650,
    },
    tableSpace: {
      marginTop: 20,
    },
  })
);

function Home() {

  return (
    <div>
      <Container  maxWidth="md">
        <h1 style={{ textAlign: "center" }}>ระบบบันทึกการเข้าชมวีดีโอ</h1>
       
        <p>
          ระบบข้อมูลแพทย์
         
        </p>
      </Container>
    </div>
  );
}
export default Home;