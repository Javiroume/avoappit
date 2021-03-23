const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql');
// require ('devcert');

const app = express();


const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;

// let ssl = devcert.certificateFor('my-app.test');
// https.createServer(ssl, app).listen(3000);


// app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true })); // support encoded bodies


// Enable CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});





// Directorio Público
app.use(express.static(publicPath));

// Rutas 
const routes = require('./routes');
app.use('/api', routes );



app.listen(port, (err) => {

    if (err) throw new Error(err);

    console.log(`Servidor corriendo en puerto ${ port }`);

});






































app.get('/getAllSubs', (req, res) => {
    const sql = 'SELECT * FROM subs';
  
    connection.query(sql, (error, results) => {
      if (error) throw error;
      if (results.length > 0) {
        res.json(results);
      } else {
        res.send('Not result');
      }
    });
  });
  
  app.get('/getSubs/:id', (req, res) => {
    const { id } = req.params;
    const sql = `SELECT * FROM subs WHERE idsubs = ${id}`;
    connection.query(sql, (error, result) => {
      if (error) throw error;
  
      if (result.length > 0) {
        res.json(result);
      } else {
        res.send('Not result');
      }
    });
  });
  
  app.post('/addSubs', (req, res) => {
    const sql = 'INSERT INTO subs SET ?';
  
    const customerObj = {
      idclient: req.body.idclient,
      subs: req.body.subs
    };
  
    connection.query(sql, customerObj, error => {
      if (error) throw error;
      res.send('Subs created!');
    });
  });
  
  app.put('/updateSubs/:id', (req, res) => {
    const { id } = req.params;
    const { idclient, subs } = req.body;
    const sql = `UPDATE subs SET idclient = '${idclient}', subs='${subs}' WHERE id =${id}`;
  
    connection.query(sql, error => {
      if (error) throw error;
      res.send('Subs updated!');
    });
  });
  
  app.delete('/deletesubs/:id', (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM subs WHERE id= ${id}`;
  
    connection.query(sql, error => {
      if (error) throw error;
      res.send('Delete subs');
    });
  });

  
  // Check connect
//   connection.connect(error => {
//     if (error) throw error;
//     console.log('Database server running!');
//   });
  
//   app.listen(PORT, () => console.log(`Server running on port ${PORT}`));