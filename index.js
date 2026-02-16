// Fish Audio API Proxy for Render/Node.js
const http = require('http');
const https = require('https');

const PORT = process.env.PORT || 3000;

const server = http.createServer(async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const targetUrl = `https://api.fish.audio${req.url}`;
  
  // 收集请求体
  let body = [];
  req.on('data', chunk => body.push(chunk));
  req.on('end', () => {
    body = Buffer.concat(body);
    
    const url = new URL(targetUrl);
    const options = {
      hostname: url.hostname,
      port: 443,
      path: url.pathname + url.search,
      method: req.method,
      headers: { ...req.headers, host: url.hostname },
    };
    delete options.headers['host'];
    options.headers['host'] = url.hostname;

    const proxyReq = https.request(options, (proxyRes) => {
      res.writeHead(proxyRes.statusCode, proxyRes.headers);
      proxyRes.pipe(res);
    });

    proxyReq.on('error', (e) => {
      res.writeHead(502);
      res.end(JSON.stringify({ error: e.message }));
    });

    if (body.length > 0) {
      proxyReq.write(body);
    }
    proxyReq.end();
  });
});

server.listen(PORT, () => {
  console.log(`Fish Audio Proxy running on port ${PORT}`);
});
