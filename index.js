const express=require('express');
const request=require('request');
const bodyParser=require('body-parser');
const app=express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.post("/search/*",(req,res)=>{
	res.status(502).send({error:"Please change your method,use get method."});
})
app.get("/search/:title/*",(req,res)=>{

})
app.get("/*",(req,res)=>{
	res.render("index");
})
app.listen(process.env.PORT||3000,(err)=>{
	console.log(process.env.PORT||3000);
})
