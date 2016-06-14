//server.js file, main file

//importing the necessary modules
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var Contact = require("./app/models/contact");

var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/assign');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//Cross origin scripting access
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  next();
});

var port = process.env.PORT || 8085;        // set our port

// ROUTES FOR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

//logging the requests on the console
router.use(function(req, res, next){
	//logging can be done here
	console.log("request received: " + (new Date()));
	next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'Read Documentaion for API Usage' });   
});


//making all the routes here

//Creating a new contact and getting all the contacts
// GET: http://localhost:8085/api/contacts
// POST: http://localhost:8085/api/contacts
router.route("/contacts")
	.post(function(req, res){
		var contact = new Contact();
		contact.name = req.body.name;
		contact.email = req.body.email;
		contact.phoneNumber = req.body.phoneNumber;
		contact.address = req.body.address;
		contact.gender = req.body.gender;

		contact.save(function(err){
			if(err){
				res.json({status: "failure", message: JSON.stringify(err)});
			}
			res.json({status: "success", message: "Contact Added Successfully"});
		});
	})
	.get(function(req, res){
		Contact.find(function (err, contacts) {
			if(err)
				res.send(err);
			res.json(contacts);
		})
	});


//editing a contact or getting by a specific id
// GET: http://localhost:8085/api/contact/1
// PUT: http://localhost:8085/api/contact/1
// DELETE: http://localhost:8085/api/contact/1
router.route("/contact/:contactId")
	.get(function(req, res){
		Contact.findById(req.params.contactId, function(err, contact){
			if(err)
				res.send({status:"failure", message: JSON.stringify(err)});
			res.json(contact);
		});
	})
	.put(function(req, res){
		Contact.findById(req.params.contactId, function(err, contact){
			if(err){
				res.send(err);
			}
			contact.name = req.body.name;
			contact.email = req.body.email;
			contact.phoneNumber = req.body.phoneNumber;
			contact.address = req.body.address;
			contact.gender = req.body.gender;

			contact.save(function(err){
				if(err)
					res.send({status:"failure", message: JSON.stringify(err)});
				else
					res.json({message:"Contact Modified Successfully"});
			});
		});
	})
	.delete(function(req, res){
		Contact.remove({
			_id:req.params.contactId
		}, function(err, bear){
			if(err)
				res.send(err);
			res.json({message: "Successfully Removed Contact"});
		});
	});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Server running on: http://localhost:' + port);



