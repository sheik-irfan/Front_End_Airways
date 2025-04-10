import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <div className="container">
      <h2>Admin Dashboard</h2>
      <div>
        <Link to="/manage-flights"><button>Manage Flights</button></Link> &nbsp; &nbsp;
        <Link to="/manage-airports"><button>Manage Airports</button></Link>&nbsp; &nbsp;
        <Link to="/manage-airplanes"><button>Manage Airplanes</button></Link>&nbsp; &nbsp;
      </div>
    </div>
  );
}

export default AdminDashboard;