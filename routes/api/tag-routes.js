const router = require('express').Router();
const { Tag, Product, ProductTag, Category } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: {
      model: Product,
    }
  })
    .then(dbTagsData => res.json(dbTagsData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'tag_name'
    ],
    include: [
      {
        model: Product
      }
    ]
  })
    .then(dbTagsData => {
      if (!dbTagsData) {
        res.status(404).json({ message: 'No tag found with that ID' })
        return;
      }
      res.json(dbTagsData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(dbTagsData);
    })
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name
  })
    .then(tag => res.json(tag))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
    {
      tag_name: req.body.tag_name
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
  .then(dbTagsData =>{
    if(!dbTagsData){
      res.status(404).json({message: 'No tag found with that ID'})
      return;
    }
    res.json(dbTagsData)
  })
  .catch(err =>{
    console.log(err);
    res.status(500).json(err);
  })
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbTagsData =>{
    if (!dbTagsData) {
      res.status(404).json({message: 'No tag found with that ID'})
      return;
    }
    res.json(dbTagsData);
  })
  .catch(err =>{
    console.log(err);
    res.status(500).json(err);
  })
});

module.exports = router;