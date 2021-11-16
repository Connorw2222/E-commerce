const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({})
    .then(response => {
      res.status(200).json(response)
    })
    .catch(err => res.status(500).json(err))
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where:{
      id:  req.params.id
    },
    attributes: ['id','tag_name'],
    include:[{
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }]
  })
  .then(response => {
    res.status(200).json(response)
  })
  .catch(err => res.status(500).json(err))
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name
  })
  .then(response => {
    res.status(200).json(response)
  })
  .catch(err => res.status(500).json(err))
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id:req.params.id
    }
  })
  .then(dbTagData =>{
    if (!dbTagData[0]){
      res.status(404).json({ message: 'Could not find tag with this input name'});
      return;
    }
    res.json(dbTagData);
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json(err);
  })
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy(req.body, {
    where: {
      id:req.params.id
    }
  })
  .then(dbTagData =>{
    if (!dbTagData[0]){
      res.status(404).json({ message: 'Could not find tag with this input name'});
      return;
    }
    res.json(dbTagData);
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json(err);
  })
});

module.exports = router;
