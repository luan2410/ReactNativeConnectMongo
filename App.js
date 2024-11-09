import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Screen01 from './screens/Screen01';
import Screen02 from './screens/Screen02';
import Screen03 from './screens/Screen03';
import Screen04 from './screens/Screen04';
import Screen05 from './screens/Screen05';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer independent={true}>
      {/*Screen option showheader false */}
      <Stack.Navigator
        initialRouteName="Screen01"
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Screen01" component={Screen01} />
        <Stack.Screen name="Screen02" component={Screen02} />
        <Stack.Screen name="Screen03" component={Screen03} />
        <Stack.Screen name="Screen04" component={Screen04} />
        <Stack.Screen name="Screen05" component={Screen05} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
