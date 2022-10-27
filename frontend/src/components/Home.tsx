import * as React from 'react';
import { Box } from "@mui/system";
import bg from "../assets/bg.png"

function Home() {
    return (
        <div>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "88vh",
                    overflow: "hidden",
                    backgroundSize: "cover",
                    backgroundImage: `url(${bg})`,
                }}
            >
            </Box>
        </div>
    );
}

export default Home;