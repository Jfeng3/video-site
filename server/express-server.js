var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));
app.use('/', express.static('./public'));

var server = app.listen(app.get('port'), function() {
  console.log('Server is running at port'+app.get('port'));
});
