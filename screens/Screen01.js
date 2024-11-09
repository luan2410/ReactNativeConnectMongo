import {
  Text,
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import React, { useState } from 'react';
import Checkbox from 'expo-checkbox';

export default function Screen01({ navigation }) {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isHadRead, setHadRead] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [url, setUrl] = useState('');
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const toggleHadRead = () => {
    setHadRead(!isHadRead);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  const handleAccountCreation = async () => {
    if (!isHadRead) {
      setErrorMessage('You must agree to the terms and conditions.');
      setErrorModalVisible(true);
      return;
    }

    try {
      const response = await fetch('http://localhost:5001/create-account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
          url,
        }),
      });

      // Handle responses based on the status code
      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 400) {
          if (errorData.message) {
            setErrorMessage(errorData.message); // Use specific error message from server
          } else {
            setErrorMessage('Invalid input. Please check your data.'); // Fallback error message
          }
        } else if (response.status === 409) {
          setErrorMessage(
            'Email already exists. Please use a different email.' // Handle conflict
          );
        } else {
          setErrorMessage('An error occurred. Please try again later.'); // General error message
        }
        setErrorModalVisible(true);
        return;
      }

      // Navigate to the first screen on successful account creation
      navigation.navigate('Screen02');
    } catch (error) {
      // Handle network errors
      setErrorMessage(
        'An unexpected error occurred. Please check your connection and try again.'
      );
      setErrorModalVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nice to see you!</Text>
      <Text>Create your account</Text>
      <View
        style={{
          flexDirection: 'column',
          marginBottom: 20,
          width: '100%',
          gap: 10,
        }}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter your user name"
            value={username}
            onChangeText={setUsername}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter your user email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter your user password"
            secureTextEntry={!isPasswordVisible}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={{ marginLeft: 15 }}>
            <Image
              source={require('../assets/images/eye.png')}
              style={{ width: 30, height: 30 }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter your avatar url"
            value={url}
            onChangeText={setUrl}
          />
        </View>
      </View>
      <View style={{ flexDirection: 'row', gap: 20, backgroundColor: 'white' }}>
        <Checkbox onChange={toggleHadRead} value={isHadRead} />
        <Text>I agree with </Text>
        <Text style={{ color: 'aqua' }}>Terms & Conditions</Text>
      </View>
      <TouchableOpacity
        style={styles.colored_button}
        onPress={handleAccountCreation}>
        Continue
      </TouchableOpacity>

      {/* Login Now button */}
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => navigation.navigate('Screen02')}>
        <Text style={styles.loginButtonText}>Login Now!</Text>
      </TouchableOpacity>

      {/* Modal for error messages */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={errorModalVisible}
        onRequestClose={() => {
          setErrorModalVisible(!errorModalVisible);
        }}>
        <View style={styles.modalView}>
          <Text style={styles.errorText}>{errorMessage}</Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setErrorModalVisible(!errorModalVisible)}>
            <Text style={styles.textStyle}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    height: '100%',
    width: 'auto',
    gap: 10,
  },
  title: {
    color: 'green',
    fontSize: 30,
    fontWeight: 'bold',
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    height: 50,
    padding: 20,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    height: 40,
  },
  colored_button: {
    backgroundColor: 'aqua',
    borderRadius: 10,
    color: 'white',
    textAlign: 'center',
    padding: 20,
    width: '100%',
  },
  loginButton: {
    backgroundColor: 'transparent', // Blue background for the Login button
    borderRadius: 10,
    padding: 15,
    width: '100%',
    alignItems: 'center',
    marginTop: 10, // Add some space above the button
  },
  loginButtonText: {
    color: 'blue', // White text color for contrast
    fontSize: 18,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  errorText: {
    marginBottom: 15,
    textAlign: 'center',
    color: 'red',
  },
  closeButton: {
    backgroundColor: 'aqua',
    borderRadius: 5,
    padding: 10,
  },
  textStyle: {
    color: 'white',
    textAlign: 'center',
  },
});
