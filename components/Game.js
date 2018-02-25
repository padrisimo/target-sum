import React, { Component } from 'react';
import { View, Text, StyleSheet} from 'react-native';

class Game extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text> 42 </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ddd',
    flex: 1,
    paddingTop: 30,
  },
});

export default Game;
