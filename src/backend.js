const database = require('./models')
const bodyParser = require('body-parser')

const express = require('express')
const app = express()
const port = 3030

app.use(bodyParser.json())

database.sequelize.sync()

app.post('/create_user', function (req, res) {
  database.models.user
    .create({
      email: req.body.email,
      password: req.body.password
    })
    .then(user => res.send({ success: true, user_id: user.get('user_id') }))
    .catch(() => res.send({ success: false }))
})

app.post('/login', function (req, res) {
  database.models.user
    .findOne({
      where: {
        email: req.body.email
      }
    })
    .then(user =>
      user.isPassword(req.body.password)
        ? res.send({ success: true, user_id: user.get('user_id') })
        : res.send(console.log(false) && { success: false })
    )
    .catch(e => console.log(e) && res.send({ success: false }))
})

const create_u_s = (user_secret_model, user, secret, res) =>
  Promise.all([secret, user]).then(([this_secret, this_user]) => {
    let u_s = user_secret_model.build()
    u_s.setUser(this_user, { save: false })
    u_s.setSecret(this_secret, { save: false })
    u_s.save().then(() => res.send({ success: true, secret: this_secret }))
  })

app.post('/create_secret', function (req, res) {
  let secret = database.models.secret.create({
    name: req.body.secret_name,
    secret: req.body.secret
  })
  let user = database.models.user.findByPk(req.body.user_id)
  create_u_s(database.models.user_secret, user, secret, res)
})

app.post('/add_user_to_secret', function (req, res) {
  let secret = database.models.secret.findByPk(req.body.secret_id)
  let user = database.models.user.findOne({
    where: {
      email: req.body.email
    }
  })
  create_u_s(database.models.user_secret, user, secret, res)
})

app.post('/get_secrets', function (req, res) {
  database.models.user_secret
    .findAll({
      where: {
        userUserId: req.body.user_id
      },
      include: [database.models.secret]
    })
    .then(user_secrets => res.send({ success: true, secrets: user_secrets }))
})

app.post('/toggle_secure', function (req, res) {
  database.models.user_secret
    .findOne({
      where: {
        userUserId: req.body.user_id,
        secretSecretId: req.body.secret_id
      },
      include: [database.models.secret]
    })
    .then(user_secret =>
      user_secret.secret.update({ secure: true }).then(
        res.send({
          success: true,
          one_time_secret: user_secret.getDataValue('consumer_2fa_secret')
        })
      )
    )
})

app.post('/get_totp', function (req, res) {
  database.models.user_secret
    .findOne({
      where: {
        userUserId: req.body.user_id,
        secretSecretId: req.body.secret_id
      },
      include: [database.models.secret]
    })
    .then(user_secret =>
      user_secret.secret.getTOTP(
        totp => res.send({ success: true, totp: totp }),
        req.body.mfa_token,
        user_secret
      )
    )
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
