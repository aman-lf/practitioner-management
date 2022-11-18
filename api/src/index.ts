import cors from 'cors';
import dotenv from 'dotenv';
import express, { Application } from 'express';

import router from './routes/';
import logger from './utils/logger';
import * as errorHandler from './middlewares/errorHandler';

dotenv.config();

// Initializes express app
const app: Application = express();

const PORT: String = process.env.APP_PORT || '3001';

app.use(cors());
app.use(errorHandler.bodyParser);
app.use(express.json({ limit: '50mb' }));

// API Routes
app.use('/api', router);

// Error middleware
app.use(errorHandler.genericErrorHandler);
app.use(errorHandler.notFound);

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
