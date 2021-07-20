const express = require('express');
const path = require('path');
const fs = require('fs');
const md = require('markdown-it')();
const matter = require('gray-matter');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// public dir with static scripts and styles
app.use(express.static('public'));

// path for the ejs folder
app.set('views', path.join(__dirname, 'markdown'));
app.set('view engine', 'ejs');


const readBlog = (req, res) => {
  const file = req.params.article
    ? matter.read(__dirname + '/markdown/' + req.params.article + '.md')
    : matter.read(__dirname + '/markdown/' + 'about.md');
  const content = file.content;
  const result = md.render(content);

  res.render('index', {
    post: result,
    title: file.data.title,
    description: file.data.description,
    image: file.data.image
  });
};

const listBlogs = (req, res) => {
  const posts = fs.readdirSync(__dirname + '/markdown').filter(file => file.endsWith('.md'));
  res.render('list', {
    posts: posts
  });
};

app.get('/', readBlog);
app.get('/list', listBlogs);
app.get('/:article', readBlog);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
