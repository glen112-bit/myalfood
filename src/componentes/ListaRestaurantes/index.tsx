import IRestaurante from "../../interfaces/IRestaurante";
import style from "./ListaRestaurantes.module.scss";
import Restaurante from "./Restaurante";
import { useEffect, useState } from "react";
import http from "../../http";
import { IPaginacao } from "../../interfaces/IPaginacao";

const ListaRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  const [proximaPagina, setProximaPagina] = useState("");

  useEffect(() => {
    http
      .get<IPaginacao<IRestaurante>>(
        "http://localhost:8000/api/v1/restaurantes/"
      )
      .then(res => {
        setRestaurantes(res.data.results);
        setProximaPagina(res.data.next);
      })
      .catch(error => console.log(error));
  }, []);

  const verMas = () => {
    http.get<IPaginacao<IRestaurante>>(proximaPagina).then(res => {
      setRestaurantes([...restaurantes, ...res.data.results]);
      setProximaPagina(res.data.next);
    });
  };

  return (
    <section className={style.ListaRestaurantes}>
      <h1>
        Os restaurantes mais <em>bacanas</em>!
      </h1>
      {restaurantes?.map(item => (
        <Restaurante restaurante={item} key={item.id} />
      ))}
      {proximaPagina && <button onClick={verMas}>ver mais</button>}
    </section>
  );
};

export default ListaRestaurantes;
