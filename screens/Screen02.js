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

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMessage('Email and password are required.');
      setErrorModalVisible(true);
      return;
    }

    try {
      const response = await fetch('http://localhost:5001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Invalid email or password');
        setErrorModalVisible(true);
        return;
      }

      const data = await response.json();
      console.log('Login successful:', data);
      // Navigate to the next screen after successful login
      navigation.navigate('Screen03', {email}); // Change to your target screen
    } catch (error) {
      setErrorMessage('An unexpected error occurred. Please try again later.');
      setErrorModalVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.goBackButton}
        onPress={() => navigation.goBack()}>
        <Text style={styles.loginButtonText}>Create an Account Now!</Text>
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
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    color: 'green',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    height: 50,
    padding: 10,
    marginBottom: 15,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  loginButtonText: {
    color: 'blue', // White text color for contrast
    fontSize: 18,
  },
  loginButton: {
    backgroundColor: 'aqua',
    borderRadius: 10,
    padding: 15,
    width: '100%',
    alignItems: 'center',
  },
  goBackButton: {
    backgroundColor: 'transparent', // Blue background for the Login button
    borderRadius: 10,
    padding: 15,
    width: '100%',
    alignItems: 'center',
    marginTop: 10, // Add some space above the button
  },
  buttonText: {
    color: 'white',
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
