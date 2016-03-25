var db = require('../config/db');

exports.list = function(req, res) {
    var collection = db.get().collection('users');

    collection.find({}).toArray(function(err, results) {
        res.render('user/list', {users: results});
    });
};

exports.show = function(req, res) {
    var collection = db.get().collection('users');

    collection.find({"identity": req.params.id}).limit(1).toArray(function(err, results) {
        res.render('user/show', {user: results[0]});
    });
};

exports.update = function(req, res) {
    var collection = db.get().collection('users');

    //note about xss and sanitization
    collection.updateOne(
        {identity: req.params.id},
        {
            $set: {
                job: req.body.job,
                name: req.body.name,
                email: req.body.email,
                coffee: req.body.coffee,
                address: req.body.address,
                city: req.body.city,
                state: req.body.state,
                zip: req.body.zip,
                notes: req.body.notes,
                identity: req.body.identity,
                milk: req.body.milk,
                sugar: req.body.sugar,
                cream: req.body.cream
            }
        }
    );

    res.redirect('/users');
};

exports.form = function(req, res) {
    res.render('user/form');
}

exports.create = function(req, res) {
    var collection = db.get().collection('users');

    //note about xss and sanitization
    collection.insert({
        job: req.body.job,
        name: req.body.name,
        email: req.body.email,
        coffee: req.body.coffee,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        notes: req.body.notes,
        identity: req.body.identity,
        milk: req.body.milk,
        sugar: req.body.sugar,
        cream: req.body.cream
    });

    res.redirect('/users');
};

exports.remove = function(req, res) {
    var collection = db.get().collection('users');

    //note about xss and sanitization
    collection.removeOne({
        identity: req.params.id
    });

    return res.redirect('/users');
};