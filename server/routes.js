// import the routes created in the /server/api/{endpoint_name} folders
import userRoutes from './api/user/user.routes';
import authRoutes from './api/auth/auth.routes';

export function registerRoutes(app) {
  app.use('/api', userRoutes);
  app.use('/api', authRoutes);
}
