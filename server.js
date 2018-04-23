const Hapi = require('hapi');
const fs = require('fs');


const server = new Hapi.Server();

const tls = {
    key: fs.readFileSync('/path/to/private/key.pem'),
    cert: fs.readFileSync('/path/to/cert.pem'),
};

server.connection({
    tls,
    address: '0.0.0.0',
    port: 443,
});

server.connection({
    address: '0.0.0.0',
    port: 80,
});

server.route({
    method: 'GET',
    path: '/',
    handler: (request, reply) => {
        reply('Hello!');
    },
});

server.start((err) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    else {
        console.log(`Service started: ${new Date()}`);
    }
});