const router = require('express').Router();
const Address = require('../models/Address');

router.get('/', (req, res) => {
  Address.findAll()
    .then((addresses) => {
      if (!addresses.length)
        return res.status(404).send({ err: 'Address not found' });
      res.send(`find successfully: ${addresses}`);
    })
    .catch((err) => res.status(500).send(err));
});

router.get('/name/:addressname', (req, res) => {
  Address.findOneByAddrName(req.params.addressname)
    .then((Address) => {
      if (!Address) return res.status(404).send({ err: 'Address not found' });
      res.send(`findOne successfully: ${Address}`);
    })
    .catch((err) => res.status(500).send(err));
});

router.post('/', (req, res) => {
  console.log(req.body);
  Address.create(req.body)
    .then((Address) => res.send(Address))
    .catch((err) => res.status(500).send(err));
});

router.put('/name/:addressname', (req, res) => {
  Address.updateByAddrName(req.params.addressname, req.body)
    .then((Address) => res.send(Address))
    .catch((err) => res.status(500).send(err));
});

router.delete('/name/:addressname', (req, res) => {
  Address.deleteByAddrName(req.params.addressname)
    .then(() => res.sendStatus(200))
    .catch((err) => res.status(500).send(err));
});

module.exports = router;
