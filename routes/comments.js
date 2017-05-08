var express = require( 'express' );
var router = express.Router();

var bodyParser = require ( 'body-Parser' );
router.use( bodyParser.urlencoded({extended: true}) );
router.use( bodyParser.json());

//Обработчик '/comments'
router.get('/comments', function(req, res) {
	collection.find({}).toArray(function(err, comments) {
			res.render('index.ejs',{comments:comments});
		});
});
//обработчик получения данных
router.post('/comments', function(req, res) {
	//получаем переменные с данными из формы /comment
	var name=req.body.name; 
	var comment=req.body.comment;
	//добавление комментария в БД
	var newComment = {name: name, comment:comment, date: new Date()};
	collection.insertOne(newComment);
	res.redirect('/comments');
});

module.exports = router;