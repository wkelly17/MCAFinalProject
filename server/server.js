const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const recipeScraper = require('recipe-scraper'); //maybe I could eventually call in python package;

// not really the package I want since it only supports some URLs, but it doesn't do microdata.  The other package I tried didn't quite work;

const server = express();
server.use(helmet());
server.use(express.json()); //body parser has not been built into express basically;  Param hint: Returns middleware that only parses json and only looks at requests where the Content-Type header matches the type option.
server.use(cors());
server.use(morgan('tiny'));

// const router = require('./app/routes/router');
// const router = require('./routes');

const port = process.env.PORT || 3030;

server.use(recipeRoutes);
server.use(calendarRoutes);

// All routes
server.get('/', (req, res) => {
  res.json({
    'Home Page': `http://localhost:${port}/`,
    recipe: `http://localhost:${port}/scrape`,
  });
});

server.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
