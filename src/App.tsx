import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Text, View} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator()

function IssuesScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>IssuesScreen</Text>
    </View>
  );
}

function RepositoriesScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Repositories Screen</Text>
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
      <BottomTab.Navigator>
        <BottomTab.Screen name="Issues" component={IssuesScreen} />
        <BottomTab.Screen name="Repositories" component={RepositoriesScreen} />
        <BottomTab.Screen name="Settings" component={SettingsScreen} />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
};

export default App;
