import { Request, Response, NextFunction } from "express";

const logUrls = (req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}`);
  next();
}

export {
  logUrls
}