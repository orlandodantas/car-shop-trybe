import { expect } from 'chai';
import sinon, { SinonStub } from 'sinon';
import { CustomError } from '../../../interfaces/CustomError';
import MotorcycleModel from '../../../models/MotorcycleModel';
import MotorcycleService from '../../../services/MotorcycleService';
import { ID_ITEM_NOTFOUND, ID_MONGO, ID_MONGO_INVALID, motorcycleMock, motorcycleMockBadRequest, motorcycleMockCreated, motorcycleMockUpdate, motorcycleMockUpdated } from '../mocks/mockMotorcycle';
// import mongoose from 'mongoose';

describe('MotorcycleService', () => {
  describe('Create', () => {
    before(() => {
      sinon.stub(MotorcycleModel.prototype, 'create').resolves(motorcycleMockCreated);
    });

    after(() => {
      (MotorcycleModel.prototype.create as SinonStub).restore();
    });

    it('Success', async () => {
      const motorcycleService = new MotorcycleService(MotorcycleModel.prototype);

      const motorcycleCreated = await motorcycleService.create(motorcycleMock);

      expect(motorcycleCreated).to.be.deep.equal(motorcycleMockCreated);
    });

    it('Error -> Capacidade do motor é maior que 0', async () => {
      try {
        const motorcycleService = new MotorcycleService(MotorcycleModel.prototype);

        await motorcycleService.create(motorcycleMockBadRequest);
      } catch (err) {
        expect((err as CustomError).statusCode).to.be.equal(400);
        expect((err as CustomError).message).to.be
          .equal('"engineCapacity" must be greater than or equal to 1');
      }
    });
  });

  describe('Read', () => {
    before(() => {
      sinon.stub(MotorcycleModel.prototype, 'read').resolves([motorcycleMockCreated]);
    });

    after(() => {
      (MotorcycleModel.prototype.read as SinonStub).restore();
    });

    it('Success', async () => {
      const motorcycleService = new MotorcycleService(MotorcycleModel.prototype);

      const motorcycleFounded = await motorcycleService.read();

      expect(motorcycleFounded).to.be.deep.equal([motorcycleMockCreated]);
    });
  });

  describe('ReadOne', () => {

    it('Success', async () => {
      sinon.stub(MotorcycleModel.prototype, 'readOne').resolves(motorcycleMockCreated);

      const motorcycleService = new MotorcycleService(MotorcycleModel.prototype);

      const motorcycleFounded = await motorcycleService.readOne(ID_MONGO);

      expect(motorcycleFounded).to.be.deep.equal(motorcycleMockCreated);

      (MotorcycleModel.prototype.readOne as SinonStub).restore();
    });

    it('Error -> O ID precisa possuir 24 caracteres hexadecimal', async () => {
      try {
        const motorcycleService = new MotorcycleService(MotorcycleModel.prototype);

        await motorcycleService.readOne(ID_MONGO_INVALID);
      } catch (err) {
        expect((err as CustomError).statusCode).to.be.equal(400);
        expect((err as CustomError).message).to.be
          .equal('Id must have 24 hexadecimal characters');
      }
    });

    it('Error -> Nenhum item encontrado com o id especificado', async () => {
      sinon.stub(MotorcycleModel.prototype, 'readOne').resolves(null);
      
      try {
        const motorcycleService = new MotorcycleService(MotorcycleModel.prototype);

        await motorcycleService.readOne(ID_ITEM_NOTFOUND);
      } catch (err) {
        expect((err as CustomError).statusCode).to.be.equal(404);
        expect((err as CustomError).message).to.be
          .equal('Object not found');
      }

      (MotorcycleModel.prototype.readOne as SinonStub).restore();
    });
  });

  describe('Update', () => {

    it('Success', async () => {
      sinon.stub(MotorcycleModel.prototype, 'update').resolves(motorcycleMockUpdated);

      const motorcycleService = new MotorcycleService(MotorcycleModel.prototype);

      const motorcycleFounded = await motorcycleService.update(ID_MONGO, motorcycleMockUpdate);

      expect(motorcycleFounded).to.be.deep.equal(motorcycleMockUpdated);

      (MotorcycleModel.prototype.update as SinonStub).restore();
    });

    it('Error -> O ID precisa possuir 24 caracteres hexadecimal', async () => {
      try {
        const motorcycleService = new MotorcycleService(MotorcycleModel.prototype);

        await motorcycleService.update(ID_MONGO_INVALID, motorcycleMockUpdate);
      } catch (err) {
        expect((err as CustomError).statusCode).to.be.equal(400);
        expect((err as CustomError).message).to.be
          .equal('Id must have 24 hexadecimal characters');
      }
    });

    it('Error -> Capacidade do motor é maior que 0', async () => {
      try {
        const motorcycleService = new MotorcycleService(MotorcycleModel.prototype);

        await motorcycleService.update(ID_MONGO, motorcycleMockBadRequest);
      } catch (err) {
        expect((err as CustomError).statusCode).to.be.equal(400);
        expect((err as CustomError).message).to.be
          .equal('"engineCapacity" must be greater than or equal to 1');
      }
    });

    it('Error -> Nenhum item encontrado com o id especificado', async () => {
      sinon.stub(MotorcycleModel.prototype, 'update').resolves(null);
      
      try {
        const motorcycleService = new MotorcycleService(MotorcycleModel.prototype);

        await motorcycleService.update(ID_ITEM_NOTFOUND, motorcycleMockUpdate);
      } catch (err) {
        expect((err as CustomError).statusCode).to.be.equal(404);
        expect((err as CustomError).message).to.be
          .equal('Object not found');
      }

      (MotorcycleModel.prototype.update as SinonStub).restore();
    });
  });

  describe('Delete', () => {

    /* it('Success', async () => {
      sinon.stub(MotorcycleModel.prototype, 'delete').resolves(motorcycleMockCreated);
      
      const motorcycleService = new MotorcycleService(MotorcycleModel.prototype);
      const spy = sinon.spy(motorcycleService, 'delete');

      expect(spy('ID_MONGO')).to.be.ok;

      // Credits: https://stackoverflow.com/questions/67217406/unit-test-a-typescript-void-function-with-sinon
      (MotorcycleModel.prototype.delete as SinonStub).restore();
    }); */

    it('Success', async () => {
      sinon.stub(MotorcycleModel.prototype, 'delete').resolves(motorcycleMockCreated);
      
      const motorcycleService = new MotorcycleService(MotorcycleModel.prototype);

      const motorcycleDeleted = await motorcycleService.delete(ID_MONGO);

      expect(motorcycleDeleted).to.be.equal(undefined);
      
      (MotorcycleModel.prototype.delete as SinonStub).restore();
    });

    it('Error -> O ID precisa possuir 24 caracteres hexadecimal', async () => {
      try {
        const motorcycleService = new MotorcycleService(MotorcycleModel.prototype);

        await motorcycleService.delete(ID_MONGO_INVALID);
      } catch (err) {
        expect((err as CustomError).statusCode).to.be.equal(400);
        expect((err as CustomError).message).to.be
          .equal('Id must have 24 hexadecimal characters');
      }
    });

    it('Error -> Nenhum item encontrado com o id especificado', async () => {
      sinon.stub(MotorcycleModel.prototype, 'delete').resolves(null);
      
      try {
        const motorcycleService = new MotorcycleService(MotorcycleModel.prototype);

        await motorcycleService.delete(ID_ITEM_NOTFOUND);
      } catch (err) {
        expect((err as CustomError).statusCode).to.be.equal(404);
        expect((err as CustomError).message).to.be
          .equal('Object not found');
      }

      (MotorcycleModel.prototype.delete as SinonStub).restore();
    });
  });

  describe('ReadByModel', () => {

    it('Success', async () => {
      sinon.stub(MotorcycleModel.prototype, 'readByModel').resolves([motorcycleMockCreated]);

      const motorcycleService = new MotorcycleService(MotorcycleModel.prototype);

      const motorcycleFounded = await motorcycleService.readByModel("Ferrari Maranello");

      expect(motorcycleFounded).to.be.deep.equal([motorcycleMockCreated]);

      (MotorcycleModel.prototype.readByModel as SinonStub).restore();
    });

    it('Error -> Parâmetro model é obrigatório', async () => {
      try {
        const motorcycleService = new MotorcycleService(MotorcycleModel.prototype);

        await motorcycleService.readByModel('');
      } catch (err) {
        expect((err as CustomError).statusCode).to.be.equal(400);
        expect((err as CustomError).message).to.be
          .equal('model é obrigatório');
      }
    });

    it('Error -> Nenhum item encontrado com o id especificado', async () => {
      sinon.stub(MotorcycleModel.prototype, 'readByModel').resolves(null);
      
      try {
        const motorcycleService = new MotorcycleService(MotorcycleModel.prototype);

        await motorcycleService.readByModel("Camaro");
      } catch (err) {
        expect((err as CustomError).statusCode).to.be.equal(404);
        expect((err as CustomError).message).to.be
          .equal('Object not found');
      }

      (MotorcycleModel.prototype.readByModel as SinonStub).restore();
    });
  });
});