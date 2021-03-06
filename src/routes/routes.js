import express from 'express';
// import ProductUsingJSObject from '../usingJSObject/controllers/products';
import Product from '../usingDB/controllers/products';
import dotenv from 'dotenv';
import 'babel-polyfill';
import UserWithDb from '../usingDB/controllers/Users';
import Auth from '../usingDB/middleware/Auth';
import rateLimit from 'express-rate-limit';
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1
});
dotenv.config();
const router = express.Router();

// const Product =
//   process.env.TYPE === 'db' ? ProductUsingDB : ProductUsingJSObject;

router.post('/products', Auth.verifyToken, apiLimiter, Product.create);
router.get('/products', Auth.verifyToken, Product.getAll);
router.get('/products/:id', Auth.verifyToken, Product.getOne);
router.put('/products/:id', Auth.verifyToken, Product.update);
router.delete('/products/:id', Auth.verifyToken, Product.delete);
router.post('/users', UserWithDb.create);
router.post('/users/login', UserWithDb.login);

router.delete('/users/me', Auth.verifyToken, UserWithDb.delete);

module.exports = router;
