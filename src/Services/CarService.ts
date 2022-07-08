import Joi from 'joi';
import { Car } from '../interfaces/CarInterface';
import { ICarModel } from '../interfaces/ICarModel';
import { ICarService } from '../interfaces/ICarService';
import HttpErrors from '../utils/HttpErrors';

const ITEM_NOTFOUND = 'Object not found';

export default class CarService implements ICarService {
  private _carModel: ICarModel;

  constructor(carModel: ICarModel) {
    this._carModel = carModel;
  }

  public async create(entity: Car): Promise<Car> {
    if (!entity || Object.keys(entity).length === 0) {
      throw HttpErrors.BadRequest('O objeto não pode está vazio');
    }

    CarService.validateData(entity);

    const entityData = await this._carModel.create(entity);

    return entityData;
  }

  public async read(): Promise<Car[]> {
    const entityData = await this._carModel.read();

    return entityData;
  }

  public async readOne(id: string): Promise<Car | null> {
    CarService.verifyIdLength(id);
    
    const entityData = await this._carModel.readOne(id);

    if (!entityData) {
      throw HttpErrors.NotFound(ITEM_NOTFOUND);
    }

    return entityData;
  }

  public async update(id: string, entity: Car): Promise<Car | null> {
    CarService.verifyIdLength(id);
    CarService.validateData(entity);

    const entityData = await this._carModel.update(id, entity);

    if (!entityData) {
      throw HttpErrors.NotFound(ITEM_NOTFOUND);
    }

    return entityData;
  }

  public async delete(id: string): Promise<void> {
    CarService.verifyIdLength(id);
    const entityData = await this._carModel.delete(id);

    if (!entityData) {
      throw HttpErrors.NotFound(ITEM_NOTFOUND);
    }
  }

  public async readByModel(model: string): Promise<Car[] | null> {
    if (!model) throw HttpErrors.BadRequest('model é obrigatório');

    const entityData = await this._carModel.readByModel(model);

    if (!entityData) {
      throw HttpErrors.NotFound(ITEM_NOTFOUND);
    }

    return entityData;
  }

  private static validateData(entity: Car): void {
    const schema = Joi.object({
      _id: Joi.string(),
      model: Joi.string().min(3).required(),
      year: Joi.number().min(1900).max(2022).required(),
      color: Joi.string().min(3).required(),
      status: Joi.boolean().optional(),
      buyValue: Joi.number().integer().required(),
      doorsQty: Joi.number().integer().min(2).max(4)
        .required(),
      seatsQty: Joi.number().integer().min(2).max(7)
        .required(),
    });

    const { error } = schema.validate(entity);

    if (error) throw HttpErrors.BadRequest(error.message);
  }

  private static verifyIdLength(id: string): void {
    const idLength = id.length;

    if (idLength < 24) {
      throw HttpErrors.BadRequest('Id must have 24 hexadecimal characters');
    }
  }
}
