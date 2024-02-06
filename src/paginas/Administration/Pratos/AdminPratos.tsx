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
import IPrato from "../../../interfaces/IPrato";

const AdminPratos = () => {
  const [pratos, setPratos] = useState<IPrato[]>([]);
  const [descricao, setDescricao] = useState<IPrato[]>([])
  const [tag, setTag] = useState<IPrato[]>([])
  const [imagem, setImagem] = useState<IPrato[]>([])

  const excluir = (pratoAExcluir: IPrato) => {
    http.delete(`pratos/${pratoAExcluir.id}/`).then(() => {
      const ListaPratos  = pratos.filter(
        pratos => pratos.id !== pratoAExcluir.id
      );
      setPratos(ListaPratos);
    });
  };
  useEffect(() => {
    http
      .get<IPrato[]>("pratos/")
      .then(res => setPratos(res.data));
  }, []);

  return (
    <>
      <NavBar />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Tag</TableCell>
              <TableCell>Imagem</TableCell>             
              <TableCell>Editar</TableCell>              
              <TableCell>Excluir</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pratos.map(prato => (
              <TableRow key={prato.id}>
                <TableCell>{prato.nome}</TableCell>
                <TableCell>{prato.tag}</TableCell>
                <TableCell>
                  <a href={prato.imagem} target="_blank" rel="noreferrer">ver Imagem</a>
                </TableCell>
                <TableCell>
                  [
                  <Link to={`/admin/pratos/${prato.id}`}>
                    Editar
                  </Link>
                  ]
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => excluir(prato)}
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
export default AdminPratos;
