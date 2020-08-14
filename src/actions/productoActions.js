import {
  AGREGAR_PRODUCTO,
  AGREGAR_PRODUCTO_EXITO,
  AGREGAR_PRODUCTO_ERROR,
  COMENZAR_DESCARGA_PRODUCTOS,
  DESCARGA_PRODUCTOS_EXITO,
  DESCARGA_PRODUCTOS_ERROR,
  OBTENER_PRODUCTO_ELIMINAR,
  PRODUCTO_ELIMINADO_ERROR,
  PRODUCTO_ELIMINADO_EXITO,
} from "../types";

import clienteAxios from "../config/axios";
import Swal from "sweetalert2";
import Axios from "axios";
//Crear nuevos productos
export function crearNuevoProductoAction(producto) {
  return async (dispatch) => {
    dispatch(agregarProducto());

    try {
      //Insertar en la API
      await clienteAxios.post("/productos", producto);

      //Insertar al State, actualizar el state
      dispatch(agregarProductoExito(producto));

      //Alerta

      Swal.fire("Correcto", "Producto agregado", "success");
    } catch (error) {
      console.log(error);
      //Si existe un error actualizar el state
      dispatch(agregarProductoError(true));

      Swal.fire({
        icon: "error",
        title: "existe un error en la app",
      });
    }
  };
}

const agregarProducto = () => ({
  type: AGREGAR_PRODUCTO,
  payload: true,
});

const agregarProductoExito = (producto) => ({
  type: AGREGAR_PRODUCTO_EXITO,
  payload: producto,
});

const agregarProductoError = (estado) => ({
  type: AGREGAR_PRODUCTO_ERROR,
  payload: estado,
});

export function obtenerProductosAction() {
  return async (dispatch) => {
    dispatch(descargarProductos());

    try {
      const respuesta = await clienteAxios.get("/productos");
      dispatch(descargaProductosExistosa(respuesta.data));
    } catch (error) {
      console.error(error);
      dispatch(descargaProductosError());
    }
  };
}

const descargarProductos = () => ({
  type: COMENZAR_DESCARGA_PRODUCTOS,
  payload: true,
});

const descargaProductosExistosa = (productos) => ({
  type: DESCARGA_PRODUCTOS_EXITO,
  payload: productos,
});

const descargaProductosError = () => ({
  type: DESCARGA_PRODUCTOS_ERROR,
  payload: true,
});

//SELECCIONA Y ELIMINA EL PRODUCTO

export function borrarProductoAction(id) {
  return async (dispatch) => {
    dispatch(obtenerProductoEliminar(id));
    try {
      const resultado = await clienteAxios.delete(`/productos/${id}`);
    } catch (error) {
      console.log(error);
    }
  };
}

const obtenerProductoEliminar = (id) => ({
  type: OBTENER_PRODUCTO_ELIMINAR,
  payload: id,
});
