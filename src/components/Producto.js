import React from "react";
import {  useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { borrarProductoAction } from "../actions/productoActions";
import { obtenerProductoEditar } from "../actions/productoActions";
const Producto = ({ producto }) => {
  const { id, nombre, precio } = producto;

  const dispatch = useDispatch();
  const history = useHistory();
  const confirmarEliminarProducto = (id) => {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "Producto eliminado debe volver a ser creado",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
      cancelButtonText: "No, cancelar",
    }).then((result) => {
      if (result.value) {
        dispatch(borrarProductoAction(id));
      }
    });
  };

  //funcion que redirige de forma programada

  const redireccionarEdicion = (producto) => {
    dispatch(obtenerProductoEditar(producto));
    history.push(`/productos/editar/${producto.id}`);
  };
  return (
    <tr>
      <td>{nombre}</td>
      <td>
        {" "}
        <span className="font-weight-bold"></span>$ {precio}
      </td>
      <td className="acciones">
        <button
          type="button"
          onClick={() => redireccionarEdicion(producto)}
          className="btn btn-primary mr-2"
        >
          Editar
        </button>
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
