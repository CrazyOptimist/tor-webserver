const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'views')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render("pages/index", {
    dataText: "Hello Darknet!"
  })
});
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
