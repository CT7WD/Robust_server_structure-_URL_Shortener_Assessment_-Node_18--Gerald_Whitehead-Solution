const urlsData = require("../data/urls-data.js");

function list(req, res) {
    const { id } = req.params;
    res.json({ data: urlsData.filter(id ? url => url.id == id : () => true) });
}

let lastUrlId = urlsData.reduce((maxId, url) => Math.max(maxId, url.id), 0);

// function bodyDataHas(propertyName) {
//     return function (req, res, next) {
//       const { data = {} } = req.body;
//       if (data[propertyName]) {
//         return next();
//       }
//       next({
//           status: 400,
//           message: `Must include a ${propertyName}`
//       });
//     };
//   }

  function create(req, res) {
    const { data: { id, href } = {} } = req.body;
    const newUrl = {
      id: ++lastUrlId, // Increment last id then assign as the current ID
      href: href,
    };
    urlsData.push(newUrl);
    res.status(201).json({ data: newUrl });
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