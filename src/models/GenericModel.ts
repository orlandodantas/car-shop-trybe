import { isValidObjectId, Model } from 'mongoose';
import { Model as ModelGeneric } from '../interfaces/ModelInterface';
import HttpErrors from '../utils/HttpErrors';

const ID_MONGO_INVALID = 'Object not found';

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
    if (!isValidObjectId(id)) {
      throw HttpErrors.NotFound(ID_MONGO_INVALID);
    }

    console.log(isValidObjectId(id), id);

    const entityData = await this._modelMongoose.findById(id);

    return entityData;
  }

  public async update(id: string, entity: T): Promise<T | null> {
    if (!isValidObjectId(id)) {
      throw HttpErrors.NotFound(ID_MONGO_INVALID);
    }

    console.log('ID model: ', id);

    const entityData = await this._modelMongoose
      .findOneAndUpdate({ _id: id }, entity, { returnOriginal: false });

    console.log('retorned id: ', entityData?.id);
    return entityData;
  }

  public async delete(id: string): Promise<T | null> {
    if (!isValidObjectId(id)) {
      throw HttpErrors.NotFound(ID_MONGO_INVALID);
    }

    await this._modelMongoose.deleteOne({ _id: id });

    return null;
  }
}
