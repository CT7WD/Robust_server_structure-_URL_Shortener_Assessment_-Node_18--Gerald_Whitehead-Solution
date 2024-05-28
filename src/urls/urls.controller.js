const urls = require("../data/urls-data.js");
const uses = require("../data/uses-data");

// ****FUNCTIONS****
//FIND IF PROPERTY EXIST IS REQUEST BODY
function bodyDataHas(propertyName) {
  return function (req, res, next) {
    const { data = {} } = req.body;
    if (data[propertyName]) {
      return next()
    }
    next({
      status: 400,
      message: `Must include a ${propertyName}`
    })
  }
}

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
}

// LOG USE
function logUse(req, res, next) {
  const { urlId } = req.params;
  const newUseRecord = {
    id: ++lastUseRecordId,
    urlId: Number(urlId),
    time: Date.now()
  };
  useRecords.push(newUseRecord);
  next();
}

// GET LAST USED URL ID
let lastUrlId = urlsData.reduce((maxId, url) => Math.max(maxId, url.id), 0);

// GET LAST USED USE RECORD ID
let lastUseRecordId = useRecords.reduce((maxId, use) => Math.max(maxId, use.id), 0);


// ****HANDLERS**** 
// ***LIST URLS***
function list(req, res) {
    const { id } = req.params;
    res.json({ data: urlsData.filter(id ? url => url.id === id : () => true) });
}


// ***CREATE***
function create(req, res) {
  const { data: { href } = {} } =  req.body;
  const newUrl = {
    href,
    id: ++lastUrlId
  }
  urlsData.push(newUrl)
  res.status(201).json({ data: newUrl })
}


// ***READ***
  function read(req, res) {
    res.json({ data: res.locals.urlsData})
  }


// ***UPDATE***
function update(req, res) {
    const url = res.locals.urlsData
    const { data: { href } = {} } = req.body

    url.href = href

    res.json({ data: url })
}











// Export the create function to be used in routes
module.exports = {
    create: [
        // bodyDataHas("id"),
        bodyDataHas("href"),
        create
    ],
    read: [
      urlExists,
      logUse, 
      read
    ],
    list,
    update: [
        urlExists,
        bodyDataHas("href"),
        // bodyDataHas("id"),
        update
    ]
};