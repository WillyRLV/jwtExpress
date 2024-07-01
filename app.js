const express = require('express')
const session = require('express-session')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const routesPrivate = require('./routes/private')
const bearerToken = require('express-bearer-token')
var { expressjwt: ejwt } = require("express-jwt");


const app = express()
const port = 3000
app.use(cookieParser('123'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use(session({
//   secret: '1234',
//   resave: false,
//   name: 'aea',
//   saveUninitialized: true,  // Evita que se cree una sesión automáticamente
//   cookie: {
//     httpOnly: true
//   }
// }));

app.use(bearerToken());

app.use(ejwt({

  secret: "123",
  algorithms: ["HS256"],

}).unless({ path: ["/auth"] }));



// middlwares
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    // Si el token JWT es inválido o expirado
    if (err.code === 'invalid_token') {
      return res.status(401).json(' JWT inválido o expirado');
    } else {
      return res.status(401).json('No autorizado');
    }
  }
  next();
});


app.use((req, res, next) => {
try {
  if (req.token) {
    res.locals.userData = jwt.verify(req.token, '123')
  }
} catch (error) {
  if (error.name === 'TokenExpiredError') { 
   console.log('TokenExpiredError');
  }
}
next()
});



app.get('/', (req, res) => {
  res.json(jwt.verify(req.token,'123'));
})

app.post('/auth', (req, res) => {

  try {
  if (req.body.name === "admin" && req.body.pass === "admin") {
    const token = jwt.sign({
      id: 1,
      name: 'will'
    }, "123", { expiresIn: '1m', algorithm: 'HS256' });
    res.cookie('access_token',token, { signed:true,httpOnly: true });
    return res.json({ token })
  }

  return res.status(401).json({ sucess: false, msg: 'wrong cridentials' })
    
  } catch (error) {
    console.log(error.name);
  }

});

// app.post('/auth', (req, res) => {

// });

// app.get('/private', (req, res) => {
//     console.log(req.headers);
//     res.json('hola')
// });


app.use('/private', routesPrivate)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))