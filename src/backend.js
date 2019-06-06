var database = require('./models');
var bodyParser = require('body-parser')
var bcrypt = require('bcrypt')
var crypto = require('crypto')

var express = require('express')
var app = express()
var port = 3030;

app.use(bodyParser.json());

database.sequelize.sync()

app.post('/create_user', function (req, res) {
  bcrypt.hash(req.body.password, 10, function(err, hash) {
    database.models.user.build(
      {
        email: req.body.email,
        password: hash
      }
    ).save().then(user => res.send({success: true, user_id: user.get('user_id')}));
  });
})

app.post('/login', function (req, res) {
  database.models.user.findAll({
    where:{
      email: req.body.email
    }
  }).then(
    user => bcrypt.compare(req.body.password, user[0].get('password'), 
    (err, isPassword) => isPassword ? 
      res.send({success: true, user_id: user[0].get('user_id')}) :
      res.send({success: false})
  )).catch(() => res.send({success: false}))
})

app.post('/create_secret', function (req, res) {
  let secret = database.models.secret.create(
    {
      name: req.body.secret_name,
      secret: req.body.secret
    }
  );
  let user = database.models.user.findByPk(req.body.user_id);
  Promise.all([secret, user]).then(([this_secret, this_user]) => {
    let u_s = database.models.user_secret
      .build({
          consumer_2fa_secret: crypto.randomBytes(16).toString('hex'),
      })
    u_s.setUser(this_user, {save: false})
    u_s.setSecret(this_secret, {save: false})
    u_s.save()
    .then(() => res.send({success: true, secret: this_secret}))
  });
})

app.post('/get_secrets', function (req, res) {
  database.models.user_secret.findAll(
    {
      where: {
        userUserId: req.body.user_id
      },
      include: [database.models.secret]
    }
  ).then(user_secrets => res.send({success: true, secrets: user_secrets}));
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
