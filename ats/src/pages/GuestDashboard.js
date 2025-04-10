import { useState } from "react";
import { useNavigate } from "react-router-dom";

function GuestDashboard() {
  const [flights] = useState([
    { id: 1, source: "New York", destination: "Hyderabad", time: "10:00 AM", price: 25000 },
    { id: 2, source: "Chicago", destination: "Mumbai", time: "2:30 PM", price: 30000 },
    { id: 3, source: "Delhi", destination: "Bangalore", time: "4:00 PM", price: 5000 },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredFlights, setFilteredFlights] = useState(flights);
  const navigate = useNavigate(); // Hook to navigate between pages

  const handleSearch = () => {
    const result = flights.filter(
      (flight) =>
        flight.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
        flight.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
        flight.time.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredFlights(result);
  };

  const handleLoginRedirect = () => {
    navigate("/"); // Navigate to the login page
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto", textAlign: "center" }}>
      <h1 style={{ color: "#007bff", marginBottom: "20px" }}>Guest Dashboard</h1>
      <h2 style={{ marginBottom: "20px", color: "#555" }}>Search Flights</h2>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search by Source, Destination, or Time"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "6px",
            marginBottom: "10px",
          }}
        />
        <br />
        <button
          onClick={handleSearch}
          style={{
            backgroundColor: "#007bff",
            color: "#fff",
            padding: "10px 20px",
            fontSize: "16px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
        >
          Search
        </button>
      </div>
      <ul style={{ listStyleType: "none", padding: "0" }}>
        {filteredFlights.length > 0 ? (
          filteredFlights.map((flight) => (
            <li
              key={flight.id}
              style={{
                padding: "15px",
                border: "1px solid #ddd",
                borderRadius: "6px",
                marginBottom: "10px",
                backgroundColor: "#f9f9f9",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
              }}
            >
              <strong>{flight.source}</strong> to <strong>{flight.destination}</strong>
              <p>
                Time: {flight.time} | Price: ₹{flight.price}
              </p>
              <button
                onClick={handleLoginRedirect}
                style={{
                  backgroundColor: "#28a745",
                  color: "#fff",
                  padding: "8px 15px",
                  fontSize: "14px",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  transition: "background-color 0.3s ease",
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = "#218838")}
                onMouseOut={(e) => (e.target.style.backgroundColor = "#28a745")}
              >
                Login to Book
              </button>
            </li>
          ))
        ) : (
          <li style={{ color: "#555" }}>No flights found</li>
        )}
      </ul>
    </div>
  );
}

export default GuestDashboard;
