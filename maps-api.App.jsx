npm install -g react-native-cli
react-native init MyProject

react-native run-android
react-native run-ios
// Install the necessary dependencies
npm install --save react-navigation

// Create a navigation stack for your app
import { createStackNavigator } from 'react-navigation';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';

const AppNavigator = createStackNavigator({
  Home: { screen: HomeScreen },
  Details: { screen: DetailsScreen },
});

// Render the navigation stack in your app
import { createAppContainer } from 'react-navigation';

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
// Fetch data from an API endpoint
import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: null,
    };
  }

  componentDidMount() {
    return fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={{ flex: 1, paddingTop: 20 }}>
        {this.state.dataSource.map((item) => (
          <Text key={item.id}>{item.title}</Text>
        ))}
      </View>
    );
  }
}
// Create a form with input fields and a submit button
import React, { Component } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  handleInputChange = (inputName, inputValue) => {
    this.setState({ [inputName]: inputValue });
  };

  handleSubmit = () => {
    const { username, password } = this.state;
    // Handle form submission here
  };

  render() {
    return (
      <View style={{ flex: 1, padding: 20 }}>
        <Text>Username</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={(text) => this.handleInputChange('username', text)}
          value={this.state.username}
        />
        <Text>Password</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={(text) => this.handleInputChange('password', text)}
          value={this.state.password}
        />
        <Button title="Submit" onPress={this.handleSubmit} />
      </View>
    );
  }
}
``
// Install the necessary dependencies
npm install --save react-native-maps react-native-geolocation-service

// Add the following code to your App.js file
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialPosition: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      markerPosition: {
        latitude: 0,
        longitude: 0,
      },
    };
  }

  componentDidMount() {
    Geolocation.getCurrentPosition(
      (position) => {
        var lat = parseFloat(position.coords.latitude);
        var long = parseFloat(position.coords.longitude);

        var initialRegion = {
          latitude: lat,
          longitude: long,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        };

        this.setState({ initialPosition: initialRegion });
        this.setState({ markerPosition: initialRegion });
      },
      (error) => alert(JSON.stringify(error)),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );

    this.watchID = Geolocation.watchPosition((position) => {
      var lat = parseFloat(position.coords.latitude);
      var long = parseFloat(position.coords.longitude);

      var lastRegion = {
        latitude: lat,
        longitude: long,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };

      this.setState({ initialPosition: lastRegion });
      this.setState({ markerPosition: lastRegion });
    });
  }

  componentWillUnmount() {
    Geolocation.clearWatch(this.watchID);
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView style={styles.map} region={this.state.initialPosition}>
          <Marker coordinate={this.state.markerPosition} />
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
<manifest>
  <application >
    <meta-data
      android:name="com.google.android.geo.API_KEY"
      android:value="YOUR_API_KEY_HERE" />
    ...
  </application>
</manifest>

