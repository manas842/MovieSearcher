$(".year").on("change",function(){
	if($(".year").val()=="other"){
		$(".other").show()
	}else{
		$(".other").hide()
	}
})
document.getElementById("form").addEventListener("submit",function(e){
	e.preventDefault();
	var year=0;
	if($(".year").val()=="other"){
		year=$(".other input").val()
	}else{
		year=$(".year").val()
	}
	if(year=="all")
		year=0;
	if((year*0)!=0)
		alert("Please Enter A Valid Year in Form.")
	var title=$(".query").val();
	$("#form").attr("action","/search/"+title+"/1/");
	document.getElementById("form").submit();
})