import { Router } from 'express';
import UserRouter from './Users';
import DriverRouter from './Drivers';
import RaceRouter from './Races';
// Init router and path
const router = Router();

// Add sub-routes
router.use('/users', UserRouter);
router.use('/drivers', DriverRouter);
router.use('/races', RaceRouter)

// Export the base-router
export default router;
