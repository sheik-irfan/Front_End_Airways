import { useState } from "react";

function ManageFlights() {
  const [flights, setFlights] = useState([
    { id: 1, source: "New York", destination: "Los Angeles", time: "10:00 AM", price: 300 },
    { id: 2, source: "Chicago", destination: "Miami", time: "2:30 PM", price: 250 },
  ]);
  const [newFlight, setNewFlight] = useState({ source: "", destination: "", time: "", price: "" });
  const [editingFlight, setEditingFlight] = useState(null);

  const handleAddFlight = () => {
    if (!newFlight.source || !newFlight.destination || !newFlight.time || !newFlight.price) {
      alert("Please fill all fields");
      return;
    }
    const flight = { ...newFlight, id: flights.length + 1 };
    setFlights([...flights, flight]);
    setNewFlight({ source: "", destination: "", time: "", price: "" });
  };

  const handleEditFlight = (flight) => {
    setEditingFlight(flight);
    setNewFlight({ source: flight.source, destination: flight.destination, time: flight.time, price: flight.price });
  };

  const handleUpdateFlight = () => {
    if (!newFlight.source || !newFlight.destination || !newFlight.time || !newFlight.price) {
      alert("Please fill all fields");
      return;
    }
    const updatedFlights = flights.map(flight =>
      flight.id === editingFlight.id ? { ...flight, ...newFlight } : flight
    );
    setFlights(updatedFlights);
    setEditingFlight(null);
    setNewFlight({ source: "", destination: "", time: "", price: "" });
  };

  const handleDeleteFlight = (id) => {
    setFlights(flights.filter(flight => flight.id !== id));
  };

  return (
    <div className="container">
      <h2>Manage Flights</h2>
      <h3>Add New Flight</h3>
      <div>
        <input
          type="text"
          placeholder="Source"
          value={newFlight.source}
          onChange={(e) => setNewFlight({ ...newFlight, source: e.target.value })}
        />
        <input
          type="text"
          placeholder="Destination"
          value={newFlight.destination}
          onChange={(e) => setNewFlight({ ...newFlight, destination: e.target.value })}
        />
        <input
          type="text"
          placeholder="Time"
          value={newFlight.time}
          onChange={(e) => setNewFlight({ ...newFlight, time: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={newFlight.price}
          onChange={(e) => setNewFlight({ ...newFlight, price: e.target.value })}
        />
        <button onClick={editingFlight ? handleUpdateFlight : handleAddFlight}>
          {editingFlight ? "Update Flight" : "Add Flight"}
        </button>
      </div>

      <h3>Existing Flights</h3>
      <ul>
        {flights.map(flight => (
          <li key={flight.id}>
            {flight.source} to {flight.destination} | {flight.time} | ${flight.price}
            <button onClick={() => handleEditFlight(flight)}>Edit</button>
            <button onClick={() => handleDeleteFlight(flight.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ManageFlights;