const express = require('express')
const fs = require('fs');
const ejs = require('ejs');
const path = require('path')
const PORT = process.env.PORT || 5000
var freeParking = 100

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => home(res))
  .get('/start_parking', (req, res) => parkTaken(res))
  .get('/info_parking', (req, res) => info(res))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))




function home(response){
	let template = fs.readFileSync('views/pages/index.ejs').toString();	
	const output = ejs.render(template, {parkings: freeParking});

	response.end(output);
	res.render('pages/index')
}

function parkTaken(response){
	freeParking--;
	response.render('pages/api');
}

function info(response){
	response.send('Free ' + freeParking);
}