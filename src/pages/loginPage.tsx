import React, { useContext } from "react";
import { AuthContext } from "../contexts/authContext";
import GitHubIcon from '@mui/icons-material/GitHub';
import { Button, Card,Grid, Typography } from '@mui/material';

const LoginPage: React.FC = () => {
  const authContext = useContext(AuthContext);

  const handleGithubLogin = () => {
    if (authContext?.authenticate) {
      authContext.authenticate("",""); 
    }
  };

  return (
    <Grid style={{display:'flex'}}>
    <Card style={{display:'flex',margin:'auto',flexDirection:'column', justifyContent: 'center',width:'300px', marginTop:"20px"}} >
      <Grid style={{display:'flex', flexDirection:'column', justifyContent: 'center',width:'300px'}}>
        <Typography style={{display:'flex', justifyContent:"center",margin:"10px 0"}}>Login</Typography>
          <Button style={{width:"250px", display:'flex', alignSelf: 'center', margin:"10px 0"}} onClick={handleGithubLogin}><GitHubIcon style={{marginRight:'6px'}}/>Sign in with GitHub</Button>
      </Grid>
    </Card>
    </Grid>
  );
};

export default LoginPage;
