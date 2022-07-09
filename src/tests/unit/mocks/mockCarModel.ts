import { Car } from '../../../interfaces/CarInterface';

export const ID_MONGO = "4edd40c86762e0fb12000003";
export const ID_MONGO_INVALID = "abcd123";
export const ID_ITEM_NOTFOUND = "999999999999999999999999";

export const carMock: Car = {
  model: "Ferrari Maranello",
  year: 1963,
  color: "red",
  buyValue: 3500000,
  seatsQty: 2,
  doorsQty: 2,
}

export const carMockCreated = {
  _id: ID_MONGO,
  ...carMock,
}

export const carMockBadRequest: Car = {
  model: "Ferrari Maranello",
  year: 1963,
  color: "red",
  buyValue: 3500000,
  seatsQty: 2,
  doorsQty: 0,
}

export const carMockUpdate: Car = {
  model: "Ferrari Marinelo",
  year: 1965,
  color: "red",
  buyValue: 3500000,
  seatsQty: 2,
  doorsQty: 2,
}

export const carMockUpdated = {
  _id: ID_MONGO,
  ...carMockUpdate
}