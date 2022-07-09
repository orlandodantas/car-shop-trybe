import { expect } from 'chai';
import sinon, { SinonStub } from 'sinon';
import { CustomError } from '../../../interfaces/CustomError';
// import mongoose from 'mongoose';
import CarModel from '../../../models/CarModel';
import CarService from '../../../Services/CarService';
import { carMock, carMockBadRequest, carMockCreated, carMockUpdate, carMockUpdated, ID_ITEM_NOTFOUND, ID_MONGO, ID_MONGO_INVALID } from '../mocks/mockCarModel';

describe('CarService', () => {
  describe('Create', () => {
    before(() => {
      sinon.stub(CarModel.prototype, 'create').resolves(carMockCreated);
    });

    after(() => {
      (CarModel.prototype.create as SinonStub).restore();
    });

    it('Success', async () => {
      const carService = new CarService(CarModel.prototype);

      const carCreated = await carService.create(carMock);

      expect(carCreated).to.be.deep.equal(carMockCreated);
    });

    it('Error -> Quantidade de portas é menor que 2', async () => {
      try {
        const carService = new CarService(CarModel.prototype);

        await carService.create(carMockBadRequest);
      } catch (err) {
        expect((err as CustomError).statusCode).to.be.equal(400);
        expect((err as CustomError).message).to.be
          .equal('"doorsQty" must be greater than or equal to 2');
      }
    });
  });

  describe('Read', () => {
    before(() => {
      sinon.stub(CarModel.prototype, 'read').resolves([carMockCreated]);
    });

    after(() => {
      (CarModel.prototype.read as SinonStub).restore();
    });

    it('Success', async () => {
      const carService = new CarService(CarModel.prototype);

      const carFounded = await carService.read();

      expect(carFounded).to.be.deep.equal([carMockCreated]);
    });
  });

  describe('ReadOne', () => {

    it('Success', async () => {
      sinon.stub(CarModel.prototype, 'readOne').resolves(carMockCreated);

      const carService = new CarService(CarModel.prototype);

      const carFounded = await carService.readOne(ID_MONGO);

      expect(carFounded).to.be.deep.equal(carMockCreated);

      (CarModel.prototype.readOne as SinonStub).restore();
    });

    it('Error -> O ID precisa possuir 24 caracteres hexadecimal', async () => {
      try {
        const carService = new CarService(CarModel.prototype);

        await carService.readOne(ID_MONGO_INVALID);
      } catch (err) {
        expect((err as CustomError).statusCode).to.be.equal(400);
        expect((err as CustomError).message).to.be
          .equal('Id must have 24 hexadecimal characters');
      }
    });

    it('Error -> Nenhum item encontrado com o id especificado', async () => {
      sinon.stub(CarModel.prototype, 'readOne').resolves(null);
      
      try {
        const carService = new CarService(CarModel.prototype);

        await carService.readOne(ID_ITEM_NOTFOUND);
      } catch (err) {
        expect((err as CustomError).statusCode).to.be.equal(404);
        expect((err as CustomError).message).to.be
          .equal('Object not found');
      }

      (CarModel.prototype.readOne as SinonStub).restore();
    });
  });

  describe('Update', () => {

    it('Success', async () => {
      sinon.stub(CarModel.prototype, 'update').resolves(carMockUpdated);

      const carService = new CarService(CarModel.prototype);

      const carFounded = await carService.update(ID_MONGO, carMockUpdate);

      expect(carFounded).to.be.deep.equal(carMockUpdated);

      (CarModel.prototype.update as SinonStub).restore();
    });

    it('Error -> O ID precisa possuir 24 caracteres hexadecimal', async () => {
      try {
        const carService = new CarService(CarModel.prototype);

        await carService.update(ID_MONGO_INVALID, carMockUpdate);
      } catch (err) {
        expect((err as CustomError).statusCode).to.be.equal(400);
        expect((err as CustomError).message).to.be
          .equal('Id must have 24 hexadecimal characters');
      }
    });

    it('Error -> Quantidade de portas é menor que 2', async () => {
      try {
        const carService = new CarService(CarModel.prototype);

        await carService.update(ID_MONGO, carMockBadRequest);
      } catch (err) {
        expect((err as CustomError).statusCode).to.be.equal(400);
        expect((err as CustomError).message).to.be
          .equal('"doorsQty" must be greater than or equal to 2');
      }
    });

    it('Error -> Nenhum item encontrado com o id especificado', async () => {
      sinon.stub(CarModel.prototype, 'update').resolves(null);
      
      try {
        const carService = new CarService(CarModel.prototype);

        await carService.update(ID_ITEM_NOTFOUND, carMockUpdate);
      } catch (err) {
        expect((err as CustomError).statusCode).to.be.equal(404);
        expect((err as CustomError).message).to.be
          .equal('Object not found');
      }

      (CarModel.prototype.update as SinonStub).restore();
    });
  });

  describe('Delete', () => {

    it('Success', async () => {
      sinon.stub(CarModel.prototype, 'delete').resolves(carMockCreated);
      
      const carService = new CarService(CarModel.prototype);
      const spy = sinon.spy(carService, 'delete');

      expect(spy('ID_MONGO')).to.be.ok;

      // Credits: https://stackoverflow.com/questions/67217406/unit-test-a-typescript-void-function-with-sinon
      (CarModel.prototype.delete as SinonStub).restore();
    });

    it('Error -> O ID precisa possuir 24 caracteres hexadecimal', async () => {
      try {
        const carService = new CarService(CarModel.prototype);

        await carService.delete(ID_MONGO_INVALID);
      } catch (err) {
        expect((err as CustomError).statusCode).to.be.equal(400);
        expect((err as CustomError).message).to.be
          .equal('Id must have 24 hexadecimal characters');
      }
    });

    it('Error -> Nenhum item encontrado com o id especificado', async () => {
      sinon.stub(CarModel.prototype, 'delete').resolves(null);
      
      try {
        const carService = new CarService(CarModel.prototype);

        await carService.delete(ID_ITEM_NOTFOUND);
      } catch (err) {
        expect((err as CustomError).statusCode).to.be.equal(404);
        expect((err as CustomError).message).to.be
          .equal('Object not found');
      }

      (CarModel.prototype.delete as SinonStub).restore();
    });
  });

  describe('ReadByModel', () => {

    it('Success', async () => {
      sinon.stub(CarModel.prototype, 'readByModel').resolves([carMockCreated]);

      const carService = new CarService(CarModel.prototype);

      const carFounded = await carService.readByModel("Ferrari Maranello");

      expect(carFounded).to.be.deep.equal([carMockCreated]);

      (CarModel.prototype.readByModel as SinonStub).restore();
    });

    it('Error -> Parâmetro model é obrigatório', async () => {
      try {
        const carService = new CarService(CarModel.prototype);

        await carService.readByModel('');
      } catch (err) {
        expect((err as CustomError).statusCode).to.be.equal(400);
        expect((err as CustomError).message).to.be
          .equal('model é obrigatório');
      }
    });

    it('Error -> Nenhum item encontrado com o id especificado', async () => {
      sinon.stub(CarModel.prototype, 'readByModel').resolves(null);
      
      try {
        const carService = new CarService(CarModel.prototype);

        await carService.readByModel("Camaro");
      } catch (err) {
        expect((err as CustomError).statusCode).to.be.equal(404);
        expect((err as CustomError).message).to.be
          .equal('Object not found');
      }

      (CarModel.prototype.readByModel as SinonStub).restore();
    });
  });
});