import { model, Schema } from 'mongoose';
import { Car } from '../../interfaces/CarInterface';

const carSchema = new Schema<Car>({
  model: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
    min: [1900, 'o carro precisa ser lançado depois de 1900'],
    max: 2022,
  },
  color: {
    type: String,
    required: true,
    min: 3,
  },
  status: {
    type: Boolean,
    required: false,
  },
  buyValue: {
    type: Number,
    required: true,
  },
  doorsQty: {
    type: Number,
    required: true,
    min: 2,
    max: 4,
  },
  seatsQty: {
    type: Number,
    required: true,
    min: 2,
    max: 7,
  },
}, {
  versionKey: false,
});

const CarMongooseModel = model<Car>('car', carSchema);

export default CarMongooseModel;
