import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch } from 'react-redux';

import useStyles from './Styles.js';
import { createPost, updatePost } from '../../actions/posts';
import { useSelector } from 'react-redux';


const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({ nom: '', prenom: '', dateDeNaissance: '',numeroFichePatient:'' ,profession: '', adresse: '', telephone: '', email: '' });
  const post = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createPost({...postData, name: user?.result?.name}));
    clear(); 
    } else {
      dispatch(updatePost(currentId,{...postData,  name:user?.result?.name} ));
    clear();
    }
    
  };

  if(!user?.result?.name) {
    return (
      <Paper className={classes.paper} >
        <Typography variant="h6" align="center">
           Please Sign In to create your own Patients posts
        </Typography>
      </Paper>
      
    )
  }


  const clear = () => {
    setCurrentId(0);
    setPostData({  nom: '', prenom: '', dateDeNaissance: '', profession: '',numeroFichePatient:'', adresse: '', telephone: '', email: '' });

  }



  return (
    <Paper className={classes.paper}>
      <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? `Modifier fiche "${`${post.nom} ${post.prenom}`}"` : 'Créer fiche patient'}</Typography>
        
        <TextField name="numeroFichePatient" variant="outlined" label="Num fiche " fullWidth value={postData.numeroFichePatient} onChange={(e) => setPostData({ ...postData, numeroFichePatient: e.target.value })} />

        
        <div style={{ display: "flex", alignItems: "center" }}>
          <TextField name="Nom" variant="outlined" label="Nom" fullWidth value={postData.nom} onChange={(e) => setPostData({ ...postData, nom: e.target.value })} />
          <TextField name="prenom" variant="outlined" label="Prénom" fullWidth value={postData.prenom} onChange={(e) => setPostData({ ...postData, prenom: e.target.value })} />
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <TextField name="dateDeNaissance" variant="outlined" label="Date de naissance" fullWidth value={postData.dateDeNaissance} onChange={(e) => setPostData({ ...postData, dateDeNaissance: e.target.value })} />
          <TextField name="profession" variant="outlined" label="profession" fullWidth value={postData.profession} onChange={(e) => setPostData({ ...postData, profession: e.target.value })} />
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <TextField name="adresse" variant="outlined" label="Adresse" fullWidth value={postData.adresse} onChange={(e) => setPostData({ ...postData, adresse: e.target.value })} />
          <TextField name="telephone" variant="outlined" label="Télephone" fullWidth value={postData.telephone} onChange={(e) => setPostData({ ...postData, telephone: e.target.value })} />
        </div>
        <TextField name="email" variant="outlined" label="Adresse email" fullWidth value={postData.email} onChange={(e) => setPostData({ ...postData, email: e.target.value })} />
        <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
        <Button className={classes.buttonSubmit} variant='contained' color='primary' size='large' type='submit' fullWidth>Submit</Button>
        <Button variant='contained' color='secondary' size='small' onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  )
}


export default Form;





