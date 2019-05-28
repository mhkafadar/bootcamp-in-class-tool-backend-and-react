import React, { Component } from 'react';

class AdminPage extends Component {
    render () {
        console.log('rendering admin page');
        if (this.props.user.isAdmin) {
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