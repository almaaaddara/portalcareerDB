const cors = require('cors');

// Middleware CORS dengan konfigurasi kustom
const CorsMiddleware = cors({
  origin: 'http://localhost:5173', // Atur domain frontend Anda
  methods: ['GET', 'POST', 'PUT'], // Atur metode HTTP yang diizinkan
  allowedHeaders: ['Content-Type', 'Authorization'], // Atur header yang diizinkan
  credentials: true // Mengizinkan pengiriman cookie melalui CORS
});

module.exports = CorsMiddleware;
