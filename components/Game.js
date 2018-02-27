import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import RandomNumber from './RandomNumber';

class Game extends Component {
  static propTypes = {
    randomNumCount: PropTypes.number.isRequired
  }
  state = {
    selectedIds: [],
  }
  randomNumbers = Array
    .from({ length: this.props.randomNumCount })
    .map(() => 1 + Math.floor(10 * Math.random()));
  target = this.randomNumbers
    .slice(0, this.props.randomNumCount - 2)
    .reduce((acc, curr) => acc + curr, 0)

  isNumberSelected = (numberIndex) => {
    return this.state.selectedIds.indexOf(numberIndex) >= 0;
  };
  selectedNumber = (numberIndex) => {
    this.setState((prevState) => ({
      selectedIds: [...prevState.selectedIds, numberIndex]
    }));
  }
  // gameStatus: PLAYING, WIN, LOST
  gameStatus = () => {
    const sumSelected = this.state.selectedIds.reduce((acc, curr) => {
      return acc + this.randomNumbers[curr];
    }, 0);
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
        <Text style={styles.target}>{this.target}</Text>
        <View style={styles.randomContainer}>
          {this.randomNumbers.map((randomNum, i) =>
            <RandomNumber
              key={i}
              id={i}
              number={randomNum}
              isDisabled={this.isNumberSelected(i)}
              onPress={this.selectedNumber} />
          )}
        </View>
        <Text>{gameStatus}</Text>
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
    backgroundColor: '#aaa',
    margin: 50,
    textAlign: 'center'
  },
  randomContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  }
});

export default Game;
