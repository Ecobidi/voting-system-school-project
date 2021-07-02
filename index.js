require('dotenv').config({path: __dirname + '/.env'})
let express = require('express')
let expressSession = require('express-session')
let fileupload = require('express-fileupload')
let connectFlash = require('connect-flash')
let mongoose = require('mongoose')
// let MongoStore = require('connect-mongo')(expressSession)
// let passport = require('passport')
let { APPNAME, PORT, dbhost, dbport, dbname, sessionsecret, domain, owner_mat_no, owner_name} = require('./config') 

let port = process.env.PORT || PORT

//bring in mongo uri from mlab
const mongoURI = "mongodb+srv://ecobidi:tronpoker2012@cluster0.qmunc.mongodb.net/votingsystem?retryWrites=true&w=majority"
//monnect mongodb
mongoose.connect(mongoURI, { useMongoClient: true });

// mongoose.connect(`mongodb://${dbhost}:${dbport}/${dbname}`)

// routes
const { LoginRouter, UserRouter, BallotRouter, CandidateRouter, ElectionRouter, VoterRouter } = require('./routes')

// models
const CandidateModel = require('./models/candidate')
const ElectionModel = require('./models/election')
const VoterModel = require('./models/voter')
const UserModel = require('./models/user')

// connect to mongodb database
// mongoose.connect(`mongodb://${dbhost}:${dbport}/${dbname}`)

// init express App
let app = express()

// view engine 
app.set('view engine', 'ejs')
app.set('views', './views')

// expressStatic
app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/uploads'))

// bodyparser middlewares
app.use(express.json())
app.use(express.urlencoded())

app.use(fileupload())

// express-session middleware
app.use(expressSession({
  secret: sessionsecret,
  saveUninitialized: true,
  resave: true,
  // store: new MongoStore({
  //   mongooseConnection: mongoose.connection,
  //   ttl: 14 * 24 * 60 * 60
  // })
}))
// passport middleware
// app.use(passport.initialize())
// app.use(passport.session())
// connect-flash
app.use(connectFlash())

app.use((req, res, next) => {
  res.locals.errors = req.flash('errors')
  res.locals.error_msg = req.flash('error_msg')
  res.locals.success_msg = req.flash('success_msg')
  res.locals.user = req.session.user || { username: 'test' }
  app.locals.owner_name = owner_name
  app.locals.owner_mat_no = owner_mat_no
  app.locals.appname = APPNAME
  app.locals.port = PORT
  app.locals.domain = domain + ':' + PORT
  next()
})

// routes

app.use('/ballots', BallotRouter)

app.use('/login', LoginRouter)

app.use('/', (req, res, next) => {
  // for authenticating login
  if (req.session.loggedIn) {
    next()
  } else {
    res.redirect('/login')
  }
})

app.get('/logout', (req, res) => {
  req.session.loggedIn = false
  req.session.username = ''
  res.redirect('/login')
})

let getDashboard = async (req, res) => {
  try {
    let candidate_count = await CandidateModel.count()
    let voter_count = await VoterModel.count()
    let election_count = await ElectionModel.count()
    let user_count = await UserModel.count()
    res.render('dashboard', {candidate_count, election_count, voter_count, user_count})
  } catch (err) {
    console.log(err)
    res.render('dashboard', {
      candidate_count: 0, election_count: 0,
      voter_count: 0, user_count: 0,
    })
  }
}

app.get('/', getDashboard)

app.get('/dashboard', getDashboard)

app.use('/candidates', CandidateRouter)

app.use('/elections', ElectionRouter)

app.use('/voters', VoterRouter)

app.use('/users', UserRouter)

app.listen(port, () => { console.log(`${APPNAME} running on port ${port}`) })