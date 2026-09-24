import {Request,Response,NextFunction} from 'express';
export function notFound(_req:Request,res:Response){res.status(404).json({message:'Endpoint tidak ditemukan'});}
export function errorHandler(err:any,_req:Request,res:Response,_next:NextFunction){console.error(err);res.status(500).json({message:'Terjadi kesalahan server'});}
