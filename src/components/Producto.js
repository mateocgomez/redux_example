import React from "react";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { borrarProductoAction } from "../actions/productoActions";
const Producto = ({ producto }) => {
  const { id, nombre, precio } = producto;

  const dispatch = useDispatch();

  const confirmarEliminarProducto = (id) => {
    dispatch(borrarProductoAction(id));
  };
  return (
    <tr>
      <td>{nombre}</td>
      <td>
        {" "}
        <span className="font-weight-bold"></span>$ {precio}
      </td>
      <td className="acciones">
        <Link to={`/productos/editar/${id}`} className="btn btn-primary mr-2">
          Editar
        </Link>
        <button
          onClick={() => confirmarEliminarProducto(id)}
          type="button"
          className="btn btn-danger"
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default Producto;
