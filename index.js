const express = require('express');
const path = require('path');
const request = require('request');

const port = process.env.PORT || 8080;

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res)=>{
    res.render('search');
});

app.get('/result', (req, res)=>{
   
    let query = req.query.search;

    request("https://api.themoviedb.org/3/search/movie?api_key=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx&query="+query, (error, response, body)=>{
        if(error){
            console.log(error);
        }else{
            let data = JSON.parse(body);
            res.render('result', {data: data, querySearch: query});
        }
       
    })
})

app.listen(port, ()=>{
    console.log(`Server has started on port ${port}`);
});