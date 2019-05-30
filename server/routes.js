// import the routes created in the /server/api/{endpoint_name} folders
import userRoutes from './api/user/user.routes';

export function registerRoutes(app) {
  app.use('/api', userRoutes);
}
