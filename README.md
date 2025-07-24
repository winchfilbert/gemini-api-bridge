# Demo AI Chat App

Aplikasi chat sederhana yang mengintegrasikan frontend, backend, dan Google Gemini AI.

## Struktur Project

```
workshop/
├── backend/        # Server Express.js
├── frontend/       # Interface HTML/CSS/JS
└── README.md
```

## Yang Dibutuhkan

- Node.js
- Google Gemini API Key

## Cara Install

1. **Setup Backend**
```bash
cd backend
npm install
echo "GEMINI_API_KEY=api_key_anda" > .env
```

2. **Jalankan Backend**
```bash
npm start
```

3. **Buka Frontend**
Buka file `frontend/index.html` di browser

## Cara Pakai

1. Pastikan backend jalan di port 3001
2. Buka frontend di browser
3. Ketik pesan dan klik "Kirim"
4. Tunggu respons dari AI

## Troubleshooting

- **Backend error**: Pastikan API key benar dan dependencies terinstall
- **Frontend tidak connect**: Pastikan backend jalan di port 3001
- **AI tidak respons**: Cek API key dan quota Gemini
