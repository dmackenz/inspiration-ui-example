import React from 'react';
import logo from './logo.svg';
import './App.css';

import { Grid, Typography, AppBar, Toolbar, Paper, Button, Dialog, DialogTitle, List, ListItemText, ListItem, ListItemIcon, Checkbox, ListSubheader, LinearProgress, CircularProgress, Snackbar, Slide } from "@material-ui/core"
import ComputerIcon from '@material-ui/icons/Computer';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import GitHubIcon from '@material-ui/icons/GitHub';
import { GitHubService, IGitHubService } from "./brightspace-github-api-wrapper/GitHubService"


interface AppProps {
}

interface AppState {
  isSubmitting: boolean,
  isGithub: boolean,
  isAuthenticated: boolean,
  repos: string[],
  checkedRepo: string
  username: string,
  githubService: IGitHubService,
  assignmentUrl: string,
  isSubmittingProgress: boolean,
  isSnackbarPresent: boolean
}

export class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props)
    this.state = {
      isSubmitting: false,
      isGithub: false,
      isAuthenticated: false,
      repos: [],
      username: "DiljotSG",
      checkedRepo: "",
      githubService: GitHubService(),
      assignmentUrl: "",
      isSubmittingProgress: false,
      isSnackbarPresent: false
    }
  }

  toggleSubmitting = () => {
    const { isSubmitting } = this.state
    this.setState({ isSubmitting: !isSubmitting }) 
  }

  toggleGithub = async () => {
    const { username, githubService, isGithub } = this.state
    // const isLoggedIn: boolean = await githubService.isUserLoggedIn()
    const isLoggedIn: boolean = true
    const repos: string[] = await githubService.getRepoList(username)
    this.setState({ isGithub: !isGithub, repos, isAuthenticated: isLoggedIn }) 
  }

  close = () => {
    const { isGithub, isSubmitting } = this.state
    this.setState({ isGithub: false, isSubmitting: false, isSubmittingProgress: false }) 
  }

  setAuthenticated = (isAuth: boolean) => {
    this.setState({ isAuthenticated: isAuth })
  }

  login = () => {
    this.setAuthenticated(true)
  }

  checkRepo = (repo: string) => {
    this.setState({ checkedRepo: repo })
  }

  submitAssignment = async () => {
    this.setState({ isSubmittingProgress: true })
    const { githubService, username, checkedRepo } = this.state
    const assignmentUrl: string = await githubService.getRepoArchiveLink(username, checkedRepo)
    this.setState({ assignmentUrl, isSubmittingProgress: false })
    this.setState({ isSnackbarPresent: true }, () => {
      setTimeout(() => {
        this.setState({ isSnackbarPresent: false })
      }, 5000)
    })
    this.close()
  }

  render() {
    const { isSubmitting, isGithub, isAuthenticated, repos, checkedRepo, isSubmittingProgress, assignmentUrl, isSnackbarPresent } = this.state

    return (
      <React.Fragment>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">
              GitHub Integration Example - Inspiration Sprint 2019
            </Typography>
          </Toolbar>
        </AppBar>
        <Paper style={{padding: 10, margin: 10}}>
  
          <Grid container spacing={3} style={{}}>
            <Grid item xs={12}>
              <Typography variant="h6">
                Submissions
              </Typography>
            </Grid>
            <br/>
            <Grid item xs={12}>
              <Button variant="outlined" color="primary" onClick={this.toggleSubmitting}>
                Add a File
              </Button>
            </Grid>
          </Grid>
          <Dialog onClose={this.close} aria-labelledby="simple-dialog-title" open={isSubmitting}>
            <DialogTitle id="simple-dialog-title">Add a File - Course - Main QA Org</DialogTitle>
            {isGithub ?
              <Grid container style={{padding: "16px"}}>
                  {isAuthenticated ?
                      <React.Fragment>  
                        <Grid item xs={12}>
                          <List
                            subheader={
                              <ListSubheader component="div" id="nested-list-subheader">
                                Repositories
                              </ListSubheader>
                            }
                          >
                            {repos.map((repo: string) => (
                              <ListItem>
                              <ListItemIcon>
                                <Checkbox
                                  edge="start"
                                  checked={checkedRepo === repo}
                                  onClick={() => this.checkRepo(repo)}
                                />
                              </ListItemIcon>
                              <ListItemText primary={repo}/>
                            </ListItem>
                            ))}
                          </List>
                        </Grid>
                        <Grid item xs={6}>
                          <Button variant="outlined" color="primary" onClick={this.submitAssignment}>
                            Submit
                          </Button>
                        </Grid>
                        {isSubmittingProgress && (
                          <Grid item xs={6}>
                            <CircularProgress />
                          </Grid>
                        )}
                     </React.Fragment>                   
                  :
                    <Grid item xs={12}>
                      <Button variant="outlined" color="primary" onClick={this.login}>
                        Login
                      </Button>
                    </Grid>
                  }
              </Grid>
              :
              <List>
                <ListItem button>
                  <ListItemIcon>
                    <ComputerIcon/>
                  </ListItemIcon>
                  <ListItemText primary="My Computer"/>
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <LockIcon/>
                  </ListItemIcon>
                  <ListItemText primary="My Locker"/>
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <LockOpenIcon/>
                  </ListItemIcon>
                  <ListItemText primary="Group Locker"/>
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <MenuBookIcon/>
                  </ListItemIcon>
                  <ListItemText primary="ePortfolio"/>
                </ListItem>
                <ListItem button onClick={this.toggleGithub} >
                  <ListItemIcon>
                    <GitHubIcon/>
                  </ListItemIcon>
                  <ListItemText primary="GitHub"/>
                </ListItem>
              </List>
            }
          </Dialog>
          {isSnackbarPresent && (
            <Snackbar
              open={true}
              TransitionComponent={(props: any) => <Slide {...props} direction="left" />}
              message={<Typography variant="body1">Assignment submitted from {assignmentUrl}</Typography>}
            />
          )}
        </Paper>
      </React.Fragment>
    );
  }
}

export default App;
