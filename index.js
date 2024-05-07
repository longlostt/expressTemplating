const express = require('express');
const app = express();
const path = require('path');
const redditData = require('./data.json')

app.use(express.static(path.join(__dirname, 'public')))

app.set('view engine', 'ejs'); // no need to require (import) EJS itself. 
app.set('views', path.join(__dirname, '/views')) // sets a dir location for views, eliminating troubles running a templated from other dirs.

app.get('/home', (req, res) => {
    res.render('home');
})

app.get('/cats', (req,res) => {
    const cats = ['Blue', 'Rocket', 'Monty', 'Stephanie', 'Broiler'];
    res.render('cats', { cats })
})

app.get('/r/:subreddit', (req, res) => {
    const { subreddit } = req.params;
    const data = redditData[subreddit];
    if (data) {
        res.render('subreddit', { ...data });
    } else {
        res.render('notfound', { subreddit })
    }
})

app.get('/random', (req, res) => {
    const rand = Math.floor(Math.random() * 100) + 1;
    res.render('random', { rand: rand }) // passing the variables to the template.
})

app.listen(3000, () => {
    console.log('server 3000');
}); 