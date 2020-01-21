const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const atob = require('atob');



if (process.env.NODE_ENV === 'production') {
	require('dotenv').config();
}
const keys = require('./config/keys');

require('./models/User');
require('./models/Blog');
require('./services/passport');
require('./services/cache');

mongoose.Promise = global.Promise;
console.log('keys.mongoURI', keys.mongoURI);

mongoose.connect(keys.mongoURI, { useMongoClient: true }).catch(err=>{
	console.log('err',err);
	
});
const User = mongoose.model('User');

// async function middleware (req,res,next){
// 	const encoded = req.headers.cookie.slice(8,72)
// 	const decoded= JSON.parse(atob(encoded)).passport.user;
// 	console.log('decoded--------------------->', encoded);
	
// 	const existingUser = await User.findOne({ _id: decoded });
// 	console.log('existing user data---------------------->', existingUser.id);

// 	//if (existingUser) req.user = decoded;
	
// 	if( next ){ next() }
// }

const app = express();
// app.use(middleware);
app.use(bodyParser.json());
app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [keys.cookieKey]
	})
);


app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/blogRoutes')(app);
require('./routes/uploadRoutes')(app);
if (['production', 'ci'].includes(process.env.NODE_ENV)) {
	app.use(express.static('client/build'));

	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(path.resolve('client', 'build', 'index.html'));
	});
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Listening on port`, PORT);
});
