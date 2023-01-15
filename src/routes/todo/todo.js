const express = require('express');
const Todo = require('../../models/todo/todo');
const Category = require('../../models/category/category');
const catchAsync = require('../../appError/catchAsync');
const AppError = require('../../appError/appError');
const router = express.Router();

//Create TODO
router.post(
  '/api/todo',
  catchAsync(async (req, res, next) => {
    const category_id = req.body.category_id;
    if (!category_id) {
      return next(new AppError('Data Not Provided', 400));
    }

    const category = await Category.findByPk(category_id);
    if (!category) {
      return next(new AppError('Category With The Given ID Not Found', 404));
    }

    await Todo.create({
      title: req.body.title,
      status: req.body.status,
      category_id,
    });

    res.status(201).send({});
  })
);

//Get Single TODO
router.get(
  '/api/todo/:id',
  catchAsync(async (req, res, next) => {
    const todoId = req.params.id;
    if (!todoId) {
      return next(new AppError('Data Not Provided', 400));
    }

    const todo = await Todo.findByPk(todoId, {
      attributes: ['id', 'title', 'status'],
      include: {
        model: Category,
      },
    });
    todo ? res.send(todo) : next(new AppError('Not Found', 404));
  })
);

//Get All TODOs
router.get(
  '/api/todo',
  catchAsync(async (req, res, next) => {
    let limit = +req.query.limit || 10;
    let offset = +req.query.offset || 0;
    const todo = await Todo.findAndCountAll({
      attributes: ['id', 'title', 'status', 'createdAt'],
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });
    res.send(todo);
  })
);

//Delete TODO
router.delete(
  '/api/todo/:id',
  catchAsync(async (req, res, next) => {
    const todo = await Todo.findByPk(req.params.id);
    if (!todo) {
      return next(new AppError('TODO Not Found With The Given ID', 404));
    }

    await todo.destroy();

    res.status(204).send();
  })
);

//Update TODO
router.patch(
  '/api/todo/:id',
  catchAsync(async (req, res, next) => {
    const todo = await Todo.findByPk(req.params.id);
    if (!todo) {
      return next(new AppError('TODO Not Found With The Given ID', 404));
    }

    const newTodo = await todo.update({
      title: req.body.title,
      status: req.body.status,
    });

    res.send(newTodo);
  })
);

module.exports = router;
