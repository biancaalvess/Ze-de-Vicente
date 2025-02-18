import nodemailer from 'nodemailer';
import 'dotenv/config';

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, 
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

// **Criar E-mail sem Anexo**
const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_TO,
    subject: 'Novo Currículo Enviado',
    text: 'Este é um e-mail de teste sem anexo.',
};

// **Enviar E-mail**
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error('Erro ao enviar e-mail:', error);
    } else {
        console.log('E-mail enviado:', info.response);
    }
});
