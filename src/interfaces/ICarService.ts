import { Car } from './CarInterface';

export interface ICarService {
  create(entity: Car): Promise<Car>;
  read(): Promise<Car[]>;
  readOne(id: string): Promise<Car | null>;
  update(id: string, entity: Car): Promise<Car | null>;
  delete(id: string): Promise<void>;
  readByModel(model: string): Promise<Car[] | null>;
}
