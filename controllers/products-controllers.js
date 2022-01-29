const Product = require("../models/product.js")

let DUMMY_PRODUCTS = [
  {
    _id: 1,
    SKU: 1123,
    code: 1000123,
    name: "Logitech 123 Mouse",
    description: "Wireless bluetooth mouse",
    pictures: [],
    price: 100.99,
    currency: "ARS",
  },
  {
    _id: 2,
    SKU: 1124,
    code: 1000124,
    name: "Logitech 124 Keyboard",
    description: "Wireless bluetooth keyboard",
    pictures: [],
    price: 110.99,
    currency: "ARS",
  },
];

const create = async (req, res) => {
  const { SKU, code, name, description, pictures, price, currency } = req.body;
  if (!SKU || !code || !name || !description || !price || !currency) return res.json({ message: "Error" })

  const product = new Product({
    SKU,
    code,
    name,
    description,
    price,
    currency,
  });

  await product.save()
    .then(() => res.json(product))
    .catch(e => console.log(e));
};

const read = async (req, res) => {
  const products = await Product.find()
    .then(res =>  res)
    .catch(e => console.log(e));

  if (products) res.json(products.map(product => product.toObject({ getters: true })))
  else res.json({ message: "NO DATA" })
};

const update = async (req, res) => {
  const { _id, SKU, code, name, description, pictures, price, currency } =
    req.body;

  let product = await Product.findById(_id)
    .then(res => res)
    .catch(e => console.log(e))

  product.SKU = SKU;
  product.code = code;
  product.name = name;
  product.description = description;
  product.price = price;
  product.currency = currency;

  await product.save()
    .then(() => res.json(product.toObject({ getters: true })))
    .catch(e => console.log(e))
};

const destroy = async (req, res) => {
  const { _id } = req.body;

  let product = await Product.findById(_id)
    .then(res => res)
    .catch(e => console.log(e));

  await product.remove()
    .then(() => res.json({ message: "Product deleted!" }))
    .catch(e => console.log(e));
};

exports.create = create;
exports.read = read;
exports.update = update;
exports.destroy = destroy;
