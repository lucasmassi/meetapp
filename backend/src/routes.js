import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import MeetupController from './app/controllers/MeetupController';
import SubscriptionController from './app/controllers/SubscriptionController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

// Guest
routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

// Middleware de autenticação
routes.use(authMiddleware);

// Auth
routes.put('/users', UserController.update);
// Files
routes.post('/files', upload.single('file'), FileController.store);

// Meetups
routes.get('/meetups', MeetupController.index);
routes.get('/meetups/:id', MeetupController.findById);
routes.post('/meetups', MeetupController.store);
routes.put('/meetups/:id', MeetupController.update);
routes.delete('/meetups/:id', MeetupController.delete);

// Subscriptions
routes.get('/subscriptions', SubscriptionController.index);
routes.post('/subscriptions', SubscriptionController.store);
routes.delete('/subscriptions/:id', SubscriptionController.delete);

export default routes;
