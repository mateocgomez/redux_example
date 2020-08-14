import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { crearNuevoProductoAction } from "../actions/productoActions";
import {
  mostrarAlertaAction,
  ocultarAlertaAction,
} from "../actions/aletaAction";
const NuevoProducto = ({ history }) => {
  const [nombre, setnombre] = useState("");
  const [precio, setprecio] = useState(0);
  //Utilizar useDispatch y crea una funcion
  const dispatch = useDispatch();

  const agregarProducto = (producto) =>
    dispatch(crearNuevoProductoAction(producto));

  const cargando = useSelector((state) => state.productos.loading);

  const error = useSelector((state) => state.productos.error);
  const alerta = useSelector((state) => state.alerta.alerta);
  const submitNuevoProducto = (e) => {
    e.preventDefault();

    //validar formulario

    if (nombre.trim === "" || precio <= 0) {
      const alerta = {
        msg: "ambos campos son obligatorio",
        classes: "alert alert-danger text-center text-uppercase p3",
      };
      dispatch(mostrarAlertaAction(alerta));
      return;
    }

    dispatch(ocultarAlertaAction());

    //crear el nuevo producto
    agregarProducto({
      nombre,
      precio,
    });

    history.push("/");
  };
  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Agregar nuevo producto
            </h2>
            {alerta ? <p className={alerta.classes}>{alerta.msg}</p> : null}
            <form onSubmit={submitNuevoProducto}>
              <div className="form-group">
                <label>Nombre Producto</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre producto"
                  name="nombre"
                  value={nombre}
                  onChange={(e) => setnombre(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Precio Producto</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Precio del producto"
                  name="precio"
                  value={precio}
                  onChange={(e) => setprecio(Number(e.target.value))}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
              >
                Agregar
              </button>
            </form>
            {cargando ? <p>Esta cargando</p> : null}
            {error ? (
              <p className="alert alert-danger p2">Trono la app</p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NuevoProducto;
