import React, { useEffect, useState } from "react";
import { NavLink } from "../../../navlink/Navlink.jsx";
import Anuncio from "../anuncio/Anuncio.jsx";
import "./anuncios.css";
import { API_URL } from "../../../../auth/constants.js";
import { useAuth } from "../../../../auth/authProvider.jsx";
import LoaderFijo from "../../../load/loaderFijo/LoaderFijo.jsx";

function Anuncios(props) {
  const [anuncios, setAnuncios] = useState([]);
  const [anunciosUpdate, setAnunciosUpdate] = useState(false);
  const [estado, setEstado] = useState("");
  const [load, setLoad] = useState(false);
  const auth = useAuth();
  const user = auth.getUser();
  const userData=JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    setLoad(true);
    fetch(`${API_URL}/solicitud/${props.estado}/prestador/${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        setAnuncios(data.body.solicitudes);
        console.log(data.body.solicitudes);
        setAnunciosUpdate(false);
        setLoad(false);
      })
      .catch((error) => {
        setLoad(false);
        console.log(error);
        console.error('Error al cargar anuncios:', error);
      });
  }, [anunciosUpdate, estado, user.id]);

  const [paginaActual, setPaginaActual] = useState(1);
  const anunciosPorPagina = 3;
  const totalPaginas = Math.ceil(anuncios.length / anunciosPorPagina);
  const indiceInicio = (paginaActual - 1) * anunciosPorPagina;
  const AnunciosPagina = anuncios.slice(indiceInicio, indiceInicio + anunciosPorPagina);

  const irAtras = () => {
    if (paginaActual > 1) {
      setPaginaActual(paginaActual - 1);
    }
  };

  const irAdelante = () => {
    if (paginaActual < totalPaginas) {
      setPaginaActual(paginaActual + 1);
    }
  };

  const handleAnunciosUpdate = () => {
    setAnunciosUpdate(true);
  };

  const handleEstadoClick = (nuevoEstado) => {
    setEstado(nuevoEstado);
  };
  return (
    <div className="anuncios-container">
      <nav className="navigation">
        <ul className="ul-navegation-cli">
          <li className="li-navegation-cli">
            <NavLink to="/provider/home/add" onClick={() => handleEstadoClick("nuevas")} className="link">Anuncios</NavLink>
          </li>
          <li className="li-navegation-cli">
            <NavLink to="/provider/home/budgeted" onClick={() => handleEstadoClick("presupuestadas")} className="link">Presupuestadas</NavLink>
          </li>
          <li className="li-navegation-cli">
            <NavLink to="/provider/home/accepted" onClick={() => handleEstadoClick("aceptadas")} className="link">Aceptadas</NavLink>
          </li>
          <li className="li-navegation-cli">
            <NavLink to="/provider/home/finished" onClick={() => handleEstadoClick("terminadas")} className="link">Terminadas</NavLink>
          </li>
        </ul>

      </nav>

      <div className="anuncios">
        {load === false ? (
          AnunciosPagina.length > 0 ? (
            AnunciosPagina.map((anuncio) => (
              <Anuncio
                handleAnunciosUpdate={handleAnunciosUpdate}
                key={anuncio.id}
                id={anuncio.id}
                titulo={anuncio.titulo}
                fecha={anuncio.fechaHora}
                direccion={anuncio.direccion}
                descripcion={anuncio.descripcion}
                fotos={anuncio.fotos}
              />
            ))
          ) : (
            <div>
              <h1>No hay anuncios {props.estado}</h1>
            </div>
          )
        ) : (
          <div>
            <LoaderFijo />
          </div>
        )}
      </div>
      <div className="pagination">
        <button onClick={irAtras} disabled={paginaActual === 1}>Atrás</button>
        <span>{paginaActual} / {totalPaginas}</span>
        <button onClick={irAdelante} disabled={paginaActual === totalPaginas}>Adelante</button>
      </div>
    </div>
  );
}

export default Anuncios;