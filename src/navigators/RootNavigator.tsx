// In App.js in a new project

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import * as React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Icon, IconType, Spacer} from '../components/shared';
import IssuesScreen from '../screens/IssuesScreen';
import RepositoriesScreen from '../screens/RepositoriesScreen';
import SearchScreen from '../screens/SearchScreen';

export type RootStackParamList = {
  Home: HomeTabParamList;
  Search: undefined;
};

export type HomeTabParamList = {
  Issues: undefined;
  Repositories: undefined;
};

const RootStack = createNativeStackNavigator();
const HomeTab = createBottomTabNavigator();

type HomeTabNavigatorProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

function HomeTabNavigator({navigation}: HomeTabNavigatorProps) {
  return (
    <HomeTab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let iconName: IconType;

          if (route.name === 'Issues') {
            iconName = 'issue-opened';
          } else if (route.name === 'Repositories') {
            iconName = 'repo';
          }

          return <Icon name={iconName!} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#748ffc',
        tabBarInactiveTintColor: 'gray',
      })}>
      <HomeTab.Screen name="Issues" component={IssuesScreen} />
      <HomeTab.Screen
        name="Repositories"
        component={RepositoriesScreen}
        options={{
          headerRight: props => (
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                <Icon name="search" size={20} />
              </TouchableOpacity>
              <Spacer width={8} />
            </View>
          ),
        }}
      />
    </HomeTab.Navigator>
  );
}

function RootNavigator() {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen
          name="Home"
          component={HomeTabNavigator}
          options={{headerShown: false}}
        />
        <RootStack.Screen name="Search" component={SearchScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigator;