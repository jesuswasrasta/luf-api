const express = require('express')
const fs = require('fs');
const ejs = require('ejs');
const path = require('path')
const PORT = process.env.PORT || 5000
var freeParking = 100

var zones = {
	KingLanding: 100,
	Winterfell: 50,
	HighGarden: 40,
	CasterlyRock: 25
}

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => home(res))
  .get('/zone', (req, res) => zone(req, res))
  .get('/start_parking', (req, res) => parkTaken(req, res))
  .get('/end_parking', (req, res) => parkFreed(req, res))
  .get('/info_parking', (req, res) => parkInfo(req, res))
  .get('/status', (req, res) => status(res))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))


function home(response){
	response.render('pages/index');
}

function zone(request, response){
	response.render('pages/zone');
}

function parkTaken(request, response){
	let selectedZone = request.query.zone;
	zones[selectedZone]--;
	response.render('pages/api');
}

function parkFreed(request, response){
	let selectedZone = request.query.zone;
	zones[selectedZone]++;
	response.render('pages/api');
}

function parkInfo(request, response){
	let selectedZone = request.query.zone;
	let count = zones[selectedZone];
	if (count < 0) {
	    count = 0;
    }
	response.send(''+count);
}

function status(response){
	console.log(zones);
	response.send(JSON.stringify(zones));
}