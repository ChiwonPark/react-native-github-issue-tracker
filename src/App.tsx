import React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import RepositoriesScreen from './screens/RepositoriesScreen';

const BottomTab = createBottomTabNavigator();

function IssuesScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Issues Screen</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Settings Screen</Text>
    </View>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <BottomTab.Navigator initialRouteName="Repositories">
        <BottomTab.Screen name="Issues" component={IssuesScreen} />
        <BottomTab.Screen name="Repositories" component={RepositoriesScreen} />
        <BottomTab.Screen name="Settings" component={SettingsScreen} />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
};

export default App;
