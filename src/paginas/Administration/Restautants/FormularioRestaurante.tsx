import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Paper,
  Container,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";
import IRestaurante from "../../../interfaces/IRestaurante";
import http from "../../../http";

const FormularioRestaurante = () => {
  const parametros = useParams();

  useEffect(() => {
    if (parametros.id) {
      http
        .get<IRestaurante>(`restaurantes/${parametros.id}/`)
        .then(res => setNomeRestaurante(res.data.nome));
    }
  }, [parametros]);

  const [nomeRestaurante, setNomeRestaurante] = useState("");
  const alSubmit = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    if (parametros.id) {
      http
        .put(`restaurantes/${parametros.id}/`, {
          nome: nomeRestaurante,
        })
        .then(() => {
          alert("actualizado con suceso");
        });
    } else {
      http
        .post("restaurantes/", {
          nome: nomeRestaurante,
        })
        .then(() => {
          alert("cadastrado");
        });
    }
  };
  return (
    <>
      
      <Box>
        <Container maxWidth="lg" sx={{ mt: 1 }}>
          <Paper sx={{ p: 2 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "6rem",
              }}
            >
              <Typography component="h1" variant="h6">
                Formulario de Restaurantes
              </Typography>
              <Box component="form" sx={{ width: "100%" }} onSubmit={alSubmit}>
                <TextField
                  value={nomeRestaurante}
                  onChange={e => setNomeRestaurante(e.target.value)}
                  id="standard-basic"
                  label="Standard"
                  variant="standard"
                  fullWidth
                  required
                />
                <Box sx={{ marginTop: 1 }}>
                  <Button fullWidth type={"submit"} variant="outlined">
                    Cadastro
                  </Button>
                  <Button fullWidth type={"submit"} variant="outlined">
                    <a href="/">Home</a>
                  </Button>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default FormularioRestaurante;
