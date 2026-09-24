import jwt from 'jsonwebtoken'; import {Request,Response,NextFunction} from 'express';
const secret=()=>process.env.JWT_SECRET||'dev-only';
export const sign=(id:string,role:string)=>jwt.sign({sub:id,role},secret(),{expiresIn:'7d'});
export function auth(req:Request,res:Response,next:NextFunction){try{const h=req.headers.authorization||'';(req as any).user=jwt.verify(h.startsWith('Bearer ')?h.slice(7):'',secret());next()}catch{res.status(401).json({message:'Unauthorized'})}}
export function role(...roles:string[]){return (req:Request,res:Response,next:NextFunction)=>roles.includes((req as any).user?.role)?next():res.status(403).json({message:'Forbidden'})}
