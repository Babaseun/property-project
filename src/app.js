import express from 'express';
import regeneratorRuntime from 'regenerator-runtime';

import cors from 'cors';
import morgan from 'morgan';
import router from './routes/routes';
const app = express();

app.use(
  cors({
    origin: 'http://127.0.0.1:5500',
    credentials: true
  })
);

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use('*', (req, res) => {
//   res.status(404).send({ message: 'Not Foundh' });
// });
app.use(express.static('../public/UI'));
app.use('/api/v1/', router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`listening on port ${PORT}.........`));
