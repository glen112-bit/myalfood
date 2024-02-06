
import { useState, useEffect } from "react";
import {
  MenuItem,
  Select,
  InputLabel,
  TextField,
  Button,
  Typography,
  Box,
  FormControl,
} from "@mui/material";
import ITag from "../../../interfaces/ITag";
import IRestaurante from "../../../interfaces/IRestaurante";
import http from "../../../http";

const FormularioPrato = () => {


  const [nomePrato, setNomePrato] = useState("");
  const [tag, setTag] = useState("")
  const [tags, setTags] = useState<ITag[]>([])
  const [descricao, setDescricao] = useState("")
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])
  const [restaurante, setRestaurante] = useState("")
  const [imagem, setImagem] = useState<File | null>(null)

  useEffect(() => {
    http.get<{ tags:ITag[] }>('tags/')
      .then(res => setTags(res.data.tags))
    http.get<IRestaurante[]>('restaurantes/')
      .then(res => setRestaurantes(res.data))
  },[])

  const selectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files?.length){
      setImagem(e.target.files[0])
    }else{
      setImagem(null)
    }
  }


  const alSubmit = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    const formData = new FormData();

    formData.append('nome', nomePrato);
    formData.append('descricao', descricao);
    formData.append('tag',tag);
    formData.append('restaurante', restaurante);

    if(imagem){
      formData.append('imagem', imagem)
    }

    http.request({
      url:'pratos/',
      method:'POST',
      headers: {
        "Content-Type":'multipart/form-data'
      },
      data: formData
    })
      .then(() => {
        setNomePrato('')
        setDescricao('')
        setTag('')
        setRestaurante('')
        alert('prato cadastrado')
      })
      .catch(error => alert(error))

  };
  return (
    <>

      <Box>
        <Box
          sx={{
            display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "6rem",
          }}
        >
          <Typography component="h1" variant="h6">
            Formulario de Pratos 
          </Typography>
          <Box component="form" sx={{ width: "100%" }} onSubmit={alSubmit}>
            <TextField
              value={nomePrato}
              onChange={e => setNomePrato(e.target.value)}
              id="standard-basic"
              label="Nome"
              variant="standard"
              fullWidth
              required
            />
            <TextField
              value={descricao}
              onChange={e => setDescricao(e.target.value)}
              id="standard-basic"
              label="Description"
              variant="standard"
              fullWidth
            />
            <FormControl margin="dense" fullWidth>
              <InputLabel id="select-tag">Tag</InputLabel>
              <Select labelId="select-tag" value={tag} onChange={e => setTag(e.target.value)}>
                {tags.map((tag) => <MenuItem key={tag.id} value={tag.value}>
                  {tag.value}
                </MenuItem>
                )}

              </Select>
            </FormControl>

            <FormControl margin="dense" fullWidth>
              <InputLabel id="select-restaurante">Restaurante</InputLabel>
              <Select labelId="select-restaurante" value={restaurante} onChange={e => setRestaurante(e.target.value)}>
                {restaurantes.map((restaurante) => <MenuItem key={restaurante.id} value={restaurante.id}>
                  {restaurante.nome}
                </MenuItem>
                )}
              </Select>
            </FormControl>
            <input type="file" onChange={selectFile} />
            <Box sx={{ marginTop: 1 }}>
              <Button fullWidth type={"submit"} variant="outlined"> Save </Button>
              <Button fullWidth type={"submit"} variant="outlined">
                <a href="/">Home</a>
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default FormularioPrato;
