import { useState } from 'react';
import {TextField, Button} from '@mui/material';
import axios from 'axios';


const FormularioRestaurante = () => {
  const [nomeRestaurante, setNomeRestaurante] = useState("")

  const alSubmit = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    axios.post('http://localhost:8000/api/v2/restaurantes/', {
      nome:nomeRestaurante
    })
      .then(() => {
        alert('cadastrado')
      })

  }
  return(
    <form onSubmit={ alSubmit }>
      <TextField 
        value={ nomeRestaurante } 
        onChange={e => 
        setNomeRestaurante(e.target.value)} 
        id="standard-basic" 
        label="Standard" 
        variant="standard" 
      />
      <Button type={'submit'} variant="outlined">Outlined</Button>
    </form>

  )
}

export default FormularioRestaurante;
