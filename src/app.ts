import express, { Router } from 'express';
import connectToDatabase from './connection';
import handleError from './middleware/handleError';
import CarRouter from './routes/carRouter';
import MotorcycleRouter from './routes/MotorcycleRouter';

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.startRouter();
  }

  public startServer(PORT: string | number = 3001): void {
    connectToDatabase();
    this.app.listen(
      PORT,
      () => console.log(`Server running here 👉 http://localhost:${PORT}`),
    );
  }

  public addRouter(endPoint: string, router: Router) {
    this.app.use(endPoint, router);
  }

  private startRouter() {
    this.app.use('/cars', CarRouter);
    this.app.use('/motorcycles', MotorcycleRouter);

    this.app.use(handleError);
  }

  public getApp() {
    return this.app;
  }
}

export default App;
