    var elem = document.querySelector('.grid');
    var msnry = new Masonry( elem, {
        itemSelector: '.grid__item',
        columnWidth: '.grid__sizer',
        gutter: 19,
        percentPosition: true
    });

    var items = document.getElementsByClassName("grid__item");
    for(var i = 0; i < items.length; i++){
        items[i].innerHTML = '<div><a></a></div>';
    }

    function sendRequest(key){
        var request;
        var url = "https://pixabay.com/api/?key=3531240-ec0d55581e7ceac4acc8e28c0&image_type=photo&pretty=true&per_page=7&orientation=horizontal&q=" + key;
        
        if (window.XMLHttpRequest) {
            request = new XMLHttpRequest();
        } else {
            request = new ActiveXObject("Microsoft.XMLHTTP");
        }
        request.onreadystatechange = function(data) {
            if (this.readyState == 4 && this.status == 200) {
                data = JSON.parse(this.responseText);
                updatePhotos(data);
            }
        };
        request.open("GET", url, true);
        request.send();
    }


    function updatePhotos(data){
        var items = document.getElementsByClassName("grid__item");

        for(var i = 0; i < data.hits.length; i++){
            items[i].style.background = "url('"+ data.hits[i].webformatURL +"') no-repeat center center"; 
            items[i].style.backgroundSize = "cover";
            items[i].childNodes[0].childNodes[0].innerHTML = data.hits[i].tags;
            items[i].childNodes[0].childNodes[0].style.top = (items[i].offsetHeight - items[i].childNodes[0].childNodes[0].offsetHeight) / 2 + "px";
        }

    }
    
    var randomKey = ["vacation", "travel", "sea", "beach", "mountains", "new york", "japan", "ukraine","england","france"];
    var index = Math.floor(Math.random() * 10);
    sendRequest(randomKey[index]);

    window.addEventListener("resize", function(){
        var items = document.getElementsByClassName("grid__item");
        for(var i = 0; i < items.length; i++){
            items[i].childNodes[0].childNodes[0].style.top = (items[i].offsetHeight - items[i].childNodes[0].childNodes[0].offsetHeight) / 2 + "px";
        }
    });      

    document.getElementById("search-block__button").addEventListener("click", function(){
        var key = document.getElementById("search-block__query").value;
        sendRequest(key);
        document.getElementById("search-block__query").value = "";
    });

    document.getElementById("search-block__query").addEventListener("keyup", function (e) {
        if (e.keyCode == 13) {
            var key = document.getElementById("search-block__query").value;
            sendRequest(key);
            document.getElementById("search-block__query").value = "";
        }
    });  