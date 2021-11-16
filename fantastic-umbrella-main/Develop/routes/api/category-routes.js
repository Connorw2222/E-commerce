const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// find all categories
// be sure to include its associated Products
router.get('/', (req, res) => {
  Category.findAll({
    attributes: ['id', 'category_name'],
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
    // include: [{model : Product}],
  })
    .then(response => {
      res.status(200).json(response)
    })
    .catch(err => res.status(500).json(err))
});

// find one category by its `id` value
// be sure to include its associated Products
router.get('/:id', (req, res) => {
  Category.findByPk(req.params.id, {
    include: [{ model: Product }]
  })
    .then(response => {
      res.status(200).json(response)
    })
    .catch(err => res.status(500).json(err))
});

// create a new category
router.post('/', (req, res) => {
  console.log(req.body)
  Category.create({ category_name: req.body.category_name })
    .then(response => {
      res.status(200).json(response)
    })
    .catch(err => res.status(500).json(err))
});

// update a category by its `id` value
router.put('/:id', (req, res) => {
  console.log(req.body)
  Category.update(
    { category_name: req.body.category_name },
    { where: { id: req.params.id } }
  )
    .then(response => {
      res.status(200).json(response)
    })
    .catch(err => res.status(500).json(err))
});

// delete a category by its `id` value
router.delete('/:id', (req, res) => {
  Category.destroy(
    { where: { id: req.params.id } }
  )
    .then(response => {
      res.status(200).json(response)
    })
    .catch(err => res.status(500).json(err))
});

module.exports = router;
