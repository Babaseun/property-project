import moment from 'moment';
import uuid from 'uuid';
class Product {
  constructor() {
    this.products = [];
  }
  create(data) {
    const newProduct = {
      id: uuid.v4(),
      picture: data.picture || ' ',
      numberOfRooms: data.numberOfRooms || ' ',
      location: data.location || ' ',
      createdAt: moment().format('LLLL'),
      modifiedAt: moment().format('LLLL')
    };
    this.products.push(newProduct);
    return newProduct;
  }
  findOne(id) {
    return this.products.find(product => product.id === id);
  }
  findAll() {
    return this.products;
  }
  update(id, data) {
    const product = this.findOne(id);
    const index = this.products.indexOf(product);
    this.products[index].picture = data.picture || product.picture;
    this.products[index].numberOfRooms =
      data.numberOfRooms || product.numberOfRooms;
    this.products[index].location = data.location || product.location;
    this.products[index].modifiedAt = moment().format('LLLL');

    return this.products[index];
  }
  delete(id) {
    const product = this.findOne(id);
    const index = this.products.indexOf(product);
    this.products.splice(index, 1);
    return {};
  }
}
export default new Product();
