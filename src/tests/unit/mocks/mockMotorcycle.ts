import { Motorcycle } from '../../../interfaces/MotorcycleInterface';


export const ID_MONGO = "4edd40c86762e0fb12000003";
export const ID_MONGO_INVALID = "abcd123";
export const ID_ITEM_NOTFOUND = "999999999999999999999999";

export const motorcycleMock: Motorcycle = {
  model: "Honda CG Titan 125",
  year: 1963,
  color: "red",
  buyValue: 3500,
  category: "Street",
  engineCapacity: 125
}

export const motorcycleMockCreated = {
  _id: ID_MONGO,
  ...motorcycleMock,
}

export const motorcycleMockBadRequest: Motorcycle = {
  model: "Honda CG Titan 125",
  year: 1963,
  color: "red",
  buyValue: 3500,
  category: "Street",
  engineCapacity: 0
}

export const motorcycleMockUpdate: Motorcycle = {
  model: "YBR Yamaha 125",
  year: 1999,
  color: "red",
  buyValue: 3500,
  category: "Street",
  engineCapacity: 125
}

export const motorcycleMockUpdated = {
  _id: ID_MONGO,
  ...motorcycleMockUpdate
}