import React, { Component } from 'react';

class AdminPage extends Component {
    render () {
        if (this.props.isAdmin) {
            return (
                <div>
                    Only you! Yes {this.props.user.firstName} only you can see that!
                </div> 
            );
        } 
        return null;
         
    }
}

export default AdminPage;