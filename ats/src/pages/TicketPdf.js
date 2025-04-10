import { useState, useEffect } from "react";
import { jsPDF } from "jspdf";

function TicketPdf() {
  const [ticket, setTicket] = useState({
    customerName: "John Doe",
    flightNumber: "AA123",
    source: "New York",
    destination: "Los Angeles",
    date: "2025-05-10",
    time: "10:00 AM",
    seatNumber: "12A",
    price: "25000",
    bookingReference: "REF12345",
  });

  useEffect(() => {
    const selectedFlight = JSON.parse(localStorage.getItem("selectedFlight"));
    if (selectedFlight) {
      setTicket({
        customerName: "John Doe",
        flightNumber: `FL${Math.floor(Math.random() * 1000)}`,
        source: "New York",
        destination:"delhi",
        date: "2025-05-10",
        time:  1200,
        seatNumber: "12A",
        price: 30000,
        bookingReference: `REF${Math.floor(Math.random() * 10000)}`,
      });
    }
  }, []);

  const generateTicketPdf = () => {
    const doc = new jsPDF();

    // Title Section
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.text("Airways Reservation Invoice", 105, 20, { align: "center" });

    // Branding Section
    doc.setFontSize(12);
    doc.setFont("helvetica", "italic");
    doc.text("Thank you for choosing Airways!", 105, 30, { align: "center" });
    doc.line(10, 35, 200, 35); // Divider

    // Booking Information
    doc.setFont("helvetica", "normal");
    doc.setFontSize(14);
    doc.text(`Booking Reference: ${ticket.bookingReference}`, 20, 50);
    doc.text(`Customer Name: ${ticket.customerName}`, 20, 60);
    doc.text(`Flight Number: ${ticket.flightNumber}`, 20, 70);
    doc.text(`Date: ${ticket.date}`, 20, 80);
    doc.text(`Time: ${ticket.time}`, 20, 90);
    doc.text(`Seat Number: ${ticket.seatNumber}`, 20, 100);

    doc.text(`From: ${ticket.source}`, 20, 110);
    doc.text(`To: ${ticket.destination}`, 20, 120);

    // Price Details
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text(`Total Price: ₹${ticket.price}`, 20, 130);

    // Footer Section
    doc.setFontSize(10);
    doc.setFont("helvetica", "italic");
    doc.text("This receipt confirms your booking.", 105, 260, { align: "center" });
    doc.text("Visit us at www.airways.com", 105, 270, { align: "center" });
    doc.line(10, 275, 200, 275); // Footer Divider

    // Save the PDF
    doc.save(`Airways_Invoice_${ticket.bookingReference}.pdf`);
  };

  return (
    <div className="container" style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2 style={{ textAlign: "center", color: "#007bff" }}>Your Flight Invoice</h2>
      <p style={{ textAlign: "center", marginBottom: "20px" }}>
        Below are the details of your reservation.
      </p>
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "20px" }}>
        <thead>
          <tr style={{ backgroundColor: "#007bff", color: "white" }}>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Field</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Details</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>Customer Name</td>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>{ticket.customerName}</td>
          </tr>
          <tr>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>Flight Number</td>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>{ticket.flightNumber}</td>
          </tr>
          <tr>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>Source</td>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>{ticket.source}</td>
          </tr>
          <tr>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>Destination</td>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>{ticket.destination}</td>
          </tr>
          <tr>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>Date</td>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>{ticket.date}</td>
          </tr>
          <tr>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>Time</td>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>{ticket.time}</td>
          </tr>
          <tr>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>Seat Number</td>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>{ticket.seatNumber}</td>
          </tr>
          <tr>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>Price</td>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>₹{ticket.price}</td>
          </tr>
          <tr>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>Booking Reference</td>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>{ticket.bookingReference}</td>
          </tr>
        </tbody>
      </table>
      <button
        onClick={generateTicketPdf}
        style={{
          display: "block",
          margin: "20px auto",
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          transition: "all 0.3s ease",
        }}
      >
        Download PDF Invoice
      </button>
    </div>
  );
}

export default TicketPdf;
