require('dotenv').config();
const router = require('express').Router();
const AWS = require('aws-sdk');
const S3_BUCKET = process.env.S3_BUCKET;
const REGION = process.env.REGION;
const ACCESS_KEY = process.env.ACCESS_KEY;
const SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY;
const DIR_NAME = process.env.DIR_NAME;

router.post('/image', (req, res) => {
  const image = req.files.image;

  const s3 = new AWS.S3({
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
    region: REGION,
  });

  var param = {
    Bucket: S3_BUCKET,
    Key: DIR_NAME + new Date().toLocaleString() + image.name,
    ACL: 'public-read-write',
    Body: image.data,
    ContentType: 'image/*',
  };

  s3.upload(param, function (err, data) {
    if (err) {
      return res.status(500).json({
        code: 500,
        message: `S3 save is failed. error: ${err}`,
      });
    }
    return res.status(200).json({
      code: 200,
      message: 'S3 save is succeed.',
      url: data.Location,
    });
  });
});

module.exports = router;
