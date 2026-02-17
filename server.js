const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Handle contact form
app.post("/contact", (req, res) => {
    const { name, email, message } = req.body;

    console.log("New Contact Form Submission:");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Message:", message);

    res.send(`
        <h2 style="font-family: Arial; text-align:center; margin-top:50px;">
        Thank you, ${name}! We will contact you soon.
        </h2>
    `);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
