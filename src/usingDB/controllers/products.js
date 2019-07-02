import moment from 'moment';
import uuidv4 from 'uuid/v4';
import db from '../db/index';

const Product = {
  async create(req, res) {
    const text = `INSERT INTO products(id ,
            picture ,
            numberOfRooms ,
            location,
            owner_id,
            isAdmin,
            created_date,
            modified_date)VALUES($1,$2,$3,$4,$5,$6,$7,$8) returning *`;
    const values = [
      uuidv4(),
      req.body.picture,
      req.body.numberOfRooms,
      req.body.location,
      req.user.id,
      true,
      moment(new Date()),
      moment(new Date())
    ];
    try {
      const { rows } = await db.query(text, values);

      return res.status(201).send(rows[0]);
    } catch (error) {
      return res.status(400).send(error);
    }
  },
  async getAll(req, res) {
    const findAllQuery = 'SELECT * FROM products where owner_id = $1';
    try {
      const { rows, rowCount } = await db.query(findAllQuery, [req.user.id]);
      return res.status(200).send({ rows, rowCount });
    } catch (error) {
      return res.status(400).send(error);
    }
  },
  async getOne(req, res) {
    const text = 'SELECT * FROM products WHERE id = $1 AND owner_id = $2';
    try {
      const { rows } = await db.query(text, [req.params.id, req.user.id]);
      if (!rows[0]) {
        return res.status(404).send({ message: 'product not found' });
      }
      return res.status(200).send(rows[0]);
    } catch (error) {
      return res.status(400).send(error);
    }
  },
  async update(req, res) {
    const findOneQuery =
      'SELECT * FROM products WHERE id=$1 AND owner_id = $2 AND isAdmin = $3 ';
    const updateOneQuery = `UPDATE products
      SET picture=$1,numberOfRooms=$2,location=$3, modified_date=$4,
      WHERE id=$5 AND owner_id = $6 returning *`;
    try {
      const { rows } = await db.query(findOneQuery, [
        req.params.id,
        req.user.id
      ]);
      if (!rows[0]) {
        return res.status(404).send({ message: 'product not found' });
      }
      const values = [
        req.body.picture || rows[0].picture,
        req.body.numberOfRooms || rows[0].numberOfRooms,
        req.body.location || rows[0].location,
        moment(new Date()),
        req.params.id,
        req.user.id
      ];
      const response = await db.query(updateOneQuery, values);
      return res.status(200).send(response.rows[0]);
    } catch (err) {
      return res.status(400).send(err);
    }
  },
  async delete(req, res) {
    const deleteQuery =
      'DELETE FROM products WHERE id=$1 AND owner_id = $2 returning *';
    try {
      const { rows } = await db.query(deleteQuery, [
        req.params.id,
        req.user.id
      ]);
      if (!rows[0]) {
        return res.status(404).send({ message: 'product not found' });
      }
      return res.status(204).send({ message: 'deleted' });
    } catch (error) {
      return res.status(400).send(error);
    }
  }
};
export default Product;
