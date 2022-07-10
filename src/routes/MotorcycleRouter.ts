import { Router } from 'express';
import MotorcycleFactory from '../factories/MotorcycleFactory';

const router = Router();

const motorcycleController = MotorcycleFactory.create();

router
  .post('/', motorcycleController.create)
  .get('/', motorcycleController.read)
  .get('/model', motorcycleController.readByModel)
  .get('/:id', motorcycleController.readOne)
  .put('/:id', motorcycleController.update)
  .delete('/:id', motorcycleController.delete);

export default router;
