import { useState } from "react";

function ManageAirplanes() {
  const [airplanes, setAirplanes] = useState([
    { id: 1, model: "Boeing 747", capacity: 400 },
    { id: 2, model: "Airbus A320", capacity: 200 },
  ]);
  const [newAirplane, setNewAirplane] = useState({ model: "", capacity: "" });
  const [editingAirplane, setEditingAirplane] = useState(null);

  const handleAddAirplane = () => {
    if (!newAirplane.model || !newAirplane.capacity) {
      alert("Please fill all fields");
      return;
    }
    const airplane = { ...newAirplane, id: airplanes.length + 1 };
    setAirplanes([...airplanes, airplane]);
    setNewAirplane({ model: "", capacity: "" });
  };

  const handleEditAirplane = (airplane) => {
    setEditingAirplane(airplane);
    setNewAirplane({ model: airplane.model, capacity: airplane.capacity });
  };

  const handleUpdateAirplane = () => {
    if (!newAirplane.model || !newAirplane.capacity) {
      alert("Please fill all fields");
      return;
    }
    const updatedAirplanes = airplanes.map(airplane =>
      airplane.id === editingAirplane.id ? { ...airplane, ...newAirplane } : airplane
    );
    setAirplanes(updatedAirplanes);
    setEditingAirplane(null);
    setNewAirplane({ model: "", capacity: "" });
  };

  const handleDeleteAirplane = (id) => {
    setAirplanes(airplanes.filter(airplane => airplane.id !== id));
  };

  return (
    <div className="container">
      <h2>Manage Airplanes</h2>
      <h3>Add New Airplane</h3>
      <div>
        <input
          type="text"
          placeholder="Airplane Model"
          value={newAirplane.model}
          onChange={(e) => setNewAirplane({ ...newAirplane, model: e.target.value })}
        />
        <input
          type="number"
          placeholder="Capacity"
          value={newAirplane.capacity}
          onChange={(e) => setNewAirplane({ ...newAirplane, capacity: e.target.value })}
        />
        <button onClick={editingAirplane ? handleUpdateAirplane : handleAddAirplane}>
          {editingAirplane ? "Update Airplane" : "Add Airplane"}
        </button>
      </div>

      <h3>Existing Airplanes</h3>
      <ul>
        {airplanes.map(airplane => (
          <li key={airplane.id}>
            {airplane.model} - Capacity: {airplane.capacity}
            <button onClick={() => handleEditAirplane(airplane)}>Edit</button>
            <button onClick={() => handleDeleteAirplane(airplane.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ManageAirplanes;