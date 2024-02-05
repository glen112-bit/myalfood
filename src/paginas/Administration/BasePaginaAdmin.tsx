import {
  Paper,
  Container,
  Toolbar,
  AppBar,
  Button,
  Typography,
  Box,
  Link,
} from "@mui/material";
import { Outlet } from "react-router-dom";
import { Link as RouterLink } from 'react-router-dom';

const BasePaginaAdmin = () => {
  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar>
            <Typography variant="h6">Administration</Typography>
            <Box sx={{ display: "flex", flexGrow: 1 }}>
              <Link component={RouterLink} to='restaurantes'>
                <Button sx={{ my: 2, color: "white" }}> Restaurantes</Button>
              </Link>
              <Link component={RouterLink} to='restaurantes/novo'>
                <Button sx={{ my: 2, color: "white" }}>
                  Nuevo Restaurante
                </Button>
              </Link>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box>
        <Container maxWidth="lg" sx={{ mt: 1 }}>
          <Paper sx={{ p: 2 }}>
            {/*contenido*/}
            <Outlet />
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default BasePaginaAdmin;
