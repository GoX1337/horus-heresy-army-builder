require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const morgan = require('morgan');
const app = express();
const builderRoutes = require('./builder-routes');
const port = process.env.PORT || 8080;

app.disable('x-powered-by');
app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({ secret: 'kek', resave: true, saveUninitialized: true }));
app.use(express.static('dist'));
app.use(morgan('tiny'));

app.use("/api", builderRoutes);

app.listen(port, () => {
    console.log(`Server listening on port ${port}...`);
});
