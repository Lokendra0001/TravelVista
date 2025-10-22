import html2pdf from "html2pdf.js";

export const downloadInvoice = (booking) => {
    const div = document.createElement("div");

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
        }).format(price);
    };

    div.innerHTML = `
    <div style="max-width:800px;margin:auto;background:#ffffff;border:1px solid #e5e7eb;padding:20px;font-family:sans-serif;">
      
      <!-- Header -->
      <div style="background:#F3B227;color:white;padding:20px;border-radius:8px 8px 0 0;">
        <h1 style="margin:0;font-size:24px;">Booking Invoice</h1>
        <p style="margin:5px 0 0 0;font-size:14px;">Thank you for choosing our services</p>
      </div>

      <!-- Company & Client Info -->
      <div style="display:flex;justify-content:space-between;padding:20px 0;border-bottom:1px solid #e5e7eb;">
        <div>
          <p style="margin:0;font-weight:bold;">TravelVista</p>
          <p style="margin:2px 0;font-size:12px;">Adventure Awaits You</p>
          <p style="margin:2px 0;font-size:12px;">contact@travelvista.com</p>
        </div>
        <div style="text-align:right;">
          <p style="margin:0;font-size:12px;">Invoice #</p>
          <p style="margin:2px 0;font-family:monospace;font-weight:bold;">${booking._id}</p>
        </div>
      </div>

      <!-- Client Details -->
      <div style="padding:15px 0;border-bottom:1px solid #e5e7eb;">
        <p style="margin:0;font-weight:bold;font-size:14px;">Traveler Details:</p>
        <p style="margin:2px 0;font-size:12px;">Name: ${booking.fullName}</p>
        <p style="margin:2px 0;font-size:12px;">Phone: ${booking.phone || 'N/A'}</p>
      </div>

      <!-- Tour Info -->
      <div style="display:flex;flex-wrap:wrap;padding:20px 0;border-bottom:1px solid #e5e7eb;">
        <div style="flex:1;min-width:200px;">
          <img 
            src="${booking.tour?.images?.[0] || '/api/placeholder/400/300'}" 
            alt="${booking.tour?.tourName}" 
            style="width:100%;height:150px;object-fit:cover;border-radius:8px;"
          />
        </div>
        <div style="flex:2;min-width:200px;padding-left:20px;">
          <p style="margin:0;font-size:18px;font-weight:bold;">${booking.tour?.tourName}</p>
          <p style="margin:5px 0;font-size:12px;">${booking.tour?.category || "Adventure"} Tour Package</p>
          <p style="margin:5px 0;font-size:12px;">Booked on: ${formatDate(booking.bookedAt)}</p>
          <p style="margin:5px 0;font-size:12px;">Travelers: ${booking.numberOfTravelers} ${booking.numberOfTravelers > 1 ? 'Persons' : 'Person'}</p>
          <p style="margin:5px 0;font-size:12px;">Paid via Stripe</p>
        </div>
      </div>

      <!-- Invoice Table -->
      <table style="width:100%;border-collapse:collapse;margin-top:20px;">
        <thead>
          <tr>
            <th style="text-align:left;padding:8px;border-bottom:1px solid #e5e7eb;">Description</th>
            <th style="text-align:center;padding:8px;border-bottom:1px solid #e5e7eb;">Travelers</th>
            <th style="text-align:right;padding:8px;border-bottom:1px solid #e5e7eb;">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding:8px;">${booking.tour?.tourName} (${booking.tour?.category || "Adventure"} Tour)</td>
            <td style="padding:8px;text-align:center;">${booking.numberOfTravelers}</td>
            <td style="padding:8px;text-align:right;">${formatPrice(booking.totalPrice)}</td>
          </tr>
          <tr>
            <td colspan="2" style="padding:8px;text-align:right;font-weight:bold;">Total:</td>
            <td style="padding:8px;text-align:right;font-weight:bold;">${formatPrice(booking.totalPrice)}</td>
          </tr>
        </tbody>
      </table>

      <!-- Special Requests -->
      ${booking.specialRequests
            ? `<div style="margin-top:20px;padding:10px;border:1px solid #E5E7EB;border-radius:5px;">
              <strong>Special Requests:</strong>
              <p style="margin:5px 0 0 0;font-style:italic;">${booking.specialRequests}</p>
            </div>`
            : ""
        }

      <!-- Footer -->
      <div style="margin-top:30px;text-align:center;font-size:12px;color:#6b7280;">
        <p>Thank you for your booking! For any queries, contact support@travelvista.com</p>
        <p>This is a computer-generated invoice and does not require a physical signature.</p>
      </div>
    </div>
  `;

    html2pdf()
        .set({
            margin: 10,
            filename: `invoice_${booking._id}.pdf`,
            html2canvas: { scale: 2, useCORS: true, logging: true },
            jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        })
        .from(div)
        .save();
};
