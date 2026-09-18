import {Router} from 'express'; import {auth,role} from '../auth'; import {pool} from '../db';
const r=Router();
r.get('/dashboard',auth,role('ADMIN'),async(_,res)=>{const [u,d,o]=await Promise.all([pool.query('SELECT count(*) n FROM users'),pool.query('SELECT count(*) n FROM drivers'),pool.query('SELECT count(*) n FROM orders')]);res.json({users:u.rows[0].n,drivers:d.rows[0].n,orders:o.rows[0].n})});
r.get('/drivers/pending',auth,role('ADMIN'),async(_,res)=>res.json({drivers:(await pool.query(`SELECT d.*,u.name,u.phone FROM drivers d JOIN users u ON u.id=d.id WHERE d.is_verified=false`)).rows}));
r.post('/drivers/:id/verify',auth,role('ADMIN'),async(req,res)=>{await pool.query('UPDATE drivers SET is_verified=$1 WHERE id=$2',[Boolean(req.body.verified),req.params.id]);res.json({ok:true})});
r.get('/orders',auth,role('ADMIN'),async(_,res)=>res.json({orders:(await pool.query('SELECT * FROM orders ORDER BY created_at DESC LIMIT 100')).rows}));
export default r;
