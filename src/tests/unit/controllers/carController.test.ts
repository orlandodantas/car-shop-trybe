import { expect } from 'chai';
import { Request, Response } from 'express';
import sinon, { SinonStub } from 'sinon';
import CarController from '../../../controllers/CarController';
import CarService from '../../../services/CarService';
import { carMock, carMockCreated, carMockUpdate, carMockUpdated, ID_MONGO } from '../mocks/mockCarModel';

describe('CarController', () => {
  describe('Create', () => {
    const req = {} as Request;
    const res = {} as Response;

    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      req.body = carMock;

      sinon.stub(CarService.prototype, 'create').resolves(carMockCreated);
    });

    after(() => {
      (CarService.prototype.create as SinonStub).restore();
    });

    it('Success', async () => {
      const carController = new CarController(CarService.prototype);

      await carController.create(req, res);

      expect((res.status as SinonStub).calledWith(201)).to.be.ok;
      expect((res.json as SinonStub).calledWith(carMockCreated)).to.be.ok;
    });
  });

  describe('Read', () => {
    const req = {} as Request;
    const res = {} as Response;

    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      // req.body = carMock;

      sinon.stub(CarService.prototype, 'read').resolves([carMockCreated]);
    });

    after(() => {
      (CarService.prototype.read as SinonStub).restore();
    });

    it('Success', async () => {
      const carController = new CarController(CarService.prototype);

      await carController.read(req, res);

      expect((res.status as SinonStub).calledWith(200)).to.be.ok;
      expect((res.json as SinonStub).calledWith([carMockCreated])).to.be.ok;
    });
  });

  describe('ReadOne', () => {
    const req = {} as Request;
    const res = {} as Response;

    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      req.params = { id: ID_MONGO };
      // req.body = carMock;

      sinon.stub(CarService.prototype, 'readOne').resolves(carMockCreated);
    });

    after(() => {
      (CarService.prototype.readOne as SinonStub).restore();
    });

    it('Success', async () => {
      const carController = new CarController(CarService.prototype);

      await carController.readOne(req, res);

      expect((res.status as SinonStub).calledWith(200)).to.be.ok;
      expect((res.json as SinonStub).calledWith(carMockCreated)).to.be.ok;
    });
  });

  describe('Update', () => {
    const req = {} as Request;
    const res = {} as Response;

    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      req.params = { id: ID_MONGO };
      req.body = carMockUpdate;

      sinon.stub(CarService.prototype, 'update').resolves(carMockUpdated);
    });

    after(() => {
      (CarService.prototype.update as SinonStub).restore();
    });

    it('Success', async () => {
      const carController = new CarController(CarService.prototype);

      await carController.update(req, res);

      expect((res.status as SinonStub).calledWith(200)).to.be.ok;
      expect((res.json as SinonStub).calledWith(carMockUpdated)).to.be.ok;
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

      sinon.stub(CarService.prototype, 'delete').resolves();
    });

    after(() => {
      (CarService.prototype.delete as SinonStub).restore();
    });

    it('Success', async () => {
      const carController = new CarController(CarService.prototype);

      await carController.delete(req, res);

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

      sinon.stub(CarService.prototype, 'readByModel').resolves([carMockCreated]);
    });

    after(() => {
      (CarService.prototype.readByModel as SinonStub).restore();
    });

    it('Success', async () => {
      const carController = new CarController(CarService.prototype);

      await carController.readByModel(req, res);

      expect((res.status as SinonStub).calledWith(200)).to.be.ok;
      expect((res.json as SinonStub).calledWith([carMockCreated])).to.be.ok;
    });
  });
});
