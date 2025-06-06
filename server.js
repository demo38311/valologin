const http = require('http');
const fs = require('fs');
const path = require('path');

const CREDENTIALS_FILE = path.join(__dirname, 'credentials.txt');

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins for development
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    if (req.url === '/credentials' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            // Append credentials to the file
            fs.appendFile(CREDENTIALS_FILE, body + '\n', (err) => {
                if (err) {
                    console.error('Error writing to credentials file:', err);
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'Failed to save credentials.' }));
                    return;
                }
                console.log('Credentials saved:', body);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Credentials saved successfully.' }));
            });
        });
    } else if (req.url === '/credentials' && req.method === 'GET') {
        // Read all credentials from the file
        fs.readFile(CREDENTIALS_FILE, 'utf8', (err, data) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    // File does not exist, return empty array
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify([]));
                } else {
                    console.error('Error reading credentials file:', err);
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'Failed to retrieve credentials.' }));
                }
                return;
            }
            const credentials = data.split('\n').filter(line => line.trim() !== '');
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(credentials));
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Not Found' }));
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});