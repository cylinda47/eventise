import React from 'react';

export default class Footer extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (    
            <div className="footer">
                <div className="footer-container">
                    <label>Linda</label>
                    <div className="footer-links">
                        <div><a href="https://github.com/cylinda47/eventise/">Github</a></div>
                        <div>|</div>
                        <div><a href="https://www.linkedin.com/in/linda-cyl/">LinkedIn</a></div>
                    </div>
                    <div className="disclaimer">
                        <div>© 2017 Eventise</div>
                        <div>|</div>
                        <div>A Clone of <a href="https://www.eventbrite.co.uk/">Eventbrite</a></div>
                    </div>
                </div>
            </div>
        )
    }
}