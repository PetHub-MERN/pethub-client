import { Box, Paper, Typography } from "@mui/material";
import { LinkedIn, GitHub } from "@mui/icons-material";
import { useTheme } from "@emotion/react";

function Footer({ toggleDark }) {

    const theme = useTheme();

    return(
        <Paper sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "10vh",
            boxShadow: "0px -1px 9px 0px rgba(77,77,77,1)",
            backgroundColor: toggleDark ? '#272727' : `${theme.palette.primary.main}`
        }}>
            <Box my={0.5} mx={2}>
                <Typography variant="h6" sx={{fontSize: "1rem"}}>Cristian Palao</Typography>
                <a href="https://www.linkedin.com/in/cristian-pc/" rel="noreferrer" target="_blank"><LinkedIn fontSize="medium"/></a>
                <a href="https://github.com/Dookietrukie" rel="noreferrer" target="_blank"><GitHub fontSize="medium"/></a>
            </Box>
            
            <Box my={0.5} mx={2}>
                <Typography variant="h6" sx={{fontSize: "1rem"}}>Ismael Freitas</Typography>
                <a href="https://www.linkedin.com/in/ismael-freitas-6366891b8/" rel="noreferrer" target="_blank"><LinkedIn fontSize="medium"/></a>
                <a href="https://github.com/IsmaelFreitas98" rel="noreferrer" target="_blank"><GitHub fontSize="medium"/></a>
            </Box>
        </Paper>
    );
    
}

export default Footer;