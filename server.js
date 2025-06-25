const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const http = require('http');

const app = express();

const PORT = process.env.PORT || 3000;

// Middleware do proxy com cabeçalho para ignorar o aviso do ngrok
app.use('/', createProxyMiddleware({
  target: 'https://web.whatsapp.com', // será atualizado automaticamente pelo script
  changeOrigin: true,
  secure: false,
  onProxyReq: (proxyReq) => {
    proxyReq.setHeader('ngrok-skip-browser-warning', 'true');
  }
}));

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Proxy online na porta ${PORT}`);
});

// Auto-ping a cada 5 minutos para evitar hibernação no Render
setInterval(() => {
  http.get(`http://localhost:${PORT}`, (res) => {
    console.log(`Auto-ping executado. Status: ${res.statusCode}`);
  }).on('error', (err) => {
    console.error('Erro no auto-ping:', err.message);
  });
}, 5 * 60 * 1000); // 5 minutos
