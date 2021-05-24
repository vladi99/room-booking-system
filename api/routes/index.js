import express from 'express';
import userRoute from './user'
import companyRoute from './company'
import roomRoute from './room'
import meetingRoute from './meeting'
import authRoute from './auth'
import roleRoute from './role'

const router = express.Router({ mergeParams : true });

const routes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/roles',
    route: roleRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/companies',
    route: companyRoute,
  },
  {
    path: '/companies/:companyId/rooms',
    route: roomRoute,
  },
  {
    path: '/users/:userId/meetings',
    route: meetingRoute,
  },
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
