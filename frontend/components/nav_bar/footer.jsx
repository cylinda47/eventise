import React from 'react';

export default class Footer extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (    
            <div className="footer">
                <div className="footer-container">
                    <div className="footer-links">
                        <div><a href="https://www.linkedin.com/in/linda-chan-7594043a/">LinkedIn</a></div>
                        <div>Developer<span>|</span> <b>Linda Chan</b></div>
                        <div><a href="mailto:cylinda0407@gmail.com">Contact</a></div>
                    </div>
                    <div className="disclaimer">
                        © 2017 Eventise | A Clone of <a href="https://www.eventbrite.co.uk/">Eventbrite</a>
                    </div>
                </div>
            </div>
        )
    }
}