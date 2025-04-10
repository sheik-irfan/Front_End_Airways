import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CustomerDashboard() {
  const [flights] = useState([
    { id: 1, source: "New York", destination: "Hyderabad", time: "10:00 AM", price: 25000 },
    { id: 2, source: "Chicago", destination: "Mumbai", time: "2:30 PM", price: 30000 },
    { id: 3, source: "Delhi", destination: "Bangalore", time: "4:00 PM", price: 5000 },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredFlights, setFilteredFlights] = useState(flights);
  const [passengers, setPassengers] = useState([{ name: "", age: "", ticketType: "" }]);
  const [errors, setErrors] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null); // Track selected flight
  const navigate = useNavigate();

  const handleSearch = () => {
    const result = flights.filter(
      (flight) =>
        flight.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
        flight.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
        flight.time.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredFlights(result);
  };

  const handleAddPassenger = () => {
    setPassengers([...passengers, { name: "", age: "", ticketType: "" }]);
  };

  const handleDeletePassenger = (index) => {
    const updatedPassengers = passengers.filter((_, i) => i !== index); // Remove passenger by index
    setPassengers(updatedPassengers);
  };

  const handlePassengerChange = (index, field, value) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index][field] = value;
    setPassengers(updatedPassengers);
    setErrors([]);
  };

  const handleSelectFlight = (flight) => {
    setSelectedFlight(flight); // Set selected flight
  };

  const handleBookFlight = () => {
    const validationErrors = [];
    passengers.forEach((passenger, index) => {
      if (!passenger.name || !passenger.age || !passenger.ticketType) {
        validationErrors[index] = `Passenger ${index + 1}: Please fill out all fields.`;
      }
    });

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    alert("Booking confirmed for all passengers!");
    localStorage.setItem("selectedFlight", JSON.stringify({ flight: selectedFlight, passengers }));
    navigate("/ticket-pdf");
  };

  return (
    <div className="container">
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Available Flights</h2>

      <div className="search-bar" style={{ textAlign: "center", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search by Source, Destination, or Time"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: "70%",
            padding: "10px",
            marginBottom: "10px",
            border: "1px solid #ced4da",
            borderRadius: "6px",
          }}
        />
        <br />
        <button
          onClick={handleSearch}
          style={{
            backgroundColor: "#28a745",
            color: "white",
            padding: "10px 20px",
            fontSize: "16px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            marginTop: "10px",
            transition: "all 0.3s ease",
          }}
        >
          Search
        </button>
      </div>

      <ul style={{ padding: "0" }}>
        {filteredFlights.length > 0 ? (
          filteredFlights.map((flight) => (
            <li
              key={flight.id}
              style={{
                marginBottom: "20px",
                listStyle: "none",
                border: "1px solid #ddd",
                borderRadius: "6px",
                padding: "15px",
                backgroundColor: selectedFlight?.id === flight.id ? "#e3fcef" : "#f9f9f9",
                cursor: "pointer",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
              }}
              onClick={() => handleSelectFlight(flight)}
            >
              <h3 style={{ marginBottom: "10px" }}>
                {flight.source} to {flight.destination} | {flight.time} | ₹{flight.price}
              </h3>
              {selectedFlight?.id === flight.id && (
                <div style={{ marginTop: "10px" }}>
                  <table
                    style={{
                      width: "100%",
                      marginBottom: "20px",
                      borderCollapse: "collapse",
                      textAlign: "center",
                      backgroundColor: "#f8f9fa",
                      borderRadius: "10px",
                      overflow: "hidden",
                      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <thead style={{ backgroundColor: "#007bff", color: "white" }}>
                      <tr>
                        <th style={{ padding: "10px" }}>Name</th>
                        <th style={{ padding: "10px" }}>Age</th>
                        <th style={{ padding: "10px" }}>Ticket Type</th>
                        <th style={{ padding: "10px" }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {passengers.map((passenger, index) => (
                        <tr key={index}>
                          <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                            <input
                              type="text"
                              value={passenger.name}
                              placeholder="Enter Name"
                              onChange={(e) =>
                                handlePassengerChange(index, "name", e.target.value)
                              }
                              style={{
                                width: "100px",
                                padding: "8px",
                                border: "1px solid #ced4da",
                                borderRadius: "6px",
                              }}
                            />
                          </td>
                          <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                            <input
                              type="number"
                              value={passenger.age}
                              placeholder="Enter Age"
                              onChange={(e) =>
                                handlePassengerChange(index, "age", e.target.value)
                              }
                              style={{
                                width: "100px",
                                padding: "8px",
                                border: "1px solid #ced4da",
                                borderRadius: "6px",
                              }}
                            />
                          </td>
                          <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                            <select
                              value={passenger.ticketType}
                              onChange={(e) =>
                                handlePassengerChange(index, "ticketType", e.target.value)
                              }
                              style={{
                                width: "100px",
                                padding: "8px",
                                border: "1px solid #ced4da",
                                borderRadius: "6px",
                              }}
                            >
                              <option value="">Select Ticket Type</option>
                              <option value="Economy">Economy</option>
                              <option value="Business">Business</option>
                              <option value="First Class">First Class</option>
                            </select>
                          </td>
                          <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                            <button
                              onClick={() => handleDeletePassenger(index)}
                              style={{
                                backgroundColor: "#dc3545",
                                color: "white",
                                padding: "5px 10px",
                                fontSize: "14px",
                                border: "none",
                                borderRadius: "6px",
                                cursor: "pointer",
                                transition: "all 0.3s ease",
                              }}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div style={{ textAlign: "center", marginTop: "20px" }}>
                    <button
                      onClick={handleAddPassenger}
                      style={{
                        backgroundColor: "#28a745",
                        color: "white",
                        padding: "10px 20px",
                        fontSize: "16px",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                        marginRight: "10px",
                        transition: "all 0.3s ease",
                      }}
                    >
                      Add Passenger
                    </button>
                    <button
                      onClick={handleBookFlight}
                      style={{
                        backgroundColor: "#007bff",
                        color: "white",
                        padding: "10px 20px",
                        fontSize: "16px",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                      }}
                    >
                      Book
                    </button>
                  </div>
                  {errors.length > 0 &&
                      errors.map((error, index) => (
                        <div
                          key={index}
                          style={{ color: "red", marginTop: "10px", fontSize: "12px" }}
                        >
                          {error}
                        </div>
                      ))}
                </div>
              )}
            </li>
          ))
        ) : (
          <li style={{ textAlign: "center", color: "#555", padding: "10px" }}>
            No flights found
          </li>
        )}
      </ul>
    </div>
  );
}

export default CustomerDashboard;

                   