const router = require('express').Router();
const Address = require('../models/Address');

router.get('/', (req, res) => {
  Address.findAll()
    .then((addresses) => {
      if (!addresses.length) return res.status(404).send({ err: 'Address not found' });
      return res.send(`find successfully: ${addresses}`);
    })
    .catch((err) => res.status(500).send(err));
});

router.get('/name/:addressname', (req, res) => {
  Address.findOneByAddrName(req.params.addressname)
    .then((address) => {
      if (!address) return res.status(404).send({ err: 'Address not found' });
      return res.send(`findOne successfully: ${address}`);
    })
    .catch((err) => res.status(500).send(err));
});

router.post('/', (req, res) => {
  Address.create(req.body)
    .then((address) => res.send(address))
    .catch((err) => res.status(500).send(err));
});

router.put('/name/:addressname', (req, res) => {
  Address.updateByAddrName(req.params.addressname, req.body)
    .then((address) => res.send(address))
    .catch((err) => res.status(500).send(err));
});

router.delete('/name/:addressname', (req, res) => {
  Address.deleteByAddrName(req.params.addressname)
    .then(() => res.sendStatus(200))
    .catch((err) => res.status(500).send(err));
});

module.exports = router;
