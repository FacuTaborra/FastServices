import React, { useEffect, useState } from "react";
import { NavLink } from "../../navlink/Navlink.jsx";
import { NuevaSolicitud } from "../nuevaSolicitud/NuevaSolicitud.jsx";
import Solicitud from "../solicitud/Solicitud.jsx";
import "./solicitudes.css";
import { API_URL } from "../../../auth/constants.js";
import { useAuth } from "../../../auth/authProvider.jsx";
import LoaderFijo from "../../load/loaderFijo/LoaderFijo.jsx";


function Solicitudes(props) {

    const [solicitudes, setSolicitudes] = useState([]);
    const [solicitudesUpdate, setSolicitudesUpdate] = useState(false);
    const [estado, setEstado] = useState(props.estado);
    const [load, setLoad] = useState(false);
    const auth = useAuth();
    const user = auth.getUser();

    useEffect(() => {
        setLoad(true);
        fetch(`${API_URL}/solicitud/${estado}/cliente/${user.id}`)
          .then((res) => res.json())
          .then((data) => {
            setSolicitudes(data.body.solicitudes);
            setSolicitudesUpdate(false); // Mover esta línea aquí
            setLoad(false);
            console.log("solicitudes con estado "+ estado + ": " + data.body.solicitudes)
          })
          .catch((error) => {
            setLoad(false);
            console.log(error)
            console.error('Error al cargar solicitudes:', error);
          });
    }, [solicitudesUpdate, estado, user.id]);
      
    // pagination
    const [paginaActual, setPaginaActual] = useState(1);
    const solicitudesPorPagina = 3;
    const totalPaginas = Math.ceil(solicitudes.length / solicitudesPorPagina);
    const indiceInicio = (paginaActual - 1) * solicitudesPorPagina;
    const SolicitudesPagina = solicitudes.slice(indiceInicio, indiceInicio + solicitudesPorPagina);
    
      
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

    const hendleSolicitudesUpdate = () => {
        setSolicitudesUpdate(true);
    };

    const handleEstadoClick = (nuevoEstado) => {
        setEstado(nuevoEstado);
    };

    return (
        <div className="solicitudes-container">

            <nav className="navigation" >
                <ul className="ul-navegation-cli">
                    <li className="li-navegation-cli">
                        <NavLink to="/client/home/active" onClick={() => handleEstadoClick("activa")} className="link">Activas</NavLink>
                    </li>
                    <li className="li-navegation-cli" >
                        <NavLink to="/client/home/progress" onClick={() => handleEstadoClick("progreso")} className="link">En Progreso</NavLink>
                    </li>
                    <li className="li-navegation-cli">
                        <NavLink to="/client/home/finished" onClick={() => handleEstadoClick("finalizado")} className="link">Terminados</NavLink>
                    </li>    
                </ul>
            </nav>

            <div className="solicitudes">
                {load === false ? (
                SolicitudesPagina.length > 0 ? (
                
                SolicitudesPagina.map((solicitud) => (
                    
                    <Solicitud
                        hendleSolicitudesUpdate={hendleSolicitudesUpdate}
                        id={solicitud.id}
                        titulo={solicitud.titulo}
                        fecha={solicitud.fechaHora}
                        direccion={solicitud.direccion}
                        descripcion={solicitud.descripcion}
                        estado={solicitud.estado}
                        fotos={solicitud.fotos}
                    />
                ))) : (
                    <div>
                        <h1>No hay solicitudes {props.estado}</h1>
                    </div>
                )) : (
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
            <NuevaSolicitud hendleSolicitudesUpdate={hendleSolicitudesUpdate}/>
        </div>   
    )
}

export default Solicitudes;