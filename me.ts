import {Router} from 'express';import {auth} from '../auth';import {pool} from '../db';
const r=Router();r.get('/',auth,async(req,res)=>{const q=await pool.query('SELECT id,name,phone,role,created_at FROM users WHERE id=$1',[(req as any).user.sub]);res.json({user:q.rows[0]})});export default r;
