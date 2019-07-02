import express from 'express';
import morgan from 'morgan';
import router from './src/routes/routes';
const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public/UI'));
app.use('/api/v1/', router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`listening on port ${PORT}.........`));
