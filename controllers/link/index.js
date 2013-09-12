// Link Controller

var mongoose = require('mongoose')
  , db = mongoose.connection
  , Link = db.model('Link')
  , TextController = require('./../../src/textController').TextController

var control = new TextController(Link)

exports.cat_list = control.cat_list.bind(control)

exports.search = control.search.bind(control)

exports.list = control.list.bind(control)

exports.create = control.create.bind(control)

exports.show = control.show.bind(control)

exports.update = control.update.bind(control)

exports.delete = control._delete.bind(control)