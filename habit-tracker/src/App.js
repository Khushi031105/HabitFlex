import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import MonthView from './components/MonthView'
import HabitForm from './components/HabitForm'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import { autoLogin, logout } from './reducers/authReducer'
import { Container, Button, Icon, Menu, Header, Grid, Segment, Divider } from 'semantic-ui-react'
import HabitDataList from './components/HabitDataList'
import Notification from './components/Notification'

const App = (props) => {
  const { auth, autoLogin, logout } = props

  useEffect(() => {
    const storedUser = JSON.parse(window.localStorage.getItem('user'))
    if (storedUser && storedUser.token) {
      autoLogin(storedUser)
    }
  }, [autoLogin])

  const loginView = () => {
    return (
      <Container>
        <Divider hidden />
        <Header as='h1' icon textAlign='center'>
          <Icon name='tasks' />
          <Header.Content>Habit Tracker</Header.Content>
          <Header.Subheader>FOR DEMONSTRATION PURPOSES ONLY</Header.Subheader>
        </Header>
        <Notification />
        <Segment>
          <Grid columns='2' relaxed stackable>
            <Grid.Column>
              <LoginForm />
            </Grid.Column>
            <Grid.Column verticalAlign='middle'>
              <RegisterForm />
            </Grid.Column>
          </Grid>
          <Divider vertical>Or</Divider>
        </Segment>
      </Container>
    )
  }

  const homeView = () => {
    return (
      <>
        <Menu>
          <Menu.Item header color='violet' name='title'>
            <Icon name='tasks' />
            Habit Tracker
          </Menu.Item>
          <Menu.Item name='loggedInUser'>Logged in as {auth.username}</Menu.Item>
          <Menu.Item name='demo'>FOR DEMONSTRATION PURPOSES ONLY</Menu.Item>
          <Menu.Item position='right' name='logout'>
            <Button animated onClick={logout}>
              <Button.Content hidden>Log Out</Button.Content>
              <Button.Content visible><Icon name='log out' /></Button.Content>
            </Button>
          </Menu.Item>
        </Menu>
        <Container>
          <Notification />
          <MonthView />
          <Divider horizontal>
            New Habit
          </Divider>
          <HabitForm />
          <Divider horizontal>
            Stats
          </Divider>
          <HabitDataList />
        </Container>
      </>
    )
  }

  return (
    <Container fluid>
      {auth === null ? loginView() : homeView()}
      <Divider hidden />
    </Container>
  )
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = {
  autoLogin,
  logout
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
