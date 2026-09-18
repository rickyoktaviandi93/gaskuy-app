import {Router} from 'express'; import {pool} from '../db';
const r=Router();
r.get('/',async(_req,res)=>{try{await pool.query('SELECT 1');res.json({ok:true,db:true,service:'gaskuy-api'});}catch{res.status(503).json({ok:false,db:false});}});
export default r;
