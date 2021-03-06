import { Router } from 'express';
import multer from 'multer';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import CreateUserService from '../../modules/users/services/CreateUserService';
import updloadConfig from '../../config/upload';
import UpdateUserAvatarService from '../../modules/users/services/UpdateUserAvatarService';

const usersRouter = Router();
const upload = multer(updloadConfig);

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;
  const createUser = new CreateUserService();
  const user = await createUser.execute({
    name,
    email,
    password,
  });
  const userWithoutPassword = {
    id: user.id,
    name: user.name,
    email: user.email,
    created_at: user.createdAt,
    updated_at: user.updatedAt,
  };

  return response.status(201).json(userWithoutPassword);
});

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'),
  async (request, response) => {
    const updateUserAvatar = new UpdateUserAvatarService();
    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });
    return response.json(user);
  });
export default usersRouter;
