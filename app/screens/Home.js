import React from 'react';
import { StyleSheet, Button, Text, View } from 'react-native';
import { withNavigation } from 'react-navigation';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home'
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Home screen</Text>
        <Button title="Logout" onPress={this.logout} />
      </View>
    );
  }
}

export default withNavigation(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
