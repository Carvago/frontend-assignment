const swaggerAutogen = require('swagger-autogen')();
const definition = {
  info: {
    title: 'Todo API',
    version: '3.0.0',
  },
  host: 'localhost:3002',
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/todoRoutes.ts', './routes/userRoutes.ts'];

swaggerAutogen(outputFile, endpointsFiles, definition);
