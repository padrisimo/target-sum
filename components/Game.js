import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import RandomNumber from './RandomNumber';

class Game extends Component {
  static propTypes = {
    randomNumCount: PropTypes.number.isRequired,
    initialSeconds: PropTypes.number.isRequired
  }
  state = {
    selectedIds: [],
    remainingSeconds: this.props.initialSeconds
  }
  randomNumbers = Array
    .from({ length: this.props.randomNumCount })
    .map(() => 1 + Math.floor(10 * Math.random()));
  target = this.randomNumbers
    .slice(0, this.props.randomNumCount - 2)
    .reduce((acc, curr) => acc + curr, 0)

  componentDidMount() {
    this.intervalId = setInterval(() => {
      this.setState((prevState) => {
        return { remainingSeconds: prevState.remainingSeconds - 1 };
      }, () => {
        if(this.state.remainingSeconds === 0){
          clearInterval(this.intervalId);
        }
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }


  isNumberSelected = (numberIndex) => {
    return this.state.selectedIds.indexOf(numberIndex) >= 0;
  };
  selectedNumber = (numberIndex) => {
    this.setState((prevState) => ({
      selectedIds: [...prevState.selectedIds, numberIndex]
    }));
  }

  gameStatus = () => {
    const sumSelected = this.state.selectedIds.reduce((acc, curr) => {
      return acc + this.randomNumbers[curr];
    }, 0);
    if (this.state.remainingSeconds === 0){
      return 'LOOSE'; 
    }
    if (sumSelected < this.target) {
      return 'PLAYING';
    }
    if (sumSelected === this.target) {
      return 'WON';
    }
    if (sumSelected > this.target) {
      return 'LOOSE';
    }
  }
  render() {
    const gameStatus = this.gameStatus();
    return (
      <View style={styles.container}>
        <Text style={[styles.target, styles[`STATUS_${gameStatus}`]]}>{this.target}</Text>
        <View style={styles.randomContainer}>
          {this.randomNumbers.map((randomNum, i) =>
            <RandomNumber
              key={i}
              id={i}
              number={randomNum}
              isDisabled={this.isNumberSelected(i) || gameStatus !== 'PLAYING'}
              onPress={this.selectedNumber} />
          )}
        </View>
        <Text>{this.state.remainingSeconds}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ddd',
    flex: 1,
  },
  target: {
    fontSize: 50,
    margin: 50,
    textAlign: 'center'
  },
  randomContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  STATUS_PLAYING: {
    backgroundColor: '#aaa'
  },
  STATUS_WON: {
    backgroundColor: 'green'
  },
  STATUS_LOOSE: {
    backgroundColor: 'red'
  },

});

export default Game;
