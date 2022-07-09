// import { Model } from 'mongoose';
import { Car } from '../interfaces/CarInterface';
import { ICarModel } from '../interfaces/ICarModel';
import GenericModel from './GenericModel';

export default class CarModel extends GenericModel<Car> implements ICarModel {
  public async readByModel(model: string): Promise<Car[] | null> {
    const entityData = await this._modelMongoose.find({ model });

    return entityData;
  }
}
