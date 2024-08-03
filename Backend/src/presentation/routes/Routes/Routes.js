import express from 'express';
import { cors } from '../Middleware/Cors.js';
import UserRouter from './User/UserRoutes.js';
import UrlRouter from './Url/UrlRoutes.js';

export const app = express();

app.use(express.json());
app.use(cors);
//app.use(authentication);

app.use('/user', UserRouter);
app.use('/url', UrlRouter);
app.use('/auth/url', UrlRouter);
