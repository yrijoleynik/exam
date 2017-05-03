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