import { Router } from 'express';
import UserRouter from './Users';
import DriverRouter from './Drivers';
import RaceRouter from './Races';
import ResultRouter from './Results';
// Init router and path
const router = Router();

// Add sub-routes
router.use('/users', UserRouter);
router.use('/drivers', DriverRouter);
router.use('/races', RaceRouter)
router.use('/results', ResultRouter)
// Export the base-router
export default router;
