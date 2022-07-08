import CarController from '../controllers/CarController';
import ICarController from '../interfaces/ICarController';
import CarModel from '../models/CarModel';
import CarMongooseModel from '../models/schemas/CarSchema';
import CarService from '../Services/CarService';

export default class CarFactory {
  public static create(): ICarController {
    const carModel = new CarModel(CarMongooseModel);
    const carService = new CarService(carModel);
    const carController = new CarController(carService);

    return carController;
  }
}
