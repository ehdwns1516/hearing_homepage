const router = require('express').Router();
const Notice = require('../models/Notice');
const { auth } = require('../routes/auth'); // token validation check.

router.get('/:type', (req, res) => {
  Notice.findOneByType(req.params.type)
    .then((notice) => {
      return res.status(200).json({
        code: 200,
        message: 'find all notices is succeed.',
        infos: notice.infos,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        code: 500,
        message: `find all notices is failed. error: ${err}`,
      });
    });
});

router.delete('/:type', auth, (req, res) => {
  Notice.deleteByType(req.params.type)
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

router.put('/:type', auth, (req, res) => {
  Notice.updateByType(req.params.type, {
    type: req.params.type,
    infos: req.body.data.infos,
  })
    .then(() => {
      return res.status(200).json({
        code: 200,
        message: 'infos update is succeed.' + req,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        code: 500,
        message: `infos update failed. error: ${err}`,
      });
    });
});

router.post('/:type', auth, (req, res) => {
  Notice.create({
    type: req.params.type,
    infos: new Array(),
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
