import { expect } from 'chai';
import mongoose from 'mongoose';
import sinon, { SinonStub } from 'sinon';
import CarModel from '../../../models/CarModel';
import CarMongooseModel from '../../../models/schemas/CarSchema';
import { carMock, carMockCreated, carMockUpdate, carMockUpdated, ID_MONGO, ID_MONGO_INVALID } from '../mocks/mockCarModel';

describe('CarModel', () => {
  describe('Create', () => {
    before(() => {
      sinon.stub(mongoose.Model, 'create').resolves(carMockCreated);
    });

    after(() => {
      (mongoose.Model.create as SinonStub).restore();
    })

    it('Success', async () => {
      const carModel = new CarModel(CarMongooseModel);

      const carCreated = await carModel.create(carMock);

      expect(carCreated).to.be.deep.equal(carMockCreated);
    });
  });

  describe('read', () => {
    
    before(() => {
      sinon.stub(mongoose.Model, 'find').resolves([carMockCreated]);
    });

    after(() => {
      (mongoose.Model.find as SinonStub).restore();
    })

    it('Success', async () => {
      const carModel = new CarModel(CarMongooseModel);

      const carFound = await carModel.read();

      expect(carFound).to.be.deep.equal([carMockCreated]);
    });
  });

  describe('readOne', () => {
    
    before(() => {
      sinon.stub(mongoose.Model, 'findById').resolves(carMockCreated);
    });

    after(() => {
      (mongoose.Model.findById as SinonStub).restore();
    })

    it('Success', async () => {
      const carModel = new CarModel(CarMongooseModel);

      const carFound = await carModel.readOne(ID_MONGO);

      expect(carFound).to.be.deep.equal(carMockCreated);
    });

    it('Error', async () => {
      const carModel = new CarModel(CarMongooseModel);

      const carFound = await carModel.readOne(ID_MONGO_INVALID);

      expect(carFound).to.be.equal(null);
    });
  });

  describe('update', () => {
    
    before(() => {
      sinon.stub(mongoose.Model, 'findOneAndUpdate').resolves(carMockUpdated);
    });

    after(() => {
      (mongoose.Model.findOneAndUpdate as SinonStub).restore();
    })

    it('Success', async () => {
      const carModel = new CarModel(CarMongooseModel);

      const carUpdated = await carModel.update(ID_MONGO, carMockUpdate);

      expect(carUpdated).to.be.deep.equal(carMockUpdated);
    });

    it('Error', async () => {
      const carModel = new CarModel(CarMongooseModel);

      const carUpdated = await carModel.update(ID_MONGO_INVALID, carMockUpdate);

      expect(carUpdated).to.be.equal(null);
    });
  });

  describe('delete', () => {
    
    before(() => {
      sinon.stub(mongoose.Model, 'findOneAndDelete').resolves(carMockCreated);
    });

    after(() => {
      (mongoose.Model.findOneAndDelete as SinonStub).restore();
    })

    it('Success', async () => {
      const carModel = new CarModel(CarMongooseModel);

      const carDeleted = await carModel.delete(ID_MONGO);

      expect(carDeleted).to.be.deep.equal(carMockCreated);
    });

    it('Error', async () => {
      const carModel = new CarModel(CarMongooseModel);

      const carDeleted = await carModel.delete(ID_MONGO_INVALID);

      expect(carDeleted).to.be.equal(null);
    });
  });

  describe('readByModel', () => {
    
    before(() => {
      sinon.stub(mongoose.Model, 'find').resolves([carMockCreated]);
    });

    after(() => {
      (mongoose.Model.find as SinonStub).restore();
    })

    it('Success', async () => {
      const carModel = new CarModel(CarMongooseModel);

      const carFound = await carModel.readByModel('Ferrari Maranello');

      expect(carFound).to.be.deep.equal([carMockCreated]);
    });
  });
});