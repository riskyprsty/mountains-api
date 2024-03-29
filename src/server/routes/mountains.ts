import type { Router } from 'express';
import { getMountains, getMountain } from '../controllers/mountains.js';

const mountainRoutes = (router: Router) => {
  router.get('/mountains', getMountains);
  router.get('/mountain/:name', getMountain);

  return router;
};

export default mountainRoutes;
