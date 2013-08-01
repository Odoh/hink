// Notes Controller
// '/notes'

//These RESTful patterns taken from http://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api

module.exports = function (app) {
  var mongoose = require('mongoose'),
      db = require('../db'),
      config = require('../config');
      
  app.resource('/', {
    'get' : function(req, res) {
      //Lists all notes
      db.Note.find({}).exec(function(err, result) { 
        if (!err) { 
          res.end(JSON.stringify(result, undefined, 2));
        } else {
          // error handling
          res.end('An error occurred');
        };
      });
    },

    'post' : function(req, res, next) {
      //Creates a new note
      if (!req.body.title) {
        res.end('Missing title parameter');
      }
      if (!req.body.content) {
        return next({ status: 400, err: "Missing content parameter!" });
      }
      var entry_data = {created_at: Date(), title: req.body.title, content: req.body.content};
      var entry = new db.Note(entry_data);
      entry.save(function(err, result) {
        if (!err) {
          res.end('Added!');
        } else {
          res.end('Not Added!');
        }
      });
    }
  });

  app.resource('/:title', {
    'get' : function(req, res) {
      //Gets a specific note by title
      db.Note.findOne({'title':req.params.title}).exec(function(err, result) {
        if (!err) {
          res.end(JSON.stringify(result, undefined, 2));
        } else {
          res.end('An error occurred');
        };
      });
    },

    'delete' : function(req, res) {
      //Delete a note by title
      db.Note.remove({title : req.params.title}, function(err, result) {
        if (!err) {
          res.end('Deleted');
        } else {
          res.end('An error occurred');
        };
      });
    }
  });
}
