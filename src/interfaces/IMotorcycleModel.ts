import { Model } from './ModelInterface';
import { Motorcycle } from './MotorcycleInterface';

export interface IMotorcycleModel extends Model<Motorcycle> {
  readByModel(model: string): Promise<Motorcycle[] | null>;
}
