import React, { useState , useEffect } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutLinedIcon from '@material-ui/icons/LockOutlined';
import { GoogleLogin } from 'react-google-login';
import Input from './Input';
import useStyles from './styles';
import Icon from './icon';
import {gapi} from 'gapi-script';
import {useDispatch } from 'react-redux';
import {useHistory } from 'react-router-dom';
import { signin, signup } from '../../actions/auth.js';


const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };


const Auth = () => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const dispatch = useDispatch ();
    const history = useHistory();
    const [formData , setFormData] = useState(initialState);

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);


    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup)
        setShowPassword(false)

    };


    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (isSignup) {
           dispatch(signup(formData, history)) 
        } else {
           dispatch(signin(formData, history))
        }
    };

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value })
    };

   


    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;
        try {
            dispatch({type: 'AUTH', data:{result , token}})
            
            history.push('/');
        } catch (error) {
           console.log(error); 
        }
    };
    

    const googleFailure = (error) => {
        console.log(error);
        console.log("Google Sign In was unseccesful. try again");
    };

    const clientId="5958724852-6nilufsu98qbl6tgj66hmbj877u4jvr7.apps.googleusercontent.com"

    useEffect(() => {
        
        gapi.load("client:auth2", () => {
         gapi.auth2.init({clientId:clientId})
        })
       }, []);

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.Avatar}>
                    <LockOutLinedIcon />
                </Avatar>
                <Typography variant="h5" >{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignup && (
                            <>
                                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                            </>
                        )}
                        <Input name="email" label="Adresse Email" handleChange={handleChange} type="email" />
                        <Input name="password" label="Mot de passe" handleChange={handleChange} type={showPassword ? "test" : "password"} handleShowPassword={handleShowPassword} />
                        {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}


                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} >
                        {isSignup ? 'Sign Up' : 'Sign In'}
                    </Button>

                    <GoogleLogin
                        clientId={clientId}
                        render={(renderProps) => (
                            <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                                Google Sign In
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignup ? "Already have an account? Sign In" : " don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>

        </Container>
    )
}

export default Auth;
