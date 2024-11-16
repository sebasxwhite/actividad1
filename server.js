const http = require('http');
const fs = require('fs');
const PORT = 4000;

const server = http.createServer((req, res) => {
    if (req.url === "/" && req.method === 'GET') {
        fs.readFile('formulario.html', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end("Error 500: Interno del Servidor");
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else if (req.url === '/submit' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const params = new URLSearchParams(body);

            // Asegúrate de que los valores existan antes de utilizarlos
            const nombre = params.get('nombre') || 'No proporcionado';
            const edad = params.get('edad') || 'No proporcionada';
            const email = params.get('email') || 'No proporcionado';
            const cursos = params.get('cursos') || 'No proporcionado';

            console.log(`
            === Datos Recibidos ===
            Nombre: ${nombre}
            Edad: ${edad}
            Correo Electrónico: ${email}
            Curso: ${cursos}
            `);
    
            // Respuesta al cliente
            const respuesta = `
            ✅ ¡Formulario enviado correctamente!
            
            📋 Datos Recibidos:
            - Nombre: ${nombre}
            - Edad: ${edad}
            - Correo Electrónico: ${email}
            - Curso: ${cursos}
            `;

            console.log(`Nombre: ${nombre}`);
            console.log(`Edad: ${edad}`);
            console.log(`Correo Electrónico: ${email}`);
            console.log(`Curso: ${cursos}`);

            res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end(respuesta);
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end("Error 404: Not Found");
    }
});

server.listen(PORT, () => {
    console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});