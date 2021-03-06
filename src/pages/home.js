import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';

import { getScreams } from '../redux/actions/dataActions'

import Scream from '../components/Scream'
import Profile from '../components/Profile'

export class home extends Component {

    componentDidMount(){
        this.props.getScreams()
    }

    render() {
        const { screams, loading } = this.props.data
        let recentScreamsMarkup = !loading ? (
        screams.map(scream => <Scream key={scream.screamId} scream={scream}/>)
        ) : ( <p>Loading...</p> );

        return (
            <Grid container spacing={10}>
                <Grid item sm={8} xs={12}>
                    {recentScreamsMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <Profile />
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => ({
    data: state.data
})

home.propTypes = {
    data: PropTypes.object.isRequired,
    getScreams: PropTypes.func.isRequired,
}


export default connect(mapStateToProps, { getScreams })(home)
