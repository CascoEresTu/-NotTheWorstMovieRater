var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongo = require('mongoose');

var db = mongo.connect(process.env.MONGOLAB_CYAN_URI ||"mongodb://localhost/movies", function (err, res) {
  if (err) {
    console.log(err)
  } else {
    console.log('Nos pudimos conectar a ' + db, +' + ', res)
  }
});

var app = express()
app.use(bodyParser());
app.use(bodyParser.json({
  limit: '5mb'
}));
app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({
  extended: true
}));
/*
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS , PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
*/
var Schema = mongo.Schema;

var MovieSchema = new Schema({
  name: {
    type: String
  },
  year: {
    type: Number
  },
  poster: {
    type: String
  },
  timesVoted: {
    type: Number
  },
  Rating: {
    type: Number
  },
}, {
  versionKey: false
});

var model = mongo.model('movies', MovieSchema, 'movies');
app.post("/api/NewMovie", function (req, res) {
  var mod = new model(req.body);
  mod.save(function (err, data) {
    if (err) {
      res.send(err)
    } else {
      res.send({
        data: "Inserted new Movie"
      })
    }
  })
});


app.set("/api/UpdateMovie", function (req, res) {
  var mod = new model(req.body);

  model.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    year: req.body.year
  }, function (err, data) {
    if (err) {
      res.send(err)
    } else {
      res.send({
        data: "Updated Movie"
      })
    }
  })
});


app.delete("/api/DeleteMovie", function (req, res) {
  var mod = new model(req.body);
  model.remove({
    _id: req.body.id
  }, function (err) {
    if (err) {
      res.send(err)
    } else {
      res.send({
        data: "Deleted Movie"
      })
    }
  })
});

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
  })

  app.listen(process.env.PORT || 8080,function(){
      console.log('Movies is tuned to port 8080! ;) ')
  })

