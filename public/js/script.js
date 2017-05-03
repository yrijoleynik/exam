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
        function Model() {

            this.Init = function(images){
                this.images = images;
                this.centralImageIndex = 0;
            }            

        }
		
		        function View() {

            this.Init = function(id, model){
                var images = model.images;

                this.sliderContainer = document.createElement('div');
                this.sliderContainer.className = 'slider-container';
                this.sliderContainer.id = 'slider-container-' + id;
                document.getElementById(id).appendChild(this.sliderContainer);

                var sliderContainer = document.getElementById('slider-container-'+id);
                var containerWidth = sliderContainer.offsetWidth;

                var ulElement = document.createElement('ul');
                ulElement.style.width = containerWidth * 3 + 'px';
                ulElement.style.left = containerWidth* (-1) + 'px';
                this.sliderContainer.appendChild(ulElement);

                var liElement1 = document.createElement('li');
                liElement1.style.width = containerWidth + 'px';
                liElement1.style.background = "url('"+ images[images.length-1] +"') no-repeat center center";   
                liElement1.style.backgroundSize = "cover";

                var divWithText1 = liElement1.childNodes[1];  


                ulElement.appendChild(liElement1);             
                var liElement2 = document.createElement('li');
                liElement2.style.width = containerWidth + 'px';
                liElement2.style.background = "url('"+ images[0] +"') no-repeat center center";   
                liElement2.style.backgroundSize = "cover";

                var divWithText2 = liElement2.childNodes[1];  

                ulElement.appendChild(liElement2);                   

                switch (images.length) {
                    case 1:
                        ulElement.appendChild(liElement1);
                        var liElement3 = document.createElement('li');
                        liElement3.style.width = containerWidth + 'px';
                        liElement3.style.background = "url('"+ images[0] +"') no-repeat center center";   
                        liElement3.style.backgroundSize = "cover";

                        var divWithText3 = liElement3.childNodes[1];  
                        divWithText3.innerHTML = "<a>photo "+ 1 +"</a>";
                        divWithText3.innerHTML+= "<h1>"+ texts[0].tittle +"</h1>";
                        divWithText3.innerHTML+= "<p>"+ texts[0].description +"</p>";
                        ulElement.appendChild(liElement3); 
                        break;
                    case 2:
                        ulElement.appendChild(liElement2);
                        var liElement3 = document.createElement('li');
                        liElement3.style.width = containerWidth + 'px';
                        liElement3.style.background = "url('"+ images[1] +"') no-repeat center center";   
                        liElement3.style.backgroundSize = "cover";

                        var divWithText3 = liElement3.childNodes[1];  
                        divWithText3.innerHTML = "<a>photo "+ 2 +"</a>";
                        divWithText3.innerHTML+= "<h1>"+ texts[1].tittle +"</h1>";
                        divWithText3.innerHTML+= "<p>"+ texts[1].description +"</p>";
                        ulElement.appendChild(liElement3);                         
                        break;
                    default:
                        var liElement3 = document.createElement('li');
                        liElement3.style.width = containerWidth + 'px';
                        liElement3.style.background = "url('"+ images[1] +"') no-repeat center center";   
                        liElement3.style.backgroundSize = "cover";

                        var divWithText3 = liElement3.childNodes[1];  

                        ulElement.appendChild(liElement3);   
                       
                }                         

                this.goRight = document.createElement('div');
                this.goRight.className = 'slider-container__navigation--right';
                this.sliderContainer.appendChild(this.goRight);       

                this.goLeft = document.createElement('div');
                this.goLeft.className = 'slider-container__navigation--left';
                this.sliderContainer.appendChild(this.goLeft);                                          
            }

            this.render = function(id, images, centralImageIndex, texts){

                var liElements = document.getElementById('slider-container-'+id).firstChild.childNodes;

                liElements[1].style.background = "url('"+ images[centralImageIndex] +"') no-repeat center center";
                liElements[1].style.backgroundSize = "cover";

                if(centralImageIndex >= images.length - 1){
                    liElements[2].style.background = "url('"+ images[centralImageIndex-(images.length-1)] +"') no-repeat center center";
                    liElements[2].style.backgroundSize = "cover";    
                                
                } else {
                    liElements[2].style.background = "url('"+ images[centralImageIndex+1] +"') no-repeat center center";
                    liElements[2].style.backgroundSize = "cover";   
                                                              
                }                

                if(centralImageIndex >= images.length - 1){
                    liElements[2].style.background = "url('"+ images[centralImageIndex-(images.length-1)] +"') no-repeat center center";
                    liElements[2].style.backgroundSize = "cover";    
                               
                } else {
                    liElements[2].style.background = "url('"+ images[centralImageIndex+1] +"') no-repeat center center";
                    liElements[2].style.backgroundSize = "cover";   
                }

                if(centralImageIndex-1 < 0){
                    liElements[0].style.background = "url('"+ images[images.length-1] +"') no-repeat center center";
                    liElements[0].style.backgroundSize = "cover";  
                } else {
                    liElements[0].style.background = "url('"+ images[centralImageIndex-1] +"') no-repeat center center";
                    liElements[0].style.backgroundSize = "cover";             
                }                  
             
            }

            this.updateDimensions = function(id){

                var sliderContainer = document.getElementById('slider-container-'+id);
                var ulElement = sliderContainer.firstChild;
                var liElements = sliderContainer.firstChild.childNodes;

                ulElement.style.width = sliderContainer.offsetWidth * 3 + 'px';
                ulElement.style.left = sliderContainer.offsetWidth * (-1) + 'px';
                
                for(var i = 0; i < liElements.length; i++){
                    liElements[i].style.width = sliderContainer.offsetWidth + 'px';
                }
            }          

        }
				
		        function Controller(id, model, view) {            

            if(window.addEventListener)
                window.addEventListener("resize", function(){
                    view.updateDimensions(id); 
                });
            else
                window.attachEvent("onresize", function(){
                    view.updateDimensions(id); 
                });            
           
           if(view.goRight.addEventListener){
                view.goRight.addEventListener("click",glideNext);   
                view.goLeft.addEventListener("click",glidePrevious);                
           }
           else{
                view.goRight.attachEvent("onclick",glideNext);   
                view.goLeft.attachEvent("onclick",glidePrevious);                   
           }
             
            var animationSpeed = view.sliderContainer.offsetWidth / 24;  

            function glideNext() {
                if(view.goRight.removeEventListener){
                    view.goRight.removeEventListener("click",glideNext); 
                    view.goLeft.removeEventListener("click",glidePrevious);              
                }
                else{
                    view.goRight.detachEvent("onclick",glideNext);   
                    view.goLeft.detachEvent("onclick",glidePrevious);                   
                }                
                var elem = view.sliderContainer.firstChild; 
                var pos = view.sliderContainer.offsetWidth * (-1);
                var id = setInterval(frame, 15);
                function frame() {
                    if (pos - animationSpeed <= view.sliderContainer.offsetWidth * (-2)) {
                        clearInterval(id);
                        nextImage();
                        elem.style.left = view.sliderContainer.offsetWidth * (-1) + 'px';
                        if(view.goRight.addEventListener){
                            view.goRight.addEventListener("click",glideNext);   
                            view.goLeft.addEventListener("click",glidePrevious);                
                        }
                        else{
                            view.goRight.attachEvent("onclick",glideNext);   
                            view.goLeft.attachEvent("onclick",glidePrevious);                   
                        }
                    } else {
                        pos = pos - animationSpeed; 
                        elem.style.left = pos + 'px'; 
                    }
                }
            }       

            function glidePrevious() {
                if(view.goRight.removeEventListener){
                    view.goRight.removeEventListener("click",glideNext); 
                    view.goLeft.removeEventListener("click",glidePrevious);              
                }
                else{
                    view.goRight.detachEvent("onclick",glideNext);   
                    view.goLeft.detachEvent("onclick",glidePrevious);                   
                }    
                var elem = view.sliderContainer.firstChild; 
                var pos = view.sliderContainer.offsetWidth * (-1);
                var id = setInterval(frame, 15);
                function frame() {
                    if (pos + animationSpeed >= 0) {
                        clearInterval(id);
                        previousImage();
                        elem.style.left = view.sliderContainer.offsetWidth * (-1) + 'px';
                        if(view.goRight.addEventListener){
                            view.goRight.addEventListener("click",glideNext);   
                            view.goLeft.addEventListener("click",glidePrevious);                
                        }
                        else{
                            view.goRight.attachEvent("onclick",glideNext);   
                            view.goLeft.attachEvent("onclick",glidePrevious);                   
                        }
                    } else {
                        pos = pos + animationSpeed;  
                        elem.style.left = pos + 'px'; 
                    }
                }
            }                   
             
            function nextImage(){

                model.centralImageIndex++;
                if(model.centralImageIndex > (model.images.length - 1)){
                    model.centralImageIndex = 0;
                }

                view.render(id, model.images, model.centralImageIndex, model.texts);               
            }

            function previousImage(){

                model.centralImageIndex--;
                if(model.centralImageIndex < 0){
                    model.centralImageIndex = model.images.length - 1;
                }

                view.render(id, model.images, model.centralImageIndex, model.texts);                 
            }            

        }
        var images = [
            'public/img/works-desktop1.jpg',
            'public/img/works-desktop2.jpg',
            'public/img/works-desktop3.jpg'];       

        var model = new Model;
        model.Init(images);     

        var view = new View;
        view.Init('slider1', model); 

        var controller = new Controller('slider1', model, view);

        var images2 = [
            'public/img/works-desktop2.jpg',
            'public/img/works-desktop3.jpg',
            'public/img/works-desktop1.jpg'
            ];   
           

        var model2 = new Model;
        model2.Init(images2);        

        var view2 = new View;
        view2.Init('slider2', model2); 
        var controller2 = new Controller('slider2', model2, view2);     

        var images3 = [
            'public/img/works-desktop3.jpg',
            'public/img/works-desktop1.jpg',
            'public/img/works-desktop2.jpg'
            ];                 

        var model3 = new Model;
        model3.Init(images3);        

        var view3 = new View;
        view3.Init('slider3', model3); 

        var controller3 = new Controller('slider3', model3, view3);             
