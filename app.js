require('dotenv').config();
require('./db');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const authRoute = require('./auth-route');
const auth = require('./auth');
const hhBuilderRoutes = require('./hh-builder-routes');
const port = process.env.PORT || 8080;

app.disable('x-powered-by');
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static('dist'));
app.use(morgan('combined'));

app.use("/auth", authRoute);
app.use("/api", auth, hhBuilderRoutes);

app.listen(port, () => {
    console.log(`Server listening on port ${port}...`);
});
