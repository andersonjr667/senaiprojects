const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use('/', createProxyMiddleware({
  target: 'https://3f7c-177-39-9-218.ngrok-free.app', // seu link do ngrok aqui
  changeOrigin: true,
  secure: false,
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy online na porta ${PORT}`);
});
