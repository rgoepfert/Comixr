
// Data and done callbacks
var dataCallback = function(data) {
  var divPic = document.getElementById("pic");
  for (var i = 0; i < data.length; i++) {
    var d = data[i];
	for (var k in d.data) {
		if (/^http/.test(d.data[k])) {
		divPic.innerHTML += ("This comic taken from: " + d.data[k] + "<br>");
	   	divPic.innerHTML += ("<img src=\"" + d.data[k] + "\"/><br><br>");
	   	//divPic.innerHTML += ("<button onclick='javascript:removeComic("+i+");''>Remove</button><br><br>");
	   }
	}
  }
}

// 3. Do the query (when the function is called)
var doQuery = function(url) {
  // Query for tile Comixr
 importio.query({
    "connectorGuids": [
      "eaac5815-2a4d-477f-aa40-77be5e3a541b"
    ],
    "input": {
      "webpage/url": "" + url
    }
  }, { "data": dataCallback });
}

function store(url) //stores the inputted url
{
   	 localStorage.setItem(Number(localStorage.getItem("index")), url.value);
   	 localStorage.setItem("index", String(Number(localStorage.getItem("index"))+1));
   	 location.reload();
}

function read(i) //returns a stored url given it's index number
{
  	  return localStorage.getItem(i);
}

function clearLocal() //clears the localStorage
{
	localStorage.clear();
	location.reload();
}

function removeComic(i)
{
	localStorage.removeItem(i);
	location.reload();
}

function pageLoad() {
	if (localStorage.getItem("index")==null) {
		localStorage.setItem("index", "0");
	}
	else {
		for(var i=0; i<Number(localStorage.getItem("index")); i++) {
			if (localStorage.getItem(i) == null)
				continue;
			doQuery(read(i));
			document.getElementById("pic").innerHTML += ("<button onclick='javascript:removeComic("+i+");''>Remove "+read(i)+"</button><br><br>");
			console.log(i);
		}
	}
}

window.onload = pageLoad;

/*Old code, replaced by other methods

var i = 0;
for (var j = 0; j < i; j++) {
	doQuery(localStorage.getElementById("0");
}
function addURL(url) {
	localStorage.setItem(i, url);
	i++;
	location.reload();
};

/*var cookies = document.cookie.split(';');
var i = 0;
while (hasNext(cookies, i)) {
	i = (i + 3) % 3
	doQuery(cookies[i]);
}*/