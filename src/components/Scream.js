import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import MyButton from '../utils/MyButton';
import DeleteScream from './DeleteScream'

import { connect } from 'react-redux';
import { likeScream, unlikeScream } from '../redux/actions/dataActions';

//Mui stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Typography } from '@material-ui/core';

//Icons
import ChatIcon from '@material-ui/icons/Chat'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'

const styles = {
    card: {
        position: 'relative',
        display: 'flex',
        marginBottom: 20
    }, 
    image: {
        minWidth: 200
    },
    content: {
        padding: 25,
        objectFit: 'cover'
    }
}

class Scream extends Component {

    likedScream = () => {
        if(this.props.user.likes && this.props.user.likes.find(
            like => like.screamId === this.props.scream.screamId
        )) return true
        else return false      
    }

    likeScream = () => {
        this.props.likeScream(this.props.scream.screamId)
    }

    unlikeScream = () => {
        this.props.unlikeScream(this.props.scream.screamId)
    }

    render() {
        dayjs.extend(relativeTime)
        const { classes, 
                scream : { 
                    body, 
                    createdAt, 
                    userImage, 
                    userHandle, 
                    screamId, 
                    likeCount, 
                    commentCount 
                },
                user: {
                    authenticated,
                    credentials: { handle }
                }
            } = this.props

        const likeButton = !authenticated ? (
            <MyButton tip="like">
                <Link to="/login">
                    <FavoriteBorder color="primary"/>
                </Link>
            </MyButton>
        ) : (
            this.likedScream() ? (
                <MyButton tip="unlike" onClick={this.unlikeScream}>
                    <FavoriteIcon color="primary"/>
                </MyButton>   
            ) : (
                <MyButton tip="like" onClick={this.likeScream}>
                    <FavoriteBorder color="primary"/>
                </MyButton> 
            )
        )
        const deleteButton = authenticated && userHandle === handle ? (
            <DeleteScream screamId={screamId}/>
        ) : null
        return (
            <Card className={classes.card}>
                <CardMedia 
                    className={classes.image}
                    image={userImage}
                    title="Profile image"
                />
                <CardContent className={classes.content}>
                    <Typography 
                        variant="h5" 
                        component={Link} 
                        to={`/users/${userHandle}`} 
                        color="primary"
                    >
                        {userHandle}   
                    </Typography>
                    {deleteButton}
                    <Typography variant="body2" coloe="textSecondary">
                        {dayjs(createdAt).fromNow()}
                    </Typography>
                    <Typography variant="body1">{body}</Typography>
                    {likeButton}
                    <span>{likeCount} Likes</span>
                    <MyButton tip="comments">
                        <ChatIcon color="primary"/>
                    </MyButton>
                    <span>{commentCount} comments</span>
                </CardContent>
            </Card>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapDispatchToProps = {
    likeScream,
    unlikeScream
}

Scream.propTypes = {
    user: PropTypes.object.isRequired,
    likeScream: PropTypes.func.isRequired,
    unlikeScream: PropTypes.func.isRequired,
    scream: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Scream))
