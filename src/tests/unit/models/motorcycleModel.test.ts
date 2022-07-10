import { expect } from 'chai';
import mongoose from 'mongoose';
import sinon, { SinonStub } from 'sinon';
import MotorcycleModel from '../../../models/MotorcycleModel';
import MotorcycleMongooseModel from '../../../models/schemas/MotorcycleSchema';
import { ID_MONGO, ID_MONGO_INVALID, motorcycleMock, motorcycleMockCreated, motorcycleMockUpdate, motorcycleMockUpdated } from '../mocks/mockMotorcycle';

describe('MotorcycleModel', () => {
  describe('Create', () => {
    before(() => {
      sinon.stub(mongoose.Model, 'create').resolves(motorcycleMockCreated);
    });

    after(() => {
      (mongoose.Model.create as SinonStub).restore();
    })

    it('Success', async () => {
      const motorcycleModel = new MotorcycleModel(MotorcycleMongooseModel);

      const motorcycleCreated = await motorcycleModel.create(motorcycleMock);

      expect(motorcycleCreated).to.be.deep.equal(motorcycleMockCreated);
    });
  });

  describe('read', () => {
    
    before(() => {
      sinon.stub(mongoose.Model, 'find').resolves([motorcycleMockCreated]);
    });

    after(() => {
      (mongoose.Model.find as SinonStub).restore();
    })

    it('Success', async () => {
      const motorcycleModel = new MotorcycleModel(MotorcycleMongooseModel);

      const motorcycleFound = await motorcycleModel.read();

      expect(motorcycleFound).to.be.deep.equal([motorcycleMockCreated]);
    });
  });

  describe('readOne', () => {
    
    before(() => {
      sinon.stub(mongoose.Model, 'findById').resolves(motorcycleMockCreated);
    });

    after(() => {
      (mongoose.Model.findById as SinonStub).restore();
    })

    it('Success', async () => {
      const motorcycleModel = new MotorcycleModel(MotorcycleMongooseModel);

      const motorcycleFound = await motorcycleModel.readOne(ID_MONGO);

      expect(motorcycleFound).to.be.deep.equal(motorcycleMockCreated);
    });

    it('Error', async () => {
      const motorcycleModel = new MotorcycleModel(MotorcycleMongooseModel);

      const motorcycleFound = await motorcycleModel.readOne(ID_MONGO_INVALID);

      expect(motorcycleFound).to.be.equal(null);
    });
  });

  describe('update', () => {
    
    before(() => {
      sinon.stub(mongoose.Model, 'findOneAndUpdate').resolves(motorcycleMockUpdated);
    });

    after(() => {
      (mongoose.Model.findOneAndUpdate as SinonStub).restore();
    })

    it('Success', async () => {
      const motorcycleModel = new MotorcycleModel(MotorcycleMongooseModel);

      const motorcycleUpdated = await motorcycleModel.update(ID_MONGO, motorcycleMockUpdate);

      expect(motorcycleUpdated).to.be.deep.equal(motorcycleMockUpdated);
    });

    it('Error', async () => {
      const motorcycleModel = new MotorcycleModel(MotorcycleMongooseModel);

      const motorcycleUpdated = await motorcycleModel.update(ID_MONGO_INVALID, motorcycleMockUpdate);

      expect(motorcycleUpdated).to.be.equal(null);
    });
  });

  describe('delete', () => {
    
    before(() => {
      sinon.stub(mongoose.Model, 'findOneAndDelete').resolves(motorcycleMockCreated);
    });

    after(() => {
      (mongoose.Model.findOneAndDelete as SinonStub).restore();
    })

    it('Success', async () => {
      const motorcycleModel = new MotorcycleModel(MotorcycleMongooseModel);

      const motorcycleDeleted = await motorcycleModel.delete(ID_MONGO);

      expect(motorcycleDeleted).to.be.deep.equal(motorcycleMockCreated);
    });

    it('Error', async () => {
      const motorcycleModel = new MotorcycleModel(MotorcycleMongooseModel);

      const motorcycleDeleted = await motorcycleModel.delete(ID_MONGO_INVALID);

      expect(motorcycleDeleted).to.be.equal(null);
    });
  });

  describe('readByModel', () => {
    
    before(() => {
      sinon.stub(mongoose.Model, 'find').resolves([motorcycleMockCreated]);
    });

    after(() => {
      (mongoose.Model.find as SinonStub).restore();
    })

    it('Success', async () => {
      const motorcycleModel = new MotorcycleModel(MotorcycleMongooseModel);

      const motorcycleFound = await motorcycleModel.readByModel('Ferrari Maranello');

      expect(motorcycleFound).to.be.deep.equal([motorcycleMockCreated]);
    });
  });
});