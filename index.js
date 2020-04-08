const express=require('express');
const request=require('request');
const bodyParser=require('body-parser');
const app=express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.get("/details/:id/*",function(req,res){
	request("http://www.omdbapi.com/?i="+req.params.id+"&plot=full&apikey=fd3b1caa",function(err,body){
		if(err) throw err
		var data=JSON.parse(body["body"]);
		/*for (var i in data) {
			console.log("<p><%=data['"+i+"']%></p>")
		}*/
		console.log(data)
		res.render("detailsPage",{data:JSON.parse(body["body"])}); 
	})
})
app.get("/search/:title/:page/*",function(req,res){
	var url;
	if(req.query.year===undefined)
		url="http://www.omdbapi.com/?s="+req.params.title+"&page="+req.params.page+"&apikey=fd3b1caa";
	else if(req.query.year.toString()==="other")
		url="http://www.omdbapi.com/?s="+req.params.title+"&page="+req.params.page+"&y="+req.query.other+"&apikey=fd3b1caa";
	else if(req.query.year.toString()==="all")
		url="http://www.omdbapi.com/?s="+req.params.title+"&page="+req.params.page+"&apikey=fd3b1caa";
	else
		url="http://www.omdbapi.com/?s="+req.params.title+"&page="+req.params.page+"&y="+req.query.year+"&apikey=fd3b1caa";
	console.log(url)
	request(url,function(err,body){
		if(err) throw err
		console.log(JSON.parse(body["body"])["totalResults"])
		var maxPages=Math.ceil(parseInt(JSON.parse(body["body"])["totalResults"])/10);
		res.render("searchPage",{currentPage:parseInt(req.params.page),maxPages:maxPages,other:req.query.other,year:req.query.year,query:req.params.title,data:JSON.parse(body["body"])}); 
	})
})
app.get("/*",function(req,res){
	res.render("index");
})
app.post("/*",function(req,res){
	res.status(502).send({error:"Please change your method,use get method."});
})
app.listen(process.env.PORT||3000,(err)=>{
	console.log(process.env.PORT||3000);
})
