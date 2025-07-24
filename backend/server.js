const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config(); // Muat variabel dari file .env

const app = express();
const PORT = 3001;

// Inisialisasi Klien Gemini dengan API Key dari file .env
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.use(cors());
app.use(express.json());

// Jadikan fungsi endpoint menjadi async untuk menggunakan await
app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;
        console.log(`Menerima pesan dari frontend: "${message}"`);

        // --- PANGGILAN API GEMINI SUNGGUHAN ---
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        console.log('Memanggil API Gemini...');

        const result = await model.generateContent(message);
        const response = await result.response;
        const text = response.text();
        
        console.log('Gemini selesai memproses. Respons:', text);

        // Kirim respons dari Gemini ke frontend
        res.json({
            reply: text
        });
        // ------------------------------------

    } catch (error) {
        // Tangani jika ada error dari API Gemini
        console.error("Error saat memanggil API Gemini:", error);
        res.status(500).json({ error: "Gagal berkomunikasi dengan AI." });
    }
});

app.listen(PORT, () => {
    console.log(`Backend server berjalan di http://localhost:${PORT}`);
});