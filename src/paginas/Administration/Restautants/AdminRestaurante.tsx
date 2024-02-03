import axios from 'axios';
import {Table, TableBody, TableRow, Paper, TableContainer, TableHead, TableCell} from '@mui/material';
import { useState, useEffect} from 'react';
import IRestaurante from '../../../interfaces/IRestaurante'

const AdminRestaurantes = () =>{
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

  useEffect(() => {
    axios.get<IRestaurante[]>('http://localhost:8000/api/v2/restaurantes/')
      .then(res => setRestaurantes(res.data))
      },[restaurantes])
  
  return(
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                Nome
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {restaurantes.map(restaurante => <TableRow key={restaurante.id}>
              <TableCell>
                {restaurante.nome}
              </TableCell>
            </TableRow>)}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
export default AdminRestaurantes
