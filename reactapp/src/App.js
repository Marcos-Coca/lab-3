import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";

export default function App() {
  const [cedula, setCedula] = useState();
  const [data, setData] = useState({
    nombres: "",
    apellidos: "",
    sexo: "",
    fNacimiento: "",
    telefono: "",
    direccion: "",
  });
  const [showInputs, setShowInputs] = useState(false);

  const handleSearch = () => {
    const cedulaSplit = cedula.split("-");
    fetch(
      `https://corsproxy.io/?https%3A%2F%2Fcompulaboratoriomendez.com%2Flib%2F%3FKey%3DDESARROLLOWEB%26MUN_CED%3D${cedulaSplit[0]}%26SEQ_CED%3D${cedulaSplit[1]}%26VER_CED%3D${cedulaSplit[2]}`
    )
      .then((res) => res.json())
      .then(([response]) => {
        setShowInputs(true);

        if (!response) return;

        const data = {
          nombres: response.NOMBRES,
          apellidos: response.APELLIDO1 + " " + response.APELLIDO2,
          fNacimiento: response.FECHA_NAC,
          sexo: response.SEXO,
          telefono: response.TELEFONO,
          direccion: response.LUGAR_NAC,
        };
        setData(data);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const target = e.target;
    const value = {
      nombres: target.nombres.value,
      apellidos: target.apellidos.value,
      sexo: target.sexo.value,
      telefono: target.telefono.value,
      direccion: target.direccion.value,
      foto: target.foto.value,
    };

    fetch("https://localhost:7106/api/solicitud", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    }).then((res) => {
      if (res.status === 200) {
        alert("Solicitud enviada correctamente");
      } else {
        alert("Error al enviar la solicitud");
      }
    });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="row">
        <div className="col-12">
          <h1 className="my-4 text-center">Solicitud de Visa </h1>
        </div>

        <div className="col-md-8 mx-auto">
          <div className="form-group">
            <label htmlFor="cedula">Cedula:</label>
            <input
              type="text"
              className="form-control"
              id="cedula"
              placeholder="000-0000000-0"
              value={cedula}
              onChange={(e) => setCedula(e.target.value)}
            />
          </div>
        </div>

        <div className="col-md-4">
          <button
            className="btn btn-primary btn-block mt-4"
            type="button"
            onClick={() => {
              handleSearch();
            }}
          >
            Buscar
          </button>
        </div>

        {showInputs && (
          <>
            <div className="col-md-12 mx-auto">
              <div className="form-group">
                <label htmlFor="nombres">Nombres:</label>
                <input
                  type="text"
                  className="form-control"
                  id="nombres"
                  placeholder="Nombres"
                  value={data.nombres}
                  onChange={(e) =>
                    setData({ ...data, nombres: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="col-md-12 mx-auto">
              <div className="form-group">
                <label htmlFor="apellidos">Apellidos:</label>
                <input
                  type="text"
                  className="form-control"
                  id="apellidos"
                  placeholder="Apellidos"
                  value={data.apellidos}
                  onChange={(e) =>
                    setData({ ...data, apellidos: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="col-md-12 mx-auto">
              <div className="form-group">
                <label htmlFor="fNacimiento">Fecha de Nacimiento:</label>
                <input
                  type="text"
                  className="form-control"
                  id="fNacimiento"
                  placeholder="Fecha de Nacimiento"
                  value={data.fNacimiento}
                  onChange={(e) =>
                    setData({ ...data, fNacimiento: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="col-md-12 mx-auto">
              <div className="form-group">
                <label htmlFor="sexo">Sexo:</label>
                <input
                  type="text"
                  className="form-control"
                  id="sexo"
                  placeholder="Sexo"
                  value={data.sexo}
                  onChange={(e) => setData({ ...data, sexo: e.target.value })}
                />
              </div>
            </div>

            <div className="col-md-12 mx-auto">
              <div className="form-group">
                <label htmlFor="telefono">Telefono:</label>
                <input
                  type="text"
                  className="form-control"
                  id="telefono"
                  placeholder="Telefono"
                  value={data.telefono}
                  onChange={(e) =>
                    setData({ ...data, telefono: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="col-md-12 mx-auto">
              <div className="form-group">
                <label htmlFor="direccion">Direccion:</label>
                <input
                  type="text"
                  className="form-control"
                  id="direccion"
                  placeholder="Direccion"
                  value={data.direccion}
                  onChange={(e) =>
                    setData({ ...data, direccion: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="col-md-12 mx-auto mt-3">
              <div className="form-group">
                <label className="d-block" htmlFor="foto">
                  Foto:
                </label>
                <input
                  type="file"
                  className="form-control-file mt-2"
                  id="foto"
                />
              </div>
            </div>

            <div className="col-md-12 mx-auto text-right">
              <button className="btn btn-primary mt-4 w-100" type="submit">
                Enviar
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
