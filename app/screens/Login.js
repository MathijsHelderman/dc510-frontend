/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  KeyboardAvoidingView,
  Image,
  Text,
  View,
  Button,
  TextInput
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import compose from 'lodash.flowright';
import { authenticate } from '../reducers/user';

class LoginScreen extends React.Component {
  state = {
    email: '',
    password: '',
    error: null
  };

  static navigationOptions = {
    title: 'Login'
  };

  login = async () => {
    const { email, password } = this.state;
    try {
      const { data } = await this.props.authenticate({
        variables: { email, password }
      });
      if (data.error) throw data.error;
      const { token, user } = data.authenticateUserWithPassword;
      this.props.dispatch(authenticate({ token, ...user }));
      this.props.navigation.navigate('App');
    } catch (e) {
      this.setState({ error: 'Incorrect username or password' });
    }
  };

  render() {
    const { error } = this.state;
    return (
      <KeyboardAvoidingView behavior="padding">
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require('../../images/510white_circle.png')}
          />
          <Text style={styles.title}>Data Collection Application</Text>
        </View>
        <View style={styles.formContainer}>
          <View style={styles.container}>
            <Text>Login screen</Text>
            {error && <Text style={styles.error}>{error}</Text>}
            <TextInput
              placeholder="Email"
              placeholderTextColor={COLOR_510_WHITE_TR66}
              onSubmitEditing={() => this.passwordInput.focus()}
              autoCapitalize="none"
              autoCompleteType="email"
              autoCorrect={false}
              returnKeyType="next"
              returnKeyLabel="next"
              keyboardType="email-address"
              onChangeText={email => this.setState({ email, error: null })}
              style={styles.input}
            />
            <TextInput
              placeholder="Password"
              autoCapitalize="none"
              autoCompleteType="password"
              autoCorrect={false}
              placeholderTextColor={COLOR_510_WHITE_TR66}
              returnKeyType="send"
              returnKeyLabel="send"
              secureTextEntry
              style={styles.input}
              onChangeText={password =>
                this.setState({ password, error: null })
              }
            />
            <Button title="Login" onPress={this.login} />
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

LoginScreen.propTypes = {
  dispatch: PropTypes.func,
  navigation: PropTypes.object,
  authenticate: PropTypes.func
};

const AUTH_MUTATION = gql`
  mutation AuthenticateUserMutation($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      token
      user: item {
        id
        name
        email
      }
    }
  }
`;

export default connect()(
  withNavigation(
    compose(graphql(AUTH_MUTATION, { name: 'authenticate' }))(LoginScreen)
  )
);

const COLOR_510_BLUE = '#4C8294';
const COLOR_510_WHITE = '#F6F0EB';
const COLOR_510_WHITE_TR22 = '#F6F0EB22';
const COLOR_510_WHITE_TR66 = '#F6F0EB66';
const COLOR_510_GREY = '#636363';
const COLOR_RC_RED = '#ED2E26';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },
  error: {
    color: 'red'
  },
  title: {
    color: '#FFF',
    opacity: 0.8,
    textAlign: 'center',
    marginTop: 20,
    width: 300,
    fontSize: 20
  },
  logoContainer: {
    marginTop: 100,
    alignItems: 'center',
    flexGrow: 1
    // justifyContent: 'center',
  },
  logo: {
    width: 100,
    height: 100
  },
  formContainer: {
    padding: 10
  },
  input: {
    height: 40,
    fontSize: 15,
    letterSpacing: 1,
    backgroundColor: COLOR_510_WHITE_TR22,
    marginBottom: 10,
    color: COLOR_510_WHITE,
    paddingHorizontal: 10,
    width: 300,
    borderRadius: 3
  },
  buttonContainer: {
    backgroundColor: COLOR_510_WHITE,
    paddingVertical: 15,
    textAlign: 'center',
    borderRadius: 3
  },
  buttonText: {
    textAlign: 'center',
    color: COLOR_510_BLUE,
    fontWeight: '700',
    fontSize: 16
  }
});
