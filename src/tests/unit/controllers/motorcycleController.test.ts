import { expect } from 'chai';
import { Request, Response } from 'express';
import sinon, { SinonStub } from 'sinon';
import MotorcycleController from '../../../controllers/MotorcycleController';
import MotorcycleService from '../../../services/MotorcycleService';
import { ID_MONGO, motorcycleMock, motorcycleMockCreated, motorcycleMockUpdate, motorcycleMockUpdated } from '../mocks/mockMotorcycle';

describe('MotorcycleController', () => {
  describe('Create', () => {
    const req = {} as Request;
    const res = {} as Response;

    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      req.body = motorcycleMock;

      sinon.stub(MotorcycleService.prototype, 'create').resolves(motorcycleMockCreated);
    });

    after(() => {
      (MotorcycleService.prototype.create as SinonStub).restore();
    });

    it('Success', async () => {
      const motorcycleController = new MotorcycleController(MotorcycleService.prototype);

      await motorcycleController.create(req, res);

      expect((res.status as SinonStub).calledWith(201)).to.be.ok;
      expect((res.json as SinonStub).calledWith(motorcycleMockCreated)).to.be.ok;
    });
  });

  describe('Read', () => {
    const req = {} as Request;
    const res = {} as Response;

    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      // req.body = motorcycleMock;

      sinon.stub(MotorcycleService.prototype, 'read').resolves([motorcycleMockCreated]);
    });

    after(() => {
      (MotorcycleService.prototype.read as SinonStub).restore();
    });

    it('Success', async () => {
      const motorcycleController = new MotorcycleController(MotorcycleService.prototype);

      await motorcycleController.read(req, res);

      expect((res.status as SinonStub).calledWith(200)).to.be.ok;
      expect((res.json as SinonStub).calledWith([motorcycleMockCreated])).to.be.ok;
    });
  });

  describe('ReadOne', () => {
    const req = {} as Request;
    const res = {} as Response;

    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      req.params = { id: ID_MONGO };
      // req.body = motorcycleMock;

      sinon.stub(MotorcycleService.prototype, 'readOne').resolves(motorcycleMockCreated);
    });

    after(() => {
      (MotorcycleService.prototype.readOne as SinonStub).restore();
    });

    it('Success', async () => {
      const motorcycleController = new MotorcycleController(MotorcycleService.prototype);

      await motorcycleController.readOne(req, res);

      expect((res.status as SinonStub).calledWith(200)).to.be.ok;
      expect((res.json as SinonStub).calledWith(motorcycleMockCreated)).to.be.ok;
    });
  });

  describe('Update', () => {
    const req = {} as Request;
    const res = {} as Response;

    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      req.params = { id: ID_MONGO };
      req.body = motorcycleMockUpdate;

      sinon.stub(MotorcycleService.prototype, 'update').resolves(motorcycleMockUpdated);
    });

    after(() => {
      (MotorcycleService.prototype.update as SinonStub).restore();
    });

    it('Success', async () => {
      const motorcycleController = new MotorcycleController(MotorcycleService.prototype);

      await motorcycleController.update(req, res);

      expect((res.status as SinonStub).calledWith(200)).to.be.ok;
      expect((res.json as SinonStub).calledWith(motorcycleMockUpdated)).to.be.ok;
    });
  });

  describe('Delete', () => {
    const req = {} as Request;
    const res = {} as Response;

    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      res.end = sinon.stub().returns(res);
      req.params = { id: ID_MONGO };

      sinon.stub(MotorcycleService.prototype, 'delete').resolves();
    });

    after(() => {
      (MotorcycleService.prototype.delete as SinonStub).restore();
    });

    it('Success', async () => {
      const motorcycleController = new MotorcycleController(MotorcycleService.prototype);

      await motorcycleController.delete(req, res);

      expect((res.status as SinonStub).calledWith(204)).to.be.ok;
    });
  });

  describe('ReadByModel', () => {
    const req = {} as Request;
    const res = {} as Response;

    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      req.params = { id: ID_MONGO };
      req.body = { model: 'Ferrari Maranello' };

      sinon.stub(MotorcycleService.prototype, 'readByModel').resolves([motorcycleMockCreated]);
    });

    after(() => {
      (MotorcycleService.prototype.readByModel as SinonStub).restore();
    });

    it('Success', async () => {
      const motorcycleController = new MotorcycleController(MotorcycleService.prototype);

      await motorcycleController.readByModel(req, res);

      expect((res.status as SinonStub).calledWith(200)).to.be.ok;
      expect((res.json as SinonStub).calledWith([motorcycleMockCreated])).to.be.ok;
    });
  });
});
