import MotorcycleController from '../controllers/MotorcycleController';
import IMotorcycleController from '../interfaces/IMotorcycleController';
import MotorcycleModel from '../models/MotorcycleModel';
import MotorcycleMongooseModel from '../models/schemas/MotorcycleSchema';
import MotorcycleService from '../services/MotorcycleService';

export default class MotorcycleFactory {
  public static create(): IMotorcycleController {
    const motorcycleModel = new MotorcycleModel(MotorcycleMongooseModel);
    const motorcycleService = new MotorcycleService(motorcycleModel);
    const motorcycleController = new MotorcycleController(motorcycleService);

    return motorcycleController;
  }
}