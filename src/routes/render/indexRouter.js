import express from 'express';
import { Player } from '../../db/models';

const router = express.Router();

router.get('/', async (req, res) => {
  const allPlayers = await Player.findAll();
  const initState = { path: req.originalUrl, allPlayers };
  res.layout(initState);
});

router.get('/myplayers', async (req, res) => {
  const userPlayers = await Player.findAll({ where: { user_id: req.session.user.id } });
  const initState = { path: req.originalUrl, userPlayers };
  res.layout(initState);
});
// вопрос?????????
// router.get('/signup', async (req, res) => {
//   const initState = { path: req.originalUrl, userSession: req.session?.userSession };
//   res.layout(initState);
//   console.log();
// });
// router.get('/login', async (req, res) => {
//   const initState = { path: req.originalUrl, userSession: req.session?.userSession };
//   res.layout(initState);
// });

export default router;
