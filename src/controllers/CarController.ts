import { Request, Response } from 'express';
import ICarController from '../interfaces/ICarController';
import { ICarService } from '../interfaces/ICarService';
import StatusCodes from '../utils/StatusCodes';

export default class CarController implements ICarController {
  private _carService: ICarService;

  constructor(carService: ICarService) {
    this._carService = carService;

    this.create = this.create.bind(this);
    this.read = this.read.bind(this);
    this.readOne = this.readOne.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.readByModel = this.readByModel.bind(this);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const entityData = await this._carService.create(req.body);

    return res.status(StatusCodes.CREATED).json(entityData);
  }

  public async read(_req: Request, res: Response): Promise<Response> {
    const entityData = await this._carService.read();

    return res.status(StatusCodes.OK).json(entityData);
  }

  public async readOne(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const entityData = await this._carService.readOne(id);

    return res.status(StatusCodes.OK).json(entityData);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const entityData = await this._carService.update(id, req.body);

    return res.status(StatusCodes.OK).json(entityData);
  }

  public async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    await this._carService.delete(id);

    return res.status(StatusCodes.NO_CONTENT).end();
  }

  public async readByModel(req: Request, res: Response): Promise<Response> {
    const { model } = req.body;

    const entityData = await this._carService.readByModel(model);

    return res.status(StatusCodes.OK).json(entityData);
  }
}
