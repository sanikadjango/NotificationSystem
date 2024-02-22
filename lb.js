const express = require('express');
const httpProxy = require('http-proxy');

const loadBalancer = express();
const proxy = httpProxy.createProxyServer();

const nodeServiceUrls = [
  'http://localhost:3001',
  //'http://localhost:3002',
];

loadBalancer.use((req, res) => {
  // Use a simple round-robin strategy for load balancing
  const targetUrl = nodeServiceUrls.shift();
  nodeServiceUrls.push(targetUrl);

  proxy.web(req, res, { target: targetUrl });
});

const port = 3000;
loadBalancer.listen(port, () => {
  console.log(`Load Balancer is running on http://localhost:${port}`);
});

