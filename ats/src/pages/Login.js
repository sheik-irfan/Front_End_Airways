import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false); // State to toggle form visibility
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === "admin@airways.com" && password === "admin123") {
      navigate("/admin-dashboard");
    } else if (username === "customer@airways.com" && password === "customer123") {
      navigate("/customer-dashboard");
    } else {
      setError("Invalid username or password.");
    }
  };

  const handleGuestLogin = () => {
    navigate("/guest-dashboard"); // Redirect Guest User directly to Guest Dashboard
  };

  const toggleForm = () => {
    setShowForm(!showForm); // Toggle the form's visibility
  };

  return (
    <div className="container">
      <h1 style={{ fontSize: "2rem", color: "#007bff" }}>Welcome to Airways Reservation System</h1>
      <div style={{ marginTop: "20px", display: "flex", justifyContent: "center", gap: "20px" }}>
        {!showForm && (
          <button
            onClick={toggleForm}
            style={{
              padding: "10px 15px",
              fontSize: "16px",
              cursor: "pointer",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "6px",
              transition: "all 0.3s ease",
            }}
          >
            Login
          </button>
        )}
        <button
          onClick={handleGuestLogin}
          style={{
            padding: "10px 15px",
            fontSize: "16px",
            cursor: "pointer",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "6px",
            transition: "all 0.3s ease",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#218838")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#28a745")}
        >
          Guest Login
        </button>
      </div>
      <div
        style={{
          marginTop: "30px",
          transform: showForm ? "translateX(0)" : "translateX(100%)", // Sliding effect
          transition: "transform 0.5s ease-in-out", // Smooth transition
          opacity: showForm ? 1 : 0, // Fade-in/out effect
          visibility: showForm ? "visible" : "hidden", // Hide content when not displayed
        }}
      >
        {showForm && (
          <>
            <h2 style={{ fontSize: "1.5rem", marginBottom: "20px" }}>Login</h2>
            <input
              type="email"
              placeholder="Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                display: "block",
                margin: "10px auto",
                padding: "10px",
                width: "80%",
                borderRadius: "6px",
                border: "1px solid #ced4da",
              }}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                display: "block",
                margin: "10px auto",
                padding: "10px",
                width: "80%",
                borderRadius: "6px",
                border: "1px solid #ced4da",
              }}
            />
            <button
              onClick={handleLogin}
              style={{
                margin: "20px auto",
                display: "block",
                padding: "10px 20px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
            >
              Submit
            </button>
            {error && (
              <div
                style={{
                  color: "red",
                  textAlign: "center",
                  marginTop: "10px",
                }}
              >
                {error}
              </div>
            )}
            <div style={{ marginTop: "20px", textAlign: "center" }}>
              <button
                onClick={() => navigate("/forgot-password")}
                style={{
                  background: "none",
                  border: "none",
                  color: "#007bff",
                  cursor: "pointer",
                  textDecoration: "underline",
                  marginRight: "10px",
                }}
              >
                Forgot Password?
              </button>
              <button
                onClick={() => navigate("/signup")}
                style={{
                  background: "none",
                  border: "none",
                  color: "#007bff",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                Sign Up
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Login;
