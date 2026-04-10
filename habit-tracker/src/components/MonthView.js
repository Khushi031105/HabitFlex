import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Habit from './Habit'
import { addDate, initDates } from '../reducers/dateReducer'
import { changeDisplayMonth } from '../reducers/displayReducer'
import { initHabits } from '../reducers/habitReducer'
import { Table, Button, Icon, Container, Label, Divider } from 'semantic-ui-react'

const headers = []
for (let i = 1; i <= 31; i++) {
  const header = <Table.HeaderCell key={i}>{i}</Table.HeaderCell>
  headers.push(header)
}

const MonthView = (props) => {
  const { display, habits, changeDisplayMonth, initHabits, initDates } = props

  useEffect(() => {
    initHabits()
  }, [initHabits])

  useEffect(() => {
    initDates()
  }, [initDates])

  return (
    <Container>
      <h2>{`${display.displayMonthName} (${display.displayMonth + 1}/${display.displayYear})`}</h2>
      {display.displayMonth === display.currentDate.getMonth()
        ? <Label color="teal">Current Month</Label>
        : <></>
      }
      <Divider hidden />
      <Container style={{ overflowX: 'scroll' }}>
        <Table striped celled compact='very'>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Habit</Table.HeaderCell>
              {headers.slice(0, display.displayMonthLength).map(header => header)}
              <Table.HeaderCell>Delete</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {habits.map(h => <Habit key={h.name} habit={h} />)}
          </Table.Body>
        </Table>
      </Container>
      <Divider hidden />
      <Button icon labelPosition='left' onClick={() => changeDisplayMonth(display.displayMonth - 1)}>
        <Icon name='angle left' />
        <Button.Content>
          Previous Month
        </Button.Content>
      </Button>
      <Button icon labelPosition='right' onClick={() => changeDisplayMonth(display.displayMonth + 1)}>
        <Icon name='angle right' />
        <Button.Content>
          Next Month
        </Button.Content>
      </Button>
    </Container>
  )
}

const mapStateToProps = (state) => {
  return {
    habits: state.habits,
    dates: state.dates,
    display: state.display
  }
}

const mapDispatchToProps = {
  addDate,
  changeDisplayMonth,
  initHabits,
  initDates
}

export default connect(mapStateToProps, mapDispatchToProps)(MonthView)