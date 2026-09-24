
import express from 'express';
import cors from 'cors';
import { errorHandler } from './error';
import health from './health';
import { auth } from './auth';
import me from './me';
import orders from './orders';
import drivers from './drivers';
import admin from './admin';
import ratings from './ratings';

const app=express();
const allowed=(process.env.CORS_ORIGIN||'').split(',').map(x=>x.trim()).filter(Boolean);
app.use(cors({origin:(origin,cb)=>{
  if(!origin || allowed.length===0 || allowed.includes(origin)) return cb(null,true);
  return cb(new Error('CORS blocked'));
}}));
app.use(express.json({limit:'1mb'}));

app.get('/health',health);
app.use('/api/v1/auth',auth);
app.use('/api/v1/me',me);
app.use('/api/v1/orders',orders);
app.use('/api/v1/drivers',drivers);
app.use('/api/v1/admin',admin);
app.use('/api/v1/ratings',ratings);

app.use(errorHandler);
export default app;
