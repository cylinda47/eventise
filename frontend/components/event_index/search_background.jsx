import React from 'react';

export default class SearchBackground extends React.Component {

    componentDidMount() {
        var myIndex = 0;
        carousel();
        function carousel() {
            var i;
            var x = document.getElementsByClassName("mySlides");
            for (i = 0; i < x.length; i++) {
                $(x[i]).css({ display: "none" });
            }
            myIndex++;
            if (myIndex > x.length) { myIndex = 1 }
            $(x[myIndex - 1]).css({ display: "block" });
            setTimeout(carousel, 6000);
        }
    }

    render(){
        return(
            <div className="search-header">
                <div className="search-background-container">
                    <img className="mySlides w3-animate-fading" src="https://images.unsplash.com/photo-1466150036782-869a824aeb25?auto=format&fit=crop&w=1650&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D" style={{width: '100%'}} />    
                    <img className="mySlides w3-animate-fading" src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1651&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D" style={{width: '100%'}} />
                    <img className="mySlides w3-animate-fading" src="https://images.unsplash.com/photo-1454442124827-b7de573f10e0?auto=format&fit=crop&w=1651&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D" style={{width: '100%'}} />
                    <img className="mySlides w3-animate-fading" src="https://images.unsplash.com/photo-1455734729978-db1ae4f687fc?auto=format&fit=crop&w=1650&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D" style={{width: '100%'}} />
                    <img className="mySlides w3-animate-fading" src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1600&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D" style={{width: '100%'}} />
                </div>
                <center><p>Find your next experience</p></center>
            </div>
        )
    }
}