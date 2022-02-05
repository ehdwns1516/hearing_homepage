const router = require('express').Router();
const DetailPage = require('../models/DetailPage');
const { auth } = require('../routes/auth'); // token validation check.
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'TEST-SECRET-KEY';

router.get('/:subMenu/images', (req, res) => {
  DetailPage.findOneByPageName(req.params.subMenu)
    .then((detailPage) => {
      return res.status(200).json({
        code: 200,
        message: 'find all image urls is succeed.',
        imageURLs: detailPage.imageURLs,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        code: 500,
        message: `find all image urls is failed. error: ${err}`,
      });
    });
});

router.delete('/:subMenu', auth, (req, res) => {
  DetailPage.deleteByPageName(req.params.subMenu)
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

router.put('/:subMenu/images', (req, res) => {
  DetailPage.updateByPageName(req.params.subMenu, {
    name: req.params.subMenu,
    imageURLs: req.body.imageURLs,
  })
    .then(() => {
      return res.status(200).json({
        code: 200,
        message: 'images update is succeed.',
      });
    })
    .catch((err) => {
      return res.status(500).json({
        code: 500,
        message: `images update failed. error: ${err}`,
      });
    });
});

router.put('/name/:addressname', (req, res) => {
  Address.updateByAddrName(req.params.addressname, req.body)
    .then((address) => res.send(address))
    .catch((err) => res.status(500).send(err));
});

router.post('/:subMenu/images', (req, res) => {
  DetailPage.create({
    name: req.params.subMenu,
    imageURLs: Array,
  })
    .then(() => {
      return res.status(200).json({
        code: 200,
        message: 'initialize is succeed.',
      });
    })
    .catch((err) => {
      return res.status(500).json({
        code: 500,
        message: `initialize is failed. error: ${err}`,
      });
    });
});

module.exports = router;
