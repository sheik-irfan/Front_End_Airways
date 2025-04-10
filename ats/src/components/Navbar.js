import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null); // admin, customer, guest
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    const type = localStorage.getItem("userType"); // store user type on login (admin, customer, or guest)
    setIsLoggedIn(!!user);
    setUserType(type);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userType");
    setIsLoggedIn(false);
    setUserType(null);
    navigate("/login");
  };

  return (
    isLoggedIn && (
      <nav>
        <ul>
          {/* Common Links */}
          <li><a href="/">Home</a></li>
          {userType === "admin" && (
            <>
              <li><a href="/admin-dashboard">Admin Dashboard</a></li>
              <li><a href="/manage-flights">Manage Flights</a></li>
              <li><a href="/manage-airports">Manage Airports</a></li>
              <li><a href="/manage-airplanes">Manage Airplanes</a></li>
            </>
          )}
          {userType === "customer" && (
            <>
              <li><a href="/customer-dashboard">Customer Dashboard</a></li>
              <li><a href="/ticket-pdf">Download Ticket</a></li>
            </>
          )}
          {userType === "guest" && (
            <li><a href="/customer-dashboard">Browse Flights</a></li>
          )}
          <li><button onClick={handleLogout}>Logout</button></li>
        </ul>
      </nav>
    )
  );
};

export default Navbar;