const express = require('express');
const bodyParser = require('body-parser');

const app = express();

let items = [];
let workItems = [];
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  var today = new Date();
  var options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  };
  var day = today.toLocaleDateString('en-US', options);

  res.render('list', { listTitle: day, items: items });
});

app.post('/', (req, res) => {
  let text = req.body.newItem;

  if (req.body.list === 'Work') {
    workItems = [...workItems, text];
    res.redirect('/work');
  } else {
    items = [...items, text];

    res.redirect('/');
  }
});

app.get('/work', (req, res) => {
  res.render('list', { listTitle: 'Work List', items: workItems });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000...');
});
