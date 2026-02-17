const express = require("express");
const path = require("path");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/contact", async (req, res) => {
    const { name, email, message } = req.body;

    try {
       const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});


        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: "New Contact Form Submission - Primewave",
            html: `
                <h2>New Lead Received</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong> ${message}</p>
            `,
        };

        await transporter.sendMail(mailOptions);

        res.send(`
            <h2 style="font-family: Arial; text-align:center; margin-top:50px;">
            Thank you, ${name}! Your message has been sent successfully.
            </h2>
        `);

    } catch (error) {
        console.error(error);
        res.send("Something went wrong. Please try again.");
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
