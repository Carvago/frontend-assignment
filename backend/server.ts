import cors from 'cors';
import express from 'express';
import config from 'dotenv';
import swaggerUi from 'swagger-ui-express';

import todoRoutes from './routes/todoRoutes';
import userRoutes from './routes/userRoutes';

import openApiDocument from './swagger/openApi.json';

config.config({path: __dirname + '/.env'});

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

app.use(todoRoutes);
app.use(userRoutes);

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(openApiDocument));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.use((_, res) => {
  res.status(404).json({error: 'URL Not Found'});
});
