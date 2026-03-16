const bookingEmailTemplate = ({
  bookingId,
  roomName,
  roomImage,
  checkInDate,
  checkOutDate,
  guests,
  totalPrice,
  paymentMethod,
}) => {
  return `
  <div style="background:#f2f3f8;padding:40px;font-family:Arial">

  <div style="max-width:650px;margin:auto;background:white;border-radius:10px;overflow:hidden">

  <!-- HEADER -->
  <div style="background:#003580;color:white;padding:20px;text-align:center">
      <h2 style="margin:0">Hotel Booking</h2>
      <p style="margin:5px 0;font-size:14px">Booking Confirmation</p>
  </div>

  <!-- ROOM IMAGE -->
  <img src="${roomImage}" 
       style="width:100%;height:260px;object-fit:cover"/>

  <!-- CONTENT -->
  <div style="padding:30px">

  <h2 style="margin-top:0;color:#333">
  🎉 Your booking is confirmed!
  </h2>

  <p style="font-size:14px;color:#666">
  Thank you for choosing our hotel. Here are your booking details:
  </p>

  <p style="font-size:14px">
  <b>Booking ID:</b> ${bookingId}
  </p>

  <!-- BOOKING TABLE -->
  <table style="width:100%;border-collapse:collapse;font-size:14px;margin-top:15px">

  <tr>
  <td style="padding:8px 0;color:#666"><b>Room</b></td>
  <td style="padding:8px 0">${roomName}</td>
  </tr>

  <tr>
  <td style="padding:8px 0;color:#666"><b>Check-in</b></td>
  <td style="padding:8px 0">${checkInDate}</td>
  </tr>

  <tr>
  <td style="padding:8px 0;color:#666"><b>Check-out</b></td>
  <td style="padding:8px 0">${checkOutDate}</td>
  </tr>

  <tr>
  <td style="padding:8px 0;color:#666"><b>Guests</b></td>
  <td style="padding:8px 0">${guests}</td>
  </tr>

  <tr>
  <td style="padding:8px 0;color:#666"><b>Payment Method</b></td>
  <td style="padding:8px 0">${paymentMethod}</td>
  </tr>

  <tr>
  <td style="padding:8px 0;color:#666"><b>Total Price</b></td>
  <td style="padding:8px 0;font-size:16px;color:#0071c2;font-weight:bold">
  ${Number(totalPrice).toLocaleString()} VND
  </td>
  </tr>

  </table>

  <!-- BUTTON -->
  <div style="text-align:center;margin-top:30px">

  <a href="${process.env.CLIENT_URL}/cart"
     style="
     background:#0071c2;
     color:white;
     padding:12px 24px;
     text-decoration:none;
     border-radius:6px;
     font-size:14px;
     display:inline-block
     "
     View My Booking
  </a>

  </div>

  </div>

  <!-- FOOTER -->
  <div style="background:#f5f5f5;padding:20px;text-align:center;font-size:12px;color:#777">

  <p style="margin:0">
  If you have any questions, please contact our support team.
  </p>

  <p style="margin:5px 0">
  © ${new Date().getFullYear()} Hotel Booking
  </p>

  </div>

  </div>

  </div>
  `;
};

module.exports = bookingEmailTemplate;
