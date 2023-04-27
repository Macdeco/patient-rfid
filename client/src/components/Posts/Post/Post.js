import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core/';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import useStyles from './Styles.js';
import { useDispatch } from 'react-redux';
import { deletePost } from '../../../actions/posts.js';



const Post = ({ post, setCurrentId }) => {
    
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));




    return (
        <Card className={classes.card}>
            <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />
            <div className={classes.overlay}>
                <Typography variant="h6">{`${post.nom} ${post.prenom}`}</Typography>
                <Typography variant="body2" component="p" style={{ fontWeight: 'bold', fontSize: '0.8rem' }}>Médecin traitant : {post.name}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </div>
            {/* button */}
            {(user?.result?.googleId === post?.medecinTraitant || user?.result?._id === post?.medecinTraitant) && (

            <div className={classes.overlay2}>
                <Button style={{ color: 'black' }} size="small" onClick={() => setCurrentId(post._id)}><MoreHorizIcon fontSize="medium" /></Button>
            </div>
            )}
            {/* objects */}
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p" style={{ fontWeight: 'bold', fontSize: '0.8rem' }}>Profession : {post.profession}</Typography>
                <Typography variant="body2" color="textSecondary" component="p" style={{ fontWeight: 'bold', fontSize: '0.8rem' }}>Adresse : {post.adresse}</Typography>
                <Typography variant="body2" color="textSecondary" component="p" style={{ fontWeight: 'bold', fontSize: '0.8rem' }}>Numéro de téléphone : {post.telephone}</Typography>
                <Typography variant="body2" color="textSecondary" component="p" style={{ fontWeight: 'bold', fontSize: '0.8rem' }}>Adresse mail :  {post.email}</Typography>
                <Typography variant="body2" color="textSecondary" component="p" style={{ fontWeight: 'bold', fontSize: '0.8rem' }}>Date de naissance : {post.dateDeNaissance}</Typography>
            </CardContent>

            <CardActions className={classes.cardActions}>
            {(user?.result?.googleId === post?.medecinTraitant || user?.result?._id === post?.medecinTraitant) && (
                <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}>
                    <DeleteIcon fontSize="medium" />&nbsp; Delete 
                     </Button>
            )}
            </CardActions>
        </Card>
    );
};


export default Post;