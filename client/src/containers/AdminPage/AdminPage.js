import React, { Component } from 'react';

class AdminPage extends Component {
    render () {
        console.log('rendering admin page');
        console.log('in admin page, user state is', this.props.user)
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