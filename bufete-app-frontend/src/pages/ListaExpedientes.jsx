import React, { useState, useEffect } from 'react';
import api from '../services/api'; // Importamos la configuración de Axios

const ListaExpedientes = () => {
  // 1. Hook useState: Manejo del estado local
  const [procesos, setProcesos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // 2. Hook useEffect: Se ejecuta al montar el componente para traer datos
  useEffect(() => {
    const obtenerProcesos = async () => {
      try {
        // Petición GET al endpoint del Back-end documentado en Swagger
        const response = await api.get('/procesos'); 
        setProcesos(response.data); // Guardamos los datos en el estado
      } catch (err) {
        setError('Error al cargar la información de los casos.');
        console.error(err);
      } finally {
        setCargando(false);
      }
    };

    obtenerProcesos();
  }, []); // El array vacío [] asegura que solo se ejecute una vez

  // Renderizado condicional
  if (cargando) return <div className="text-center">Cargando expedientes...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container mt-4">
      <h2>Gestión de Procesos Jurídicos</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Radicado</th>
            <th>Cliente</th>
            <th>Tipo de Caso</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {procesos.map((proceso) => (
            <tr key={proceso.id}>
              <td>{proceso.numeroRadicado}</td>
              <td>{proceso.nombreCliente}</td>
              <td>{proceso.tipoProceso}</td>
              <td>
                <span className={`badge ${proceso.estado === 'ACTIVO' ? 'bg-success' : 'bg-secondary'}`}>
                  {proceso.estado}
                </span>
              </td>
              <td>
                <button className="btn btn-primary btn-sm">Ver Detalle</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaExpedientes;