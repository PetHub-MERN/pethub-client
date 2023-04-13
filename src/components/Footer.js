import { Box, Typography } from "@mui/material";
import { LinkedIn, GitHub } from "@mui/icons-material";
import { useTheme } from "@emotion/react";

function Footer() {

    const theme = useTheme();

    return(
        <Box sx={{
            display: "flex",
            justifyContent: "center",
            bgcolor: theme.palette.primary.main,
        }}>
            <Box my={0.5} mx={2}>
                <Typography variant="h6">Cristian Palao</Typography>
                <a href="https://www.linkedin.com/in/cristian-pc/" rel="noreferrer" target="_blank"><LinkedIn fontSize="large"/></a>
                <a href="https://github.com/Dookietrukie" rel="noreferrer" target="_blank"><GitHub fontSize="large"/></a>
            </Box>
            
            <Box my={0.5} mx={2}>
                <Typography variant="h6">Ismael Freitas</Typography>
                <a href="https://www.linkedin.com/in/ismael-freitas-6366891b8/" rel="noreferrer" target="_blank"><LinkedIn fontSize="large"/></a>
                <a href="https://github.com/IsmaelFreitas98" rel="noreferrer" target="_blank"><GitHub fontSize="large"/></a>
            </Box>
        </Box>
    );
    
}

export default Footer;