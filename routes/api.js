import express from 'express';
import User from '../models/users';

const apiRouter = express.Router();

const userGet = (req, res) => {
  const uid = req.params.uid;
  let promise = User.findOne({ uid }).exec();

  promise
    .then(data => {
      if (!data) {
        let user = new User();

        user.uid = uid;
        user.countries = [];
        user.created = new Date();
        user.lastUpdated = new Date();

        let savePromise = user.save();

        savePromise
          .then(data => {
            res.json(Object.assign({}, { status: 200 }, user._doc));
          })
          .catch((err, msg) => {
            res.setHeader('Content-Type', 'application/json');
            res.json(Object.assign({}, { status: 500 }, err));
          });
      } else {
        res.json(Object.assign({}, { status: 200 }, data._doc));
      }
    })
    .catch(err => {
      res.setHeader('Content-Type', 'application/json');
      res.json(Object.assign({}, { status: 500 }, err));
    });
};

const userPut = (req, res) => {
  let newUrl = req.body.userData;
  let uid = req.params.uid;

  User.findOne({ uid })
    .exec()
    .then(row => {
      User.update({ uid }, {
        countries: req.body.countries,
        lastUpdated: new Date(),
      })
        .exec()
        .then(data => {
          res.json(Object.assign({}, { status: 200 }, data));
        })
        .catch(err => {
          res.setHeader('Content-Type', 'application/json');
          res.json(Object.assign({}, { status: 500 }, err));
        });

    })
    .catch(err => {
      res.setHeader('Content-Type', 'application/json');
      res.json(Object.assign({}, { status: 500 }, err));
    });
}

apiRouter.route('/users/:uid')
  .get(userGet)
  .put(userPut);

export default apiRouter;