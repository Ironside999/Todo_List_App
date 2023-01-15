const express = require('express');
const Category = require('../../models/category/category');
const catchAsync = require('../../appError/catchAsync');
const router = express.Router();

//Get All Categories
router.get(
  '/api/category',
  catchAsync(async (req, res, next) => {
    const category = await Category.findAll({
      order: [['id', 'ASC']],
    });
    res.send(category);
  })
);

//Create Category
router.post(
  '/api/category',
  catchAsync(async (req, res, next) => {
    await Category.create({
      title: req.body.title,
    });
    res.status(201).send({});
  })
);
module.exports = router;
