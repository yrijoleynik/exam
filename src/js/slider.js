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
