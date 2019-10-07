import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import MeetupController from './app/controllers/MeetupController';

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
//routes.post('/meetups', MeetupController.store);
//routes.put('/meetups', MeetupController.update);
//routes.delete('/meetups', MeetupController.delete);

export default routes;
