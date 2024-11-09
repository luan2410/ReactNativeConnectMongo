import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import React, { useState, useEffect } from 'react';

export default function Screen03({ navigation, route }) {
  const [categoryData, setCategoryData] = useState([]);
  const [locationData, setLocation] = useState([]);
  const [userData, setUserData] = useState(null); // State to hold user data
  const userEmail = route.params?.email; // Get the email passed from previous screen

  useEffect(() => {
    // Fetch category data
    fetch('https://671b63d32c842d92c37fafec.mockapi.io/api/v1/Category')
      .then((response) => response.json())
      .then((json) => setCategoryData(json))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    // Fetch location data
    fetch('https://671b63d32c842d92c37fafec.mockapi.io/api/v1/Location')
      .then((response) => response.json())
      .then((json) => setLocation(json))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
  // Fetch user data based on email
  const fetchUserData = async () => {
    if (userEmail) {
      try {
        const response = await fetch(`http://localhost:5001/get-user?email=${userEmail}`);
        const data = await response.json();

        if (response.ok) {
          setUserData(data); // Set user data if found
        } else {
          alert('Error', data.message || 'Failed to fetch user data.');
        }
      } catch (error) {
      }
    }
  };

  fetchUserData(); // Call fetchUserData function
}, [userEmail]);

  const renderItemCategory = ({ item }) => (
    <View style={styles.logo_with_text}>
      <TouchableOpacity>
        <Image style={styles.avatar_logo} source={{ uri: item.image }} />
      </TouchableOpacity>
      <Text style={styles.bold_text}>{item.name}</Text>
    </View>
  );

  const renderItemSmallPicture = ({ item }) => (
    <TouchableOpacity>
      <Image style={styles.small_picture} source={{ uri: item.image }} />
    </TouchableOpacity>
  );

  const renderItemBigPicture = ({ item }) => (
    <TouchableOpacity>
      <Image style={styles.big_picture} source={{ uri: item.image }} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={[styles.header, styles.flex_col, styles.space_between, styles.padding_15px]}>
        <View style={[styles.space_between, styles.flex_row]}>
          <Image
            style={styles.avatar_logo}
            source={require('../assets/images/logoicon.png')}
          />
          <View style={[styles.flex_row, styles.search_bar, { paddingLeft: 50 }]}>
            <TextInput
              style={styles.search_text}
              placeholder="Search here"
            />
            <TouchableOpacity>
              <Image
                source={require('../assets/images/findicon.png')}
                style={styles.avatar_logo}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.space_between, styles.flex_row]}>
          <View style={styles.flex_row}>
            <TouchableOpacity>
              <Image
                source={{uri: userData ? userData.url : 'https://cdn.pixabay.com/photo/2016/08/28/13/31/basic-1625962_640.png'}}
                style={styles.avatar_logo}
              />
            </TouchableOpacity>
            <View style={styles.flex_col}>
              <Text style={[styles.bold_text, styles.white_text]}>
                Welcome!
              </Text>
              <Text style={styles.white_text}>{userData ? userData.username : 'User'}</Text> {/* Display username */}
            </View>
          </View>
          <TouchableOpacity>
            <Image
              source={require('../assets/images/ringicon.png')}
              style={styles.avatar_logo}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={[styles.content, styles.padding_15px]}>
        <View style={[styles.space_between, styles.flex_row]}>
          <Text style={styles.bold_text}>Category</Text>
          <TouchableOpacity>
            <Image
              source={require('../assets/images/3gach.png')}
              style={styles.bagach_logo}
            />
          </TouchableOpacity>
        </View>
        <FlatList
          data={categoryData}
          renderItem={renderItemCategory}
          contentContainerStyle={styles.category_list}
        />
        <View style={[styles.space_between, styles.flex_row]}>
          <Text style={styles.bold_text}>Popular destination</Text>
          <TouchableOpacity>
            <Image
              source={require('../assets/images/3gach.png')}
              style={styles.bagach_logo}
            />
          </TouchableOpacity>
        </View>
        <FlatList
          horizontal={true}
          data={locationData}
          renderItem={renderItemSmallPicture}
          contentContainerStyle={{ height: 'auto', gap: 4 }}
        />
        <View style={[styles.space_between, styles.flex_row]}>
          <Text style={styles.bold_text}>Popular destination</Text>
          <TouchableOpacity>
            <Image
              source={require('../assets/images/3gach.png')}
              style={styles.bagach_logo}
            />
          </TouchableOpacity>
        </View>
        <FlatList
          horizontal={true}
          data={locationData}
          renderItem={renderItemBigPicture}
          contentContainerStyle={{ height: 'auto', gap: 4 }}
        />
      </ScrollView>

      <View style={[styles.bottom, styles.flex_row, styles.space_between, styles.padding_15px]}>
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
          <TouchableOpacity onPress = {()=>navigation.navigate("Screen04",{userData})}>
            <Image
              source={require('../assets/images/profileicon.png')}
              style={styles.avatar_logo}
            />
          </TouchableOpacity>
          <Text style={styles.white_text}>Profile</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'white',
    width: '100%',
  },
  small_picture: {
    height: 50,
    width: 80,
  },
  big_picture: {
    height: 80,
    width: 120,
  },
  category_list: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  logo_with_text: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
  },
  search_bar: {
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'white',
    width: 'auto',
    flexDirection: 'row',
    height: 40,
  },
  search_text: {
    borderWidth: 0,
    flex: 1,
  },
  bold_text: {
    fontWeight: 'bold',
  },
  white_text: {
    color: 'white',
  },
  bagach_logo: {
    height: 30,
    width: 30,
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
  flex_col: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  space_between: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    position: 'absolute',
    width: '100%',
    height: '100px',
    backgroundColor: '#5c5cb4',
    top: 0,
    zIndex: 10,
  },
  bottom: {
    position: 'absolute',
    width: '100%',
    height: '100px',
    backgroundColor: '#5c5cb4',
    bottom: 0,
  },
  content: {
    paddingTop: 100,
    paddingBottom: 100,
  },
  padding_15px: {
    padding: 15,
  },
});

