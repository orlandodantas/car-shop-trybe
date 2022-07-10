import Joi from 'joi';
import { IMotorcycleModel } from '../interfaces/IMotorcycleModel';
import { IMotorcycleService } from '../interfaces/IMotorcycleService';
import { Motorcycle } from '../interfaces/MotorcycleInterface';
import HttpErrors from '../utils/HttpErrors';

const ITEM_NOTFOUND = 'Object not found';

export default class MotorcycleService implements IMotorcycleService {
  private _motorcycleModel: IMotorcycleModel;

  constructor(motorcycleModel: IMotorcycleModel) {
    this._motorcycleModel = motorcycleModel;
  }

  public async create(entity: Motorcycle): Promise<Motorcycle> {
    MotorcycleService.validateData(entity);

    const entityData = await this._motorcycleModel.create(entity);

    return entityData;
  }

  public async read(): Promise<Motorcycle[]> {
    const entityData = await this._motorcycleModel.read();

    return entityData;
  }

  public async readOne(id: string): Promise<Motorcycle | null> {
    MotorcycleService.verifyIdLength(id);
    
    const entityData = await this._motorcycleModel.readOne(id);

    if (!entityData) {
      throw HttpErrors.NotFound(ITEM_NOTFOUND);
    }

    return entityData;
  }

  public async update(id: string, entity: Motorcycle): 
  Promise<Motorcycle | null> {
    MotorcycleService.verifyIdLength(id);
    MotorcycleService.validateData(entity);

    const entityData = await this._motorcycleModel.update(id, entity);

    if (!entityData) {
      throw HttpErrors.NotFound(ITEM_NOTFOUND);
    }

    return entityData;
  }

  public async delete(id: string): Promise<void> {
    MotorcycleService.verifyIdLength(id);
    const entityData = await this._motorcycleModel.delete(id);

    if (!entityData) {
      throw HttpErrors.NotFound(ITEM_NOTFOUND);
    }
  }

  public async readByModel(model: string): Promise<Motorcycle[] | null> {
    if (!model) throw HttpErrors.BadRequest('model é obrigatório');

    const entityData = await this._motorcycleModel.readByModel(model);

    if (!entityData) {
      throw HttpErrors.NotFound(ITEM_NOTFOUND);
    }

    return entityData;
  }

  private static validateData(entity: Motorcycle): void {
    const schema = Joi.object({
      _id: Joi.string(),
      model: Joi.string().min(3).required(),
      year: Joi.number().min(1900).max(2022).required(),
      color: Joi.string().min(3).required(),
      status: Joi.boolean().optional(),
      buyValue: Joi.number().integer().required(),
      category: Joi.string().valid('Street', 'Custom', 'Trail').required(),
      engineCapacity: Joi.number().integer().min(1).max(2500)
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
