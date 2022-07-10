import { z } from 'zod';
import { Vehicle } from './VehicleInterface';

export const MotorcycleSchema = z.object({
  category: z.enum(['Street', 'Custom', 'Trail']),
  engineCapacity: z.number().int().min(0).max(2500),
});

export type Motorcycle = Vehicle & z.infer<typeof MotorcycleSchema>;
