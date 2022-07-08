import { isValidObjectId, Model } from 'mongoose';
import { Model as ModelGeneric } from '../interfaces/ModelInterface';

export default class GenericModel<T> implements ModelGeneric<T> {
  protected _modelMongoose: Model<T>;

  constructor(modelMongoose: Model<T>) {
    this._modelMongoose = modelMongoose;
  }

  public async create(entity: T): Promise<T> {
    const entityData = await this._modelMongoose.create(entity);

    return entityData;
  }

  public async read(): Promise<T[]> {
    const entityData = await this._modelMongoose.find();

    return entityData;
  }

  public async readOne(id: string): Promise<T | null> {
    if (!isValidObjectId(id)) return null;

    const entityData = await this._modelMongoose.findById(id);

    return entityData;
  }

  public async update(id: string, entity: T): Promise<T | null> {
    if (!isValidObjectId(id)) return null;

    const entityData = await this._modelMongoose
      .findOneAndUpdate({ _id: id }, entity, { returnOriginal: false });

    return entityData;
  }

  public async delete(id: string): Promise<T | null> {
    if (!isValidObjectId(id)) return null;

    const entityData = await this._modelMongoose.findByIdAndDelete({ _id: id });

    return entityData;
  }
}
