var MongoClient = require('mongodb').MongoClient;

var dbUrl = 'mongodb://localhost:27017/test';

var dbConnection = function(db)
{
    MongoClient.connect(dbUrl, function(err, database)
    {
        if (err) { throw err };
        db = database;
    });
}

var insertDocuments = function(theCollection, theArray) 
{
    if (theArray.length > 0)
    {
        MongoClient.connect(dbUrl, function(err, db)
        {
            db.collection(theCollection).insert(theArray, function(err, result) 
            {
                if (err) { throw err };
                var l = theArray.length;
                console.log('Inserted ' + l + ' documents into ' + theCollection + ' collection.');
            });
        });
    }
    else
    {
        console.log(theCollection, 'has no value to be inserted.')
    }
};

var insert = function(db, theCollection, theArray) 
{
    if (theArray.length > 0)
    {
        db.collection(theCollection).insert(theArray, function(err, result) 
        {
            if (err) { throw err };
            var l = theArray.length;
            console.log('Inserted ' + l + ' documents into ' + theCollection + ' collection.');
        });
    }
    else
    {
        console.log(theCollection, 'has no value to be inserted.')
    }
};

var findDocuments = function(theCollection, callback)
{
    MongoClient.connect(dbUrl, function(err, db)
    {
        db.collection(theCollection).find().toArray(callback);
    });
};

var find = function(db, theCollection, callback)
{
    db.collection(theCollection).find().toArray(callback);
};

var closeDb = function() 
{
    MongoClient.connect(dbUrl, function(err, db)
    {
        db.close();
    });
};

var dropCollection = function(regexName) 
{
    MongoClient.connect(dbUrl, function(err, db)
    {
        
    });
};

exports.insertDocuments = insertDocuments;
exports.insert = insert;
exports.find = find;
exports.findDocuments = findDocuments;
exports.closeDb = closeDb;
exports.dropCollection = dropCollection;
exports.dbConnection = dbConnection;