// import { Model } from 'mongoose';
import { Car } from '../interfaces/CarInterface';
import { ICarModel } from '../interfaces/ICarModel';
import GenericModel from './GenericModel';

export default class CarModel extends GenericModel<Car> implements ICarModel {
  /* constructor(modelMongoose: Model<Car>) {
    super(modelMongoose);
  } */

  public async readByModel(model: string): Promise<Car[] | null> {
    const entityData = await super._modelMongoose.find({ model });

    return entityData;
  }
}
