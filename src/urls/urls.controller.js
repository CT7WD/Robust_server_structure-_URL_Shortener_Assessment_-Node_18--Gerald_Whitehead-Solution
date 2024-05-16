const urlsData = require("../data/urls-data.js");

function list(req, res) {
    const { id } = req.params;
    res.json({ data: urlsData.filter(id ? url => url.id == id : () => true) });
}

function bodyDataHas(propertyName) {
  return function (req, res, next) {
    const { data: {} } = req.body;
    if (data[propertyName]) {
      return next()
    }
    next({
      status: 400,
      message: `Must include a ${propertyName}`
    })
  }
}

let lastUrlId = urlsData.reduce((maxId, url) => Math.max(maxId, url.id), 0);


//FIND IF URL EXISTS
function urlExists(req, res, next) {
  const { urlId } = req.params;
  const foundUrl = urlsData.find(url => url.id === Number(urlId));
  if (foundUrl) {
    res.locals.urlsData = foundUrl;
    return next();
  }
  next({
    status: 404,
    message: `URL id not found: ${urlId}`,
  });
};



// ***CREATE***
function create(req, res) {
  const { data: { href, id } = {} } = = req.body;
  const newUrl = {
    href,
    id: ++lastUrlId
  }
  urlsData.push(newUrl)
  res.status(201).json({ data: newUrl })
}


// ***READ***
  function read(req, res) {
    
  }
// Export the create function to be used in routes
module.exports = {
    create: [
        // bodyDataHas("id"),
        // bodyDataHas("href"),
        create
    ],
    list
};