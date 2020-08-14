import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editarProductoAction } from "../actions/productoActions";
import { useHistory } from "react-router-dom";

const EditarProducto = () => {
  const [producto, setproducto] = useState({
    nombre: "",
    precio: "",
  });

  const dispatch = useDispatch();
  const history = useHistory();
  const productoeditar = useSelector((state) => state.productos.productoeditar);
  useEffect(() => {
    setproducto(productoeditar);
  }, [productoeditar]);
  const { nombre, precio } = producto;
  const submititEditarProducto = (e) => {
    e.preventDefault();

    dispatch(editarProductoAction(producto));
    history.push("/");
  };

  const onChangeFormulario = (e) => {
    setproducto({
      ...producto,
      [e.target.name]: [e.target.value],
    });
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Editar tus productos
            </h2>

            <form onSubmit={submititEditarProducto}>
              <div className="form-group">
                <label>Nombre Producto</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre producto"
                  name="nombre"
                  value={nombre}
                  onChange={onChangeFormulario}
                />
              </div>
              <div className="form-group">
                <label>Nombre Producto</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Precio del producto"
                  name="precio"
                  value={precio}
                  onChange={onChangeFormulario}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
              >
                Guardar cambios
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditarProducto;
