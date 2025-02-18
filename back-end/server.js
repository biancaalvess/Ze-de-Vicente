import express from "express"
import multer from "multer"
import { Pool } from "pg"
import nodemailer from "nodemailer"
import dotenv from "dotenv"
import rateLimit from "express-rate-limit"
import path from "path"

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

// Database connection
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    })

    // Configuração de upload de arquivo
    const upload = multer({
    storage: multer.diskStorage({
        destination: "./uploads/",
        filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
        cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname))
        },
    }),
    fileFilter: (req, file, cb) => {
        const allowedFileTypes = /pdf|docx/
        const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase())
        const mimetype = allowedFileTypes.test(file.mimetype)
        if (extname && mimetype) {
        return cb(null, true)
        } else {
        cb("Error: Only PDF and DOCX files are allowed!")
        }
    },
    limits: { fileSize: 5 * 1024 * 1024 }, // Limite de tamanho de arquivo de 5 MB
    })

    // Transportador de e-mail
    const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
    })

// Limitação de taxa
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limitar cada ATÉ 5 pedidos por janela
}) 

app.use(express.json())
app.use(limiter)

// Configuração CORS (ajuste conforme necessário para o front-end)
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://zedevicente.netlify.app")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
    })

    // Ponto final de envio de currículo
    app.post("/submit-resume", upload.single("resume"), async (req, res) => {
    try {
        const { name, email, phone } = req.body
        const resumeFile = req.file

        if (!name || !email || !phone || !resumeFile) {
        return res.status(400).json({ error: "Missing required fields" })
        }

        // Save to database
        const result = await pool.query(
        "INSERT INTO candidates(name, email, phone, resume_path) VALUES($1, $2, $3, $4) RETURNING id",
        [name, email, phone, resumeFile.path],
        )

        // Send email
        await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: process.env.EMAIL_TO,
        subject: "New Resume Submission",
        text: `New resume submitted by ${name}. Email: ${email}, Phone: ${phone}`,
        attachments: [
            {
            filename: resumeFile.originalname,
            path: resumeFile.path,
            },
        ],
        })

        // Send confirmation email to candidate
        await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: email,
        subject: "Resume Submission Confirmation",
        text: `Thank you for submitting your resume. We have received it and will review it shortly.`,
        })

        res.status(200).json({ message: "Resume submitted successfully" })
    } catch (error) {
        console.error("Error submitting resume:", error)
        res.status(500).json({ error: "An error occurred while submitting the resume" })
    }
    })

    app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

