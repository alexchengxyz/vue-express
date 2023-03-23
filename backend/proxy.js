import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();
const port = 8001;

app.use(
  '/api',
  createProxyMiddleware({
    target: 'http://127.0.0.1:8000',
    changeOrigin: true,
  })
);

app.listen(port, function () {
  console.log(`Server running on port ${port}!`);
})
