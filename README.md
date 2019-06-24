[changelog](./CHANGELOG.md)
# andreas_kodebase

## kodestruktur 
*jeg har en server fil inde i serverfilen ligger 2 stier til 2 mapper  i koden står der requier. der er i Config mappen hvor jeg får pakkerne til at virke hvis der skal  et nyt modul  laves det i  config mappen 
i begge mapper findes der en indeks fil den indeks fil gør at man ikke behøver at requier - kort sagt holder den øje med alle filer  så man  ikke behøver en server på 500 linier
sådan gøres det:

. i din terminal npm install (din mappe) og derefter gå ind i den fil du lige har  lavet og requier din pakke og find evnt. noget middelware der får din pakke til at virke med express gå ind på npmjs.com

. for at fjerne en pakke gå til config og slet den event. fill  med navnet på den pakke som skal fjernes og nede i din terminal skriv npm uninstall (pakken som skal  fjernes)

.for at lave et nyt route så gå ind på mappen routes og skiv noget i main.js eller lave en ny fil viser eksempel på route nederst i dokumentationen
## Lise over  npm pakker
* Dotenv er et modul der sørger for at vi kan bruge .env, så alle database informationer ikke står i en fil. Hvis man bliver hacket, kan hackeren ikke se database informationerne mere.

* Ejs står for Embedded JavaScript templating, som gør at vi kan dele html elementet op i partials. det er også en template engine.

* Express er et framework til node js, det er til at lave webapplikationer,  og her bruger vi det til at lave en         web-server.

* Express-sestion er et middleware til Express som gør at vi kan log-in på en side.

* Run-script-er os en sikring af at man sammen med start script dev script dev:win32 script dev:linux: script
*dev:darwin script i package.json så man kan køre npm run dev npm start på Windows Linux Mac. 

* Debug, det gør at man i sin kode kan skive console.log() og slå dem til og fra. 

* Mysql, det gør at man kan tilknytte en databasen. 

* Morgan, den logger hvilket rout du er på, med en status kode og timestamp.

* nodemon er et værktøj som gør at serveren kan genstarte sig selv automatisk.

* Express-formidable er et modul der gør det mugligt at upload filer.

* bcryptjs er for at hash password så hvis man bliver hacket at hackerne ikke kan se password og skal bruge extra tid på at finde ud af hvad password er.
## burger brugernavn og adgangskoder
brugernavn admin  adgangskoder 1234 brugerrole  super admin

brugernavn test adgangskoder test brugerrole admin

brugernavn test3 adgangskoder test3 brugerrole moderator

i den udgave er der gjort fous på dashbord og de bruger der kan komme på den der er  ikke lavet noget til user og gæest

# et eksemple på en dot env fil
DB_USER=root
DB_PSWD=
DB_HOST=localhost
DB_DTBS=news

PORT=1337
SITE_HOST=localhost

max_file_upload=2000000

## Projektbeskrivelse
.jeg  har skulle lave min egen kodebase som jeg kan bruge til fremtidige projekter og så jeg ved hvordan koden virker så jeg ikke har en serverfil som fylder for mange linier
## kommandor
for at kører denne server `npm run dev` eller `npm  start`for at instalere en ny pakke/moduler `npm install denne pakke/modul` for fjerne en pakke/moduler `npm uninstall denne pakke/modul` 

# relevante kode-eksempler
### 1 hvordan man laver en ny pakke/moul feks 
### 2 hvordan man laver et ny route
### 3 hvordan man laver en index fil som holder øje med filer i den mappe hvor den selv ligger
### 4 hvordan jeg requirer de to  mapper

 ``` javascript
1  const bodyParser = require('body-parser');
module.exports = function (app) {
    app.use(bodyParser.json());          // Accept JSON objects in requests
    // Accept extended form elements in requests
    app.use(bodyParser.urlencoded({
        'extended': true
    }));
}
  ```
 ``` javascript
2 
 const db = require('../config/mysql')();
module.exports = function (app) {
    app.get('/', (req, res, next) => {
        db.query(`SELECT * FROM produkter`, (err, results) => {
            if (err) return next(`${err} at db.query (${__filename}:5:9)`);
            res.render('index', { 'results': results });

        });
    });
}
  ```
 ``` javascript
3
const fs =  require('fs');
const path  = require('path');

module.exports = function(app){
    fs.readdirSync(__dirname,  { withFileTypes: true}).forEach(file =>{
        if(file.name !== path.basename(__filename)){
            require(path.join(__dirname,  file.name))(app);
        }
    });
}
```
 ``` javascript
4 
require('./config/index')(app);
require('./routes/index')(app);
 ```