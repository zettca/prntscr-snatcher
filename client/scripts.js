var holder = document.getElementById("holder");

loadMoreFigures();

function loadMoreFigures(){
	var chars = "0123456789abcdefghijklmnopqrstuvwxyz";
	var prefix = getRandSet();
	for (var i=0; i<chars.length; i++){
		var fig = document.createElement("figure");
		fig.imgCode = prefix + chars[i];
		fig.innerHTML = prefix + chars[i];
		fig.style.backgroundImage = "url(http://i.imgur.com/WZ4nhRB.gif)";
		
		holder.appendChild(fig);
		getImage(fig.imgCode, fig);
	}
}

function getImage(req, ele){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function(){
    if (xhttp.readyState == 4 && xhttp.status == 200){
    	var url = xhttp.responseText;
    	ele.style.backgroundImage = "url("+url+")";
    	ele.imgUrl = url;
			ele.onclick = function(){ window.open(url, '_blank'); };
    }
  };
  xhttp.open("GET", "/imgCode/" + req, true);
  xhttp.send();
}

function getRandSet(){
	var chars = "0123456789abcdefghijklmnopqrstuvwxyz";
	var chars1 = "0123456789abcdefghijklmn";
	var rc = function(cs){ return cs[Math.floor(Math.random() * cs.length)];};
	return 8 + rc(chars1)+rc(chars)+rc(chars)+rc(chars);
}

var sizes = ["64px", "96px", "128px", "192px", "256px"];

function putBigger(){
	var fig = document.styleSheets[0].cssRules[6].style;
	var k = sizes.indexOf(fig.width)+1;
	fig.width = sizes[k];
	fig.height = sizes[k];
}

function putSmaller(){
	var fig = document.styleSheets[0].cssRules[6].style;
	var k = sizes.indexOf(fig.width)-1;
	fig.width = sizes[k];
	fig.height = sizes[k];
}

function checkPageBottom(){
	var currScroll = document.documentElement.scrollTop || document.body.scrollTop;
	if (window.innerHeight+currScroll >= document.body.offsetHeight) loadMoreFigures();
}

window.onscroll = checkPageBottom;

setInterval(function(){
	var figs = document.getElementsByTagName("figure");
	for (var i=0; i<figs.length; i++){
		if (figs[i].imgUrl == ""){
			figs[i].style.backgroundImage = "url(http://i.imgur.com/WZ4nhRB.gif)";
			getImage(figs[i].imgCode, figs[i]);
		}
	}
	checkPageBottom();
}, 4000);