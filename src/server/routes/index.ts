import express from 'express';

import mountainRoutes from './mountains.js';

const router = express.Router();

router.use('/mountains', mountainRoutes(router));

export default router;
