import express from 'express';
import bodyParser from 'body-parser';

import * as controller from './controller';

const router = express.Router();

router.get('/', controller.root);
router.get('/user', controller.getUsers);
router.get('/user/details', controller.getUsersWithDetails);
router.post('/user', controller.newUser);

router.put('/daily', controller.newProgress);
router.post('/daily', controller.getProgressByDay);
router.get('/daily/api', controller.fetchDailySentence);

router.get('/movies', controller.fetchMovies);

router.get('/shortcuts', controller.getShortcuts);

router.post('/api/webhooks', bodyParser.raw({ type: 'application/json' }), controller.svixHook);

export default router;
