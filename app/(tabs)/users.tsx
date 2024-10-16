import { Text, View } from 'react-native';
import styeles from '@/constants/Style';

export default function UsersScreen() {
  return (
    <View style={styeles.sstandard.container}>
        <Text style={styeles.sstandard.text}>Usuarios</Text>
    </View>
  );
}
