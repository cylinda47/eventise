import React from 'react';

export default class SearchBackground extends React.Component {

    componentDidMount() {
        var myIndex = 0;
        carousel();
        function carousel() {
            var i;
            var x = document.getElementsByClassName("mySlides");
            for (i = 0; i < x.length; i++) {
                x[i].style.display = "none";
            }
            myIndex++;
            if (myIndex > x.length) { myIndex = 1 }
            x[myIndex - 1].style.display = "block";
            setTimeout(carousel, 6000);
        }
    }

    render(){
        return(
            <div className="search-background-container">
                <img className="mySlides w3-animate-fading" src="https://images.unsplash.com/photo-1483919283443-8db97e2bcd81?auto=format&fit=crop&w=1650&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D" style={{width: '100%'}} />
                <img className="mySlides w3-animate-fading" src="https://images.unsplash.com/photo-1492739159057-7d1896b3c63f?auto=format&fit=crop&w=1789&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D" style={{width: '100%'}} />
                <img className="mySlides w3-animate-fading" src="https://images.unsplash.com/photo-1429277096327-11ee3b761c93?auto=format&fit=crop&w=1651&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D" style={{width: '100%'}} />
                <img className="mySlides w3-animate-fading" src="https://images.unsplash.com/photo-1494707924465-e1426acb48cb?auto=format&fit=crop&w=1350&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D" style={{width: '100%'}} />
                <img className="mySlides w3-animate-fading" src="https://images.unsplash.com/photo-1466150036782-869a824aeb25?auto=format&fit=crop&w=1650&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D" style={{width: '100%'}} />    
            </div>
        )
    }
}