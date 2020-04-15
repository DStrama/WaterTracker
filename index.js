import { AppRegistry, Platform } from 'react-native';
import App from './App';

AppRegistry.registerComponent('water', () => App);

if (Platform.OS === 'web') {
  const rootTag = document.getElementById('root') || document.getElementById('main');
  AppRegistry.runApplication('water', { rootTag });
}
