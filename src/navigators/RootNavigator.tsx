// In App.js in a new project

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import * as React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import {Icon, IconType, Spacer} from '../components/shared';
import colors from '../lib/colors';
import IssuesScreen from '../screens/IssuesScreen';
import RepositoriesScreen from '../screens/RepositoriesScreen';
import SearchScreen from '../screens/SearchScreen';
import {RootState} from '../store';

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
  const repositories = useSelector((state: RootState) => state.repositories);
  return (
    <HomeTab.Navigator
      initialRouteName={repositories.length === 0 ? 'Repositories' : 'Issues'}
      screenOptions={({route}) => ({
        headerStyle: {
          //IssuesScreen에서 헤더와 filter 사이에 그림자 생기는 거 방지
          backgroundColor: 'white',
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarIcon: ({color, size}) => {
          let iconName: IconType;

          if (route.name === 'Issues') {
            iconName = 'issue-opened';
          } else if (route.name === 'Repositories') {
            iconName = 'repo';
          }

          return <Icon name={iconName!} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: 'gray',
      })}>
      <HomeTab.Screen
        name="Issues"
        component={IssuesScreen}
        options={{title: '이슈 모아보기'}}
      />
      <HomeTab.Screen
        name="Repositories"
        component={RepositoriesScreen}
        options={{
          title: '저장소',
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
        <RootStack.Screen
          name="Search"
          component={SearchScreen}
          options={{title: '저장소 찾기'}}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigator;
