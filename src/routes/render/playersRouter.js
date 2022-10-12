import express from 'express';
import { Player } from '../../db/models';

const router = express.Router();

router.get('/', async (req, res) => {
  const allPlayers = await Player.findAll();
  const initState = { path: req.originalUrl, allPlayers };
  res.layout(initState);
});

router.get('/:id/edit', async (req, res) => {
  const player = await Player.findByPk(req.params.id);
  const initState = { path: req.originalUrl, player };
  res.layout(initState);
});

export default router;
