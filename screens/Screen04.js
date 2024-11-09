import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import React, { useState, useEffect } from 'react';

export default function Screen04({ navigation, route }) {
  const { userData } = route.params; // Lấy userData từ params
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [confirmationModalVisible, setConfirmationModalVisible] =
    useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogout = () => {
    setErrorMessage('Logging out...');
    setErrorModalVisible(true);
    navigation.navigate('Screen01');
  };

  const handleDeleteAccount = () => {
    setConfirmationModalVisible(true);
  };

  const confirmDeleteAccount = async () => {
    setConfirmationModalVisible(false);
    try {
      const response = await fetch('http://localhost:5001/delete-account', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userData.email }), // Sử dụng userData.email
      });

      const data = await response.json();

      if (response.ok) {
        setErrorMessage('Your account has been deleted.');
        setErrorModalVisible(true);
        navigation.navigate('Screen01');
      } else {
        setErrorMessage(data.message || 'Failed to delete account.');
        setErrorModalVisible(true);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(
        `An error occurred while deleting the account: ${error.message}`
      );
      setErrorModalVisible(true);
    }
  };

  return (
    <View style={[styles.container, styles.padding_15px]}>
      <View style={styles.header}>
        <Image
          style={styles.profileImage}
          source={{
            uri: userData
              ? userData.url
              : 'https://cdn.pixabay.com/photo/2016/08/28/13/31/basic-1625962_640.png',
          }}
        />
        <Text style={styles.usernameText}>
          {userData ? userData.username : 'User'}
        </Text>
        <Text style={styles.emailText}>
          {userData ? userData.email : 'user@example.com'}
        </Text>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Screen05', { userData })}>
          <Text style={styles.buttonText}>Change password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={handleDeleteAccount}>
          <Text style={styles.buttonText}>Delete Account</Text>
        </TouchableOpacity>
      </View>
      <View
        style={[
          styles.bottom,
          styles.flex_row,
          styles.space_between,
          styles.padding_15px,
        ]}>
        <View style={styles.logo_with_text}>
          <TouchableOpacity>
            <Image
              source={require('../assets/images/homeicon.png')}
              style={styles.avatar_logo}
            />
          </TouchableOpacity>
          <Text style={styles.white_text}>Home</Text>
        </View>
        <View style={styles.logo_with_text}>
          <TouchableOpacity>
            <Image
              source={require('../assets/images/exploreicon.png')}
              style={styles.avatar_logo}
            />
          </TouchableOpacity>
          <Text style={styles.white_text}>Explore</Text>
        </View>
        <View style={styles.logo_with_text}>
          <TouchableOpacity>
            <Image
              source={require('../assets/images/searchicon.png')}
              style={styles.avatar_logo}
            />
          </TouchableOpacity>
          <Text style={styles.white_text}>Search</Text>
        </View>
        <View style={styles.logo_with_text}>
          <TouchableOpacity>
            <Image
              source={require('../assets/images/profileicon.png')}
              style={styles.avatar_logo}
            />
          </TouchableOpacity>
          <Text style={styles.white_text}>Profile</Text>
        </View>
      </View>

      {/* Error Modal */}
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

      {/* Confirmation Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={confirmationModalVisible}
        onRequestClose={() => {
          setConfirmationModalVisible(!confirmationModalVisible);
        }}>
        <View style={styles.modalView}>
          <Text style={styles.errorText}>
            Are you sure you want to delete your account? This action cannot be
            undone.
          </Text>
          <TouchableOpacity
            style={[styles.closeButton, { backgroundColor: '#ff4d4f' }]}
            onPress={confirmDeleteAccount}>
            <Text style={styles.textStyle}>Confirm</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.closeButton, { marginTop: 10 }]}
            onPress={() => setConfirmationModalVisible(false)}>
            <Text style={styles.textStyle}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'white',
    width: '100%',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  usernameText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  emailText: {
    fontSize: 16,
    color: 'gray',
  },
  buttonsContainer: {
    width: '100%',
    marginTop: 30,
  },
  button: {
    backgroundColor: '#5c5cb4',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: '#ff4d4f',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  errorText: {
    color: 'white',
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
  },
  textStyle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  logo_with_text: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
  },
  white_text: {
    color: 'white',
  },

  avatar_logo: {
    height: 40,
    width: 40,
    borderRadius: 90,
  },
  flex_row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  space_between: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  bottom: {
    position: 'absolute',
    width: '100%',
    height: '100px',
    backgroundColor: '#5c5cb4',
    bottom: 0,
  },

  padding_15px: {
    padding: 15,
  },
});
