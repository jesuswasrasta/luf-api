const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
var freeParking = 100

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/start_parking', (req, res) => parkTaken(res))
  .get('/info_parking', (req, res) => info(res))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))


function parkTaken(response){
	freeParking--;
	response.render('pages/api');
}

function info(response){
	response.send('Free ' + freeParking);
}