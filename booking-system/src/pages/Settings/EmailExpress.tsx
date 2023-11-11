import nodemailer from 'nodemailer';

// Create a transporter with your email service (e.g., Gmail)
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password',
  },
});

// Function to send an email to the admin
export const sendConfirmationEmail = (
  username: string,
  event: string,
  formattedStartDate: number,
  formattedEndDate: number,
  calculatedPrice: number
) => {
  const mailOptions = {
    from: 'your-email@gmail.com',
    to: 'admin-email@example.com', // Replace with the admin's email address
    subject: 'Booking Confirmation Request',
    html: `
      <p>Booking confirmation request for ${event} by ${username}.</p>
      <p>Start Date: ${formattedStartDate}</p>
      <p>End Date: ${formattedEndDate}</p>
      <p>Price: NGN ${calculatedPrice}</p>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email: ' + error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};
