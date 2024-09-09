import express from 'express';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.get("/", (req, res) => {
    res.render('index.ejs');
});

app.get("/about", (req, res) => {
    res.render('about.ejs');
});

app.get("/contact", (req, res) => {
    res.render('contact.ejs');
});

app.post('/submit', (req, res) => {
    const { name, email, comment } = req.body;

    // สร้างตัวส่งอีเมล
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: '65160382@go.buu.ac.th',
            pass: 'Nut65160382.'
        }
    });

    // ตั้งค่าข้อมูลอีเมล
    const mailOptions = {
        from: '65160382@go.buu.ac.th',
        to: '65160388@go.buu.ac.th',
        subject: 'View website',
        text: `Name: ${name}\nEmail: ${email}\nComment: ${comment}`
    };

    // ส่งอีเมล
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        res.redirect('/contact?success=true'); // ส่ง query parameter เพื่อแจ้งเตือน
    });
});

app.listen(port, () => {
    console.log(`Server running on Port ${port}.`);
});
