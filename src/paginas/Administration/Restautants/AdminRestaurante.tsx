import http from "../../../http";
import { Link } from "react-router-dom";
import {
  Table,
  Button,
  TableBody,
  TableRow,
  Paper,
  TableContainer,
  TableHead,
  TableCell,
} from "@mui/material";
import { useState, useEffect } from "react";
import NavBar from "../../../componentes/NavBar";
import IRestaurante from "../../../interfaces/IRestaurante";

const AdminRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

  const excluir = (restauranteAExcluir: IRestaurante) => {
    http.delete(`restaurantes/${restauranteAExcluir.id}/`).then(() => {
      const ListaRestaurantes = restaurantes.filter(
        restaurante => restaurante.id !== restauranteAExcluir.id
      );
      setRestaurantes(ListaRestaurantes);
    });
  };
  useEffect(() => {
    http
      .get<IRestaurante[]>("restaurantes/")
      .then(res => setRestaurantes(res.data));
  }, []);

  return (
    <>
      <NavBar />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Editar</TableCell>
              <TableCell>Excluir</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {restaurantes.map(restaurante => (
              <TableRow key={restaurante.id}>
                <TableCell>{restaurante.nome}</TableCell>
                <TableCell>
                  [
                  <Link to={`/admin/restaurantes/${restaurante.id}`}>
                    Editar
                  </Link>
                  ]
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => excluir(restaurante)}
                  >
                    Excluir
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
export default AdminRestaurantes;
