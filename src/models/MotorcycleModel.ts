import { IMotorcycleModel } from '../interfaces/IMotorcycleModel';
import { Motorcycle } from '../interfaces/MotorcycleInterface';
import GenericModel from './GenericModel';

export default class MotorcycleModel extends GenericModel<Motorcycle>
  implements IMotorcycleModel {
  public async readByModel(model: string): Promise<Motorcycle[] | null> {
    const entityData = await this._modelMongoose.find({ model });

    return entityData;
  }
}
