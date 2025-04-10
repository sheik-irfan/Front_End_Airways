import { BrowserRouter as Router, Routes, Route } from "react-router-dom";    
import Navbar from "./components/Navbar";    
import Login from "./pages/Login";    
import AdminDashboard from "./pages/AdminDashboard";    
import ManageFlights from "./pages/ManageFlights";    
import ManageAirports from "./pages/ManageAirports";    
import ManageAirplanes from "./pages/ManageAirplanes";    
import CustomerDashboard from "./pages/CustomerDashboard";    
import TicketPdf from "./pages/TicketPdf";   
import "./styles.css" 
import GuestDashboard from "./pages/GuestDashboard";

function App() {    
  return (    
    <Router>    
      <Navbar />    
      <Routes>    
        <Route path="/" element={<Login />} />    
        <Route path="/admin-dashboard" element={<AdminDashboard />} />    
        <Route path="/manage-flights" element={<ManageFlights />} />    
        <Route path="/manage-airports" element={<ManageAirports />} />    
        <Route path="/manage-airplanes" element={<ManageAirplanes />} />    
        <Route path="/customer-dashboard" element={<CustomerDashboard />} />    
        <Route path="/guest-dashboard" element={<GuestDashboard />} />    

        <Route path="/ticket-pdf" element={<TicketPdf />} />    
      </Routes>    
    </Router>    
  );    
}    

export default App;