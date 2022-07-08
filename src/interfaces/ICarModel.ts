import { Car } from './CarInterface';
import { Model } from './ModelInterface';

export interface ICarModel extends Model<Car> {
  readByModel(model: string): Promise<Car[] | null>;
}
