import productModel from '../models/products';
const Product = {
  create(req, res) {
    const { picture, numberOfRooms, location } = req.body;
    if (!picture && !numberOfRooms && !location) {
      return res.status(400).send({ message: 'All fields are required' });
    }
    const product = productModel.create(req.body);
    return res.status(201).send(product);
  },
  getAll(req, res) {
    const products = productModel.findAll();
    return res.status(200).send(products);
  },
  getOne(req, res) {
    const product = productModel.findOne(req.params.id);
    if (!product) {
      return res.status(404).send({ message: 'product not found' });
    }
    return res.status(200).send(product);
  },
  update(req, res) {
    const product = productModel.findOne(req.params.id);
    if (!product) {
      return res.status(404).send({ message: 'product not found' });
    }
    const updatedProduct = productModel.update(req.params.id, req.body);
    return res.status(200).send(updatedProduct);
  },
  delete(req, res) {
    const product = productModel.findOne(req.params.id);
    if (!product) {
      return res.status(404).send({ message: 'product not found' });
    }
    const ref = productModel.delete(req.params.id);
    return res.status(204).send(ref);
  }
};
export default Product;
