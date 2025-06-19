import React, { useState, useEffect } from "react";

const username = "davidvivar";

const Home = () => {
  const [tareas, setTareas] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState("");

  // Crear usuario al iniciar
  useEffect(() => {
    fetch(`https://playground.4geeks.com/apis/fake/todos/user/${username}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify([]) // crear usuario con lista vacía
    })
      .then(() => cargarTareas())
      .catch((err) => console.error("Error creando usuario:", err));
  }, []);

  // Cargar tareas existentes
  const cargarTareas = () => {
    fetch(`https://playground.4geeks.com/apis/fake/todos/user/${username}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setTareas(data);
        } else {
          setTareas([]);
        }
      })
      .catch((err) => console.error("Error cargando tareas:", err));
  };

  // Guardar tareas en el servidor
  const actualizarTareas = (nuevasTareas) => {
    fetch(`https://playground.4geeks.com/apis/fake/todos/user/${username}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevasTareas)
    })
      .then(() => setTareas(nuevasTareas))
      .catch((err) => console.error("Error actualizando tareas:", err));
  };

  // Agregar nueva tarea
  const agregarTarea = () => {
    if (nuevaTarea.trim() === "") return;

    const nuevas = [...tareas, { label: nuevaTarea, done: false }];
    actualizarTareas(nuevas);
    setNuevaTarea("");
  };

  // Eliminar una tarea por índice
  const eliminarTarea = (index) => {
    const filtradas = tareas.filter((_, i) => i !== index);
    actualizarTareas(filtradas);
  };

  // Eliminar todas
  const limpiarTareas = () => {
    actualizarTareas([]);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">✅ Mi Lista de Tareas</h1> 

      <div className="d-flex">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Nueva tarea"
          value={nuevaTarea}
          onChange={(e) => setNuevaTarea(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && agregarTarea()}
        />
        <button className="btn btn-success" onClick={agregarTarea}>Añadir</button>
      </div>

      <ul className="list-group mt-3">
        {tareas.length === 0 && (
          <li className="list-group-item text-center">No hay tareas</li>
        )}
        {tareas.map((tarea, i) => (
          <li
            key={i}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {tarea.label}
            <button className="btn btn-danger btn-sm" onClick={() => eliminarTarea(i)}>X</button>
          </li>
        ))}
      </ul>

      {tareas.length > 0 && (
        <div className="text-end mt-3">
          <button className="btn btn-warning" onClick={limpiarTareas}>Limpiar todo</button>
        </div>
      )}
    </div>
  );
};

export default Home;
