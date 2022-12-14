import { Request, Response } from 'express';

export default interface ICarController {
  create(req: Request, res: Response): Promise<Response>;
  read(req: Request, res: Response): Promise<Response>;
  readOne(req: Request, res: Response): Promise<Response>;
  update(req: Request, res: Response): Promise<Response>;
  delete(req: Request, res: Response): Promise<void>;
  readByModel(req: Request, res: Response): Promise<Response>;
}
