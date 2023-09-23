import React from 'react';
import { useParams } from 'react-router-dom';

const Detalle = ({ solicitudes }) => {
  const { id } = useParams();
  const solicitud = solicitudes.find((solicitud) => solicitud.id.toString() === id);

  if (!solicitud) {
    return <div>No se encontró la solicitud</div>;
  }

  // Definir las solicitudes que deseas mostrar según su ID
  const solicitudesAMostrar = {
    '1': solicitud1,
    '2': solicitud2,
    // Agregar más solicitudes según sea necesario
  };

  // Verificar si el ID está en el objeto de solicitudes a mostrar
  if (id in solicitudesAMostrar) {
    const solicitudMostrada = solicitudesAMostrar[id];

    return (
      <div>
        <h2>Detalles de la Solicitud #{solicitudMostrada.id}</h2>
        <h3>Título: {solicitudMostrada.titulo}</h3>
        <p>Estado: {solicitudMostrada.estado}</p>
        <p>Precio: {solicitudMostrada.precio}</p>
      </div>
    );
  } else {
    return <div>No se encontró la solicitud</div>;
  }
};

export default Detalle;
