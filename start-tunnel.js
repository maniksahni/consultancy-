const localtunnel = require('localtunnel');
const fs = require('fs');
const path = require('path');

const urlFilePath = path.join(__dirname, 'tunnel_url.txt');

(async () => {
  try {
    const tunnel = await localtunnel({ port: 3000 });
    console.log('>>> PUBLIC_URL:', tunnel.url);
    fs.writeFileSync(urlFilePath, tunnel.url + '\n');
    
    tunnel.on('close', () => {
      console.log('Tunnel closed');
    });
    tunnel.on('error', (err) => {
      console.error('Tunnel error:', err);
    });
  } catch (e) {
    console.error('Failed to create tunnel:', e);
    fs.writeFileSync(urlFilePath, 'ERROR: ' + e.message + '\n');
  }
})();
