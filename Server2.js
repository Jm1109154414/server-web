//'http' se usa para crear servidores web que manejan solicitudes HTTP y envían respuestas.
import http from 'http';
//'fs' se usa para interactuar con el sistema de archivos, como leer o escribir archivos.
import fs from 'fs';


    //Esta función deberá mostrar deberá mostrar una página HTML 
    //con la bienvenida a tu proyecto
    function darBienvenida(req, res) {
       //Agrega lo mínimo necesario en bienvenida.html
       
      
      fs.readFile('bienvenida.html', 'utf8', (error, data) => {
        if (error) {
           //Escribe qué significa el 500 
           //500 es un código de estado HTTP que indica un error interno del servidor, lo que significa que algo salió mal en el servidor al procesar la solicitud.
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Oh no!!!!');
          return;
        }
        //Escribe qué significa el 200
        //200 es un código de estado HTTP que indica que la solicitud se ha procesado correctamente y que el servidor ha enviado la respuesta esperada.
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    });
    }


    //Esta función deberá enviar un json con los datos de los usuarios
    function getUsuarios(req, res) {
        //Esto representa un objeto JSON de un usuario
        //Agrega otro usuario
        const usuarios = [
            {
                "nombre": "Punk",
                "saldo": "0"
            },
            {
                "nombre": "Jose",
                "saldo": "100"
            }
        ];
      res.writeHead(200, { 'Content-Type': 'application/json' });
      
      //Escribe qué hace la función stringify y por qué la tenemos que usar
      //Convierte el array (o cualquier objeto) a una cadena JSON válida,
      res.end(JSON.stringify(usuarios));
    }

  
    function mostrarPerfil(req, res) {
        fs.readFile('perfil.html', 'utf8', (error, data) => {
            if (error) {
              res.writeHead(500, { 'Content-Type': 'text/plain' });
              res.end('Oh no!!!!');
              return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
      }

     
      function mostrarMovimientos(req, res) {
        //Construye una página básica movimientos.html
        fs.readFile('movimientos.html', 'utf8', (error, data) => {
            if (error) {
              res.writeHead(500, { 'Content-Type': 'text/plain' });
              res.end('Oh no!!!!');
              return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
      }

    //Esta función deberá enviar un json con los datos de las movimientos
    function getMovimientos(req, res) {
    //Tienes que corregir varias cosas en esta sección
        const movimientos = [
            {
                "tipo": "Depósito",
                "monto": "$100"
            }
        ];
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(movimientos));
    }

    function manejarRuta404(req, res) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      //Cambia el mensaje por algo más divertido
      res.end('!Ooops! Hay fiesta en esta ruta pero no estas invitado!');
    }

    function mostrarEquipo(req, res) {
        fs.readFile('equipo.html', 'utf8', (error, data) => {
            if (error) {
              res.writeHead(500, { 'Content-Type': 'text/plain' });
              res.end('Oh no!!!!');
              return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
      }
      function mostrarSaldo(req, res) {
        fs.readFile('saldo.html', 'utf8', (error, data) => {
            if (error) {
              res.writeHead(500, { 'Content-Type': 'text/plain' });
              res.end('Oh no!!!!');
              return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
      }


      function mostrarOpinion(req, res) {
        fs.readFile('opinion.html', 'utf8', (error, data) => {
            if (error) {
              res.writeHead(500, { 'Content-Type': 'text/plain' });
              res.end('Oh no!!!!');
              return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
      }


    //incluye el enlace a la documentación de createServer
    //https://nodejs.org/api/http.html#httpcreateserverrequestlistener
    const servidor = http.createServer((req, res) => {
      const url = req.url;

      if (url === '/') {
        darBienvenida(req, res);
      } else if (url === '/api/usuarios') {
        getUsuarios(req, res);
      } else if (url === '/api/movimientos') {
        getMovimientos(req, res);
      } 
      else if (url === '/usuarios') {
        mostrarPerfil(req, res);
      } 
      else if (url === '/movimientos') {
        mostrarMovimientos(req, res);
      } else if (url === '/equipo') {
        mostrarEquipo(req, res);
      } else if (url === '/opinion') {
        mostrarOpinion(req, res);
      }
      //Agrega una ruta /equipo y su función correspondiente para que muestre el equipo del proyecto
      //Haz una página equipo.html correspondiente
      //Escribe el nombre completo y una cualidad que valores en esa persona de tu equipo
      //Trata de agregar una imagen a equipo.html
      //Explica si la puedes ver, en caso negativo ¿qué crees que pase?

      //Agrega una ruta /opinion
      //Haz una página opinion.html
      // Lee el siguiente artículo y responde ¿Crees que el colonialismo digital es un riesgo para tu carrera profesionl? ¿Para tu vida persona?
      //¿Qué es el freedombox?
      //https://www.aljazeera.com/opinions/2019/3/13/digital-colonialism-is-threatening-the-global-south
      
      
      // tenemos que usar esto para las imagenes porque el navegador hace una solicitud para obtener la imagen y el servidor tiene que responder con el archivo de imagen correcto. Si no manejamos esta solicitud, el navegador no podrá mostrar la imagen en la página web.
      else if (url.endsWith('.jpeg') || url.endsWith('.jpg') || url.endsWith('.png') || url.endsWith('.gif')) {
        fs.readFile(url.substring(1), (error, data) => {
          if (error) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Imagen no encontrada');
            return;
          }
          const contentType = url.endsWith('.png') ? 'image/png' : 'image/jpeg';
          res.writeHead(200, { 'Content-Type': contentType });
          res.end(data);
        });
      }
      else {
        manejarRuta404(req, res);
      }
    });

    const puerto = 1984;
    servidor.listen(puerto, () => {
      console.log(`Servidor escuchando en el puerto ${puerto}`);
    });

    //Importante
    //En esta actividad deberás agregar en miarchivo.html un enlace a servidor.js y al resto de los html