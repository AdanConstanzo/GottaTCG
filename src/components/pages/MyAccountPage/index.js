import React from 'react';

import api from '../../../api';

class index extends React.Component {
    state = {
        user: null,
    };

    componentDidMount() {
        api.user.userAcount()
            .then(user => this.setState({ user }));
    }

    render(){
        const { user } = this.state;
        if (user) {
            return (
                <div>
                    <p>{user.email}</p>
                </div>
            )
        }
        return (
            <div> Loading </div>
        )
    }
}
export default index;