import React from 'react';
import { Link } from 'react-router-dom';

export default class CategoryBar extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
                <div className="scrollmenu">
                    <Link to="/category/music"><div><img src="assets/categories/music.jpeg" /><label>Music</label></div></Link>
                    <Link to="/category/food_drink"><div><img src="assets/categories/food_drink.jpeg" /><label>Food & Drink</label></div></Link>
                    <Link to="/category/classes"><div><img src="assets/categories/classes.jpeg" /><label>Classes</label></div></Link>
                    <Link to="/category/arts"><div><img src="assets/categories/arts.jpeg" /><label>Arts</label></div></Link>
                    <Link to="/category/parties"><div><img src="assets/categories/parties.jpeg" /><label>Parties</label></div></Link>
                    <Link to="/category/sports_wellness"><div><img src="assets/categories/sports.jpeg" /><label>Sports</label></div></Link>
                    <Link to="/category/networking"><div><img src="assets/categories/networking.jpeg" /><label>Networking</label></div></Link>
                </div>
        )
    }
}