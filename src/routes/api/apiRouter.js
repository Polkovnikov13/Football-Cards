import express from 'express';
import bcrypt from 'bcrypt';
import { Player, User } from '../../db/models';

const router = express.Router();

// чтобы не вылетал пользователь
router.get('/auth', async (req, res) => {
  try {
    // console.log(req.session.user.id);
    const result = await User.findByPk(req.session.user.id);
    res.json(result);
  } catch (error) {
    res.json(error);
  }
});

// регистрация
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPass = await bcrypt.hash(password, 10);
    // создать пользователя
    const curUser = await User.create({ name, email, password: hashedPass });
    const sessionUser = JSON.parse(JSON.stringify(curUser));
    delete sessionUser.password;
    req.session.user = sessionUser;
    return res.json(sessionUser);
  } catch (error) {
    console.log(error.message);
  }
});

// авторизация
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const curUser = await User.findOne({ where: { email } });
    // console.log(curUser);
    if (curUser && await bcrypt.compare(password, curUser.password)) {
      const sessionUser = JSON.parse(JSON.stringify(curUser));
      delete sessionUser.password;
      console.log(sessionUser);
      req.session.user = sessionUser;
      return res.json(sessionUser);
    }
    res.sendStatus(401);
  } catch (error) {
    console.log(error.message);
  }
});

// выход
router.get('/logout', (req, res) => {
  try {
    req.session.destroy();
    res.clearCookie('user_sid');
    res.sendStatus(200);
  } catch (error) {
    console.log(error.message);
  }
});

router.get('/players', async (req, res) => {
  const allPlayers = await Player.findAll();
  res.json(allPlayers);
});

router.post('/players', async (req, res) => {
  const {
    name, surname, team, age, photo,
  } = req.body;
  const newPlayer = await Player.create({
    name, surname, team, age, photo, user_id: req.session.user.id,
  });
  res.json(newPlayer);
});

router.get('/myplayers', async (req, res) => {
  const allPlayers = await Player.findAll({ where: { user_id: req.session.user.id } });
  res.json(allPlayers);
});

router.route('/players/:id')
  .get(async (req, res) => {
    const { id } = req.params;
    const player = await Player.findByPk(id);
    res.json(player);
  });

router.put('/players/:id/edit', async (req, res) => {
  const player = await Player.findOne({ where: { id: req.params.id } });
  const {
    name, surname, team, age, photo,
  } = req.body;
  // console.log(req.body);
  // console.log(name, surname, team, age, photo);
  player.name = name;
  player.surname = surname;
  player.team = team;
  player.age = age;
  player.photo = photo;
  await player.save();
  return res.json(player);
});

router.delete('/players/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Player.destroy({ where: { id } });
    res.sendStatus(201);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

export default router;
