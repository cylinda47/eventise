import React from 'react';

export default class SavedEvents extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { currentUser } = this.props;
        return (
            <div id="saved" className="dashboard-saved-events">

            </div>
        )
    }
}