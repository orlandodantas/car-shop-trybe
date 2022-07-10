import { Request, Response } from 'express';
import IMotorcycleController from '../interfaces/IMotorcycleController';
import { IMotorcycleService } from '../interfaces/IMotorcycleService';
import StatusCodes from '../utils/StatusCodes';

export default class MotorcycleController implements IMotorcycleController {
  private _motorcycleService: IMotorcycleService;

  constructor(motorcycleService: IMotorcycleService) {
    this._motorcycleService = motorcycleService;

    this.create = this.create.bind(this);
    this.read = this.read.bind(this);
    this.readOne = this.readOne.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.readByModel = this.readByModel.bind(this);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const entityData = await this._motorcycleService.create(req.body);

    return res.status(StatusCodes.CREATED).json(entityData);
  }

  public async read(_req: Request, res: Response): Promise<Response> {
    const entityData = await this._motorcycleService.read();

    return res.status(StatusCodes.OK).json(entityData);
  }

  public async readOne(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const entityData = await this._motorcycleService.readOne(id);

    return res.status(StatusCodes.OK).json(entityData);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const entityData = await this._motorcycleService.update(id, req.body);

    return res.status(StatusCodes.OK).json(entityData);
  }

  public async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    await this._motorcycleService.delete(id);

    return res.status(StatusCodes.NO_CONTENT).end();
  }

  public async readByModel(req: Request, res: Response): Promise<Response> {
    const { model } = req.body;

    const entityData = await this._motorcycleService.readByModel(model);

    return res.status(StatusCodes.OK).json(entityData);
  }
}
