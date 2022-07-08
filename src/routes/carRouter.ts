import { Router } from 'express';
import CarFactory from '../factories/CarFactory';

const router = Router();

const carController = CarFactory.create();

router
  .post('/', carController.create)
  .get('/', carController.read)
  .get('/model', carController.readByModel)
  .get('/:id', carController.readOne)
  .put('/:id', carController.update)
  .delete('/:id', carController.delete);

export default router;
