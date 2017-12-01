import React from 'react';
import { Link } from 'react-router-dom';

export default class CategoryBar extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
                <div className="scrollmenu">
                <Link to="/category/music"><div><img src="https://images.unsplash.com/photo-1491848128688-e0c30289e89f?auto=format&fit=crop&w=1650&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D" /><label>Music</label></div></Link>
                <Link to="/category/food_drink"><div><img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1650&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D" /><label>Food & Drink</label></div></Link>
                <Link to="/category/classes"><div><img src="https://images.unsplash.com/photo-1504194377022-9e04c123352f?auto=format&fit=crop&w=1650&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D" /><label>Classes</label></div></Link>
                <Link to="/category/arts"><div><img src="https://images.unsplash.com/photo-1506625744989-c4ac05e0117a?auto=format&fit=crop&w=2850&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D" /><label>Arts</label></div></Link>
                <Link to="/category/parties"><div><img src="https://images.unsplash.com/photo-1496843916299-590492c751f4?auto=format&fit=crop&w=1651&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D" /><label>Parties</label></div></Link>
                <Link to="/category/sports_wellness"><div><img src="https://images.unsplash.com/photo-1472108482137-8df36ccf0d7b?auto=format&fit=crop&w=1650&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D" /><label>Sports</label></div></Link>
                <Link to="/category/networking"><div><img src="https://images.unsplash.com/photo-1490111718993-d98654ce6cf7?auto=format&fit=crop&w=1650&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D" /><label>Networking</label></div></Link>
                </div>
        )
    }
}