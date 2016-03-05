var holder = document.getElementById("holder");

loadMoreFigures();

function loadMoreFigures(){
  var chars = "0123456789abcdefghijklmnopqrstuvwxyz";
  var prefix = getImgSet();
  for (var i=0; i<chars.length; i++){
    var fig = document.createElement("figure");
    fig.imgCode = prefix + chars[i];
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

function getImgSet(){
  var chrs = "0123456789abcdefghijklmnopqrstuvwxyz";
  var chrs2 = "0123456789a";
  var rc = function(cs){ return cs[Math.floor(Math.random() * cs.length)];};
  return "a" + rc(chrs2)+rc(chrs)+rc(chrs)+rc(chrs);
}

function resizeMe(setting){
  var fig = document.styleSheets[0].cssRules[6].style;
  var newSize =  parseInt(fig.width, 10) + (parseInt(setting, 10) * 32);
  fig.width = newSize + "px";
  fig.height = newSize + "px";
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
}, 2000);
