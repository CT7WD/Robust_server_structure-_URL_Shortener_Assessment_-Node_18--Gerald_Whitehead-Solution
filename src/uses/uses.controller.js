const useRecords = require("../data/uses-data");
// const urlsData = require("../data/urls-data");



// ***LIST USES***
function list(req, res) {
    const { id } = req.query;
    res.json({ data: useRecords.filter(id ? use => use.id === id : () => true) });
}




//FIND IF A USE EXISTS
function useExists(req, res, next) {
    const { useId } = req.params;
    const foundUse = useRecords.find(use => use.id === Number(useId));
    if (foundUse) {
        res.locals.useRecords = foundUse;
        return next();
    }
    next({
        status: 404,
        message: `USE id not found: ${useId}`,
    });
}

// ***READ***
function read(req, res) {
    res.json({ data: res.locals.useRecords })
}


// ***DELETE***
function destroy(req, res, next) {
    const { useId } = req.params;
    const index = useRecords.findIndex(use => use.id === Number(useId));

    if (index !== -1) {
        useRecords.splice(index, 1);
        res.sendStatus(204); // No Content
    } else {
        next({
            status: 404,
            message: `USE id not found: ${useId}`,
        });
    }
}











module.exports = {
    // create: [
    //     // bodyDataHas("id"),
    //     bodyDataHas("href"),
    //     create
    // ],
    read: [
        useExists,
        read
    ],
    list,
    delete: [
        useExists,
        // bodyDataHas("href"),
        // bodyDataHas("id"),
        destroy
    ]
};