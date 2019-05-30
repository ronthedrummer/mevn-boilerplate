import express from 'express';
const router = express.Router();
import * as controller from './user.controller';
import * as auth from '../../services/auth.service';

router.post('/user', controller.create);
router.get('/user', auth.requireLogin, auth.isAdmin, controller.index);

// some future controller methods you might want to create in the user controller

// router.get('/user/:id', controller.one);
// router.put('/user', controller.update);
// router.delete('/user', controller.remove);

export default router;
