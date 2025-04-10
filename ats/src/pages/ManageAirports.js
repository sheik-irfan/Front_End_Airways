import { useState } from "react";

function ManageAirports() {
  const [airports, setAirports] = useState([
    { id: 1, name: "John F. Kennedy International Airport", city: "New York" },
    { id: 2, name: "Los Angeles International Airport", city: "Los Angeles" },
  ]);
  const [newAirport, setNewAirport] = useState({ name: "", city: "" });
  const [editingAirport, setEditingAirport] = useState(null);

  const handleAddAirport = () => {
    if (!newAirport.name || !newAirport.city) {
      alert("Please fill all fields");
      return;
    }
    const airport = { ...newAirport, id: airports.length + 1 };
    setAirports([...airports, airport]);
    setNewAirport({ name: "", city: "" });
  };

  const handleEditAirport = (airport) => {
    setEditingAirport(airport);
    setNewAirport({ name: airport.name, city: airport.city });
  };

  const handleUpdateAirport = () => {
    if (!newAirport.name || !newAirport.city) {
      alert("Please fill all fields");
      return;
    }
    const updatedAirports = airports.map(airport =>
      airport.id === editingAirport.id ? { ...airport, ...newAirport } : airport
    );
    setAirports(updatedAirports);
    setEditingAirport(null);
    setNewAirport({ name: "", city: "" });
  };

  const handleDeleteAirport = (id) => {
    setAirports(airports.filter(airport => airport.id !== id));
  };

  return (
    <div className="container">
      <h2>Manage Airports</h2>
      <h3>Add New Airport</h3>
      <div>
        <input
          type="text"
          placeholder="Airport Name"
          value={newAirport.name}
          onChange={(e) => setNewAirport({ ...newAirport, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="City"
          value={newAirport.city}
          onChange={(e) => setNewAirport({ ...newAirport, city: e.target.value })}
        />
        <button onClick={editingAirport ? handleUpdateAirport : handleAddAirport}>
          {editingAirport ? "Update Airport" : "Add Airport"}
        </button>
      </div>

      <h3>Existing Airports</h3>
      <ul>
        {airports.map(airport => (
          <li key={airport.id}>
            {airport.name} - {airport.city}
            <button onClick={() => handleEditAirport(airport)}>Edit</button>
            <button onClick={() => handleDeleteAirport(airport.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ManageAirports;