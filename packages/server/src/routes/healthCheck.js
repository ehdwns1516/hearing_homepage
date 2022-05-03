const router = require('express').Router();

router.get('', (req, res) => {
  return res.status(200).json({
    code: 200,
    message: 'health',
  });
});

module.exports = router;
