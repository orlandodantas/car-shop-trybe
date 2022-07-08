import { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import { CustomError } from '../interfaces/CustomError';
import StatusCodes from '../utils/StatusCodes';

const handleError = (
  err: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction,
): Response => {
  if (err.statusCode) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  console.info(err);

  return res
    .status(StatusCodes.SERVER_ERROR)
    .json({ error: 'Erro interno no servidor' });
};

export default handleError;
