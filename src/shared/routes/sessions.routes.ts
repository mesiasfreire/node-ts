import { Router } from 'express';
import AuthenticateUserService from '../../modules/users/services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;
  const autenticateUser = new AuthenticateUserService();

  const { user, token } = await autenticateUser.execute({ email, password });

  return response.json({
    id: user.id,
    name: user.name,
    email: user.email,
    token,
  });
});

export default sessionsRouter;
