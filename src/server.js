import express from 'express';
import morgan from 'morgan';
import session from 'express-session';
import store from 'session-file-store';
import layoutMW from './middlewars/layoutMW';
import indexRouter from './routes/render/indexRouter';
import playersRouter from './routes/render/playersRouter';
import apiRouter from './routes/api/apiRouter';

const PORT = 3000;
const app = express();

const FileStore = store(session);
const sessionConfig = {
  name: 'user_sid', // Имя куки для хранения id сессии. По умолчанию - connect.sid
  store: new FileStore(),
  secret: process.env.SESSION_SECRET ?? 'Tapac', // Секретное слово для шифрования, может быть любым
  resave: false, // Пересохранять ли куку при каждом запросе
  saveUninitialized: false, // Создавать ли сессию без инициализации ключей в req.session
  cookie: {
    maxAge: 1000 * 60 * 60 * 12, // Срок истечения годности куки в миллисекундах
    httpOnly: true, // Серверная установка и удаление куки, по умолчанию true
  },
};
app.use(session(sessionConfig));

app.use((req, res, next) => {
  res.locals.path = req.originalUrl;
  res.locals.sessionUser = req.session?.sessionUser;
  next();
});

app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(layoutMW); //  добавляем миделвару и удалем get на слэш

app.use('/', indexRouter);
app.use('/players', playersRouter);
app.use('/api/v1', apiRouter);

app.listen(PORT, () => console.log(`App has started on port ${PORT}`));
