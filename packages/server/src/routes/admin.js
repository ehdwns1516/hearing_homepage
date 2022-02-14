require('dotenv').config();
const router = require('express').Router();
const Admin = require('../models/Admin');
const { auth } = require('../routes/auth'); // token validation check.
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

router.get('/admins', auth, (req, res) => {
  Admin.findAll()
    .then((admins) => {
      return res.status(200).json({
        code: 200,
        message: 'find all admins is succeed.',
        admins: admins,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        code: 500,
        message: `find all admins is failed. error: ${err}`,
      });
    });
});

router.delete('/:id', auth, (req, res) => {
  // JWT token test
  Admin.deleteByAdminID(req.params.id)
    .then(() => {
      return res.status(200).json({
        code: 200,
        message: 'delete success.',
      });
    })
    .catch((err) => {
      return res.status(500).json({
        code: 500,
        message: 'delete failed.',
      });
    });
});

router.post('/signup', (req, res) => {
  Admin.create(req.body)
    .then(() => {
      return res.status(200).json({
        code: 200,
        message: 'sign up is succeed.',
      });
    })
    .catch((err) => {
      return res.status(500).json({
        code: 500,
        message: `sign up is failed. error: ${err}`,
      });
    });
});

router.post('/login', (req, res) => {
  const reqId = req.body.data.id;
  const reqPassword = req.body.data.password;

  Admin.findOneByAdminID(reqId).then((adminInfo) => {
    if (!adminInfo)
      return res.status(401).json({
        code: 401,
        message: 'Not Valid ID.',
      });
    else if (adminInfo.password !== reqPassword)
      return res.status(401).json({
        code: 401,
        message: 'Not Valid Password.',
      });
    else {
      const token = jwt.sign(
        {
          name: adminInfo.name,
        },
        SECRET_KEY,
        {
          expiresIn: '600m',
          issuer: 'DongJoon',
        }
      );

      return res.status(200).json({
        code: 200,
        message: 'token is issued.',
        token: token,
        name: adminInfo.name,
      });
    }
  });
});

module.exports = router;
