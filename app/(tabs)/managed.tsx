import { Text, View } from 'react-native';
import styeles from '@/constants/Style';

export default function ManagedScreen() {
  return (
    <View style={styeles.sstandard.container}>
      <Text style={styeles.sstandard.text}>Reported Gestionados</Text>
    </View>
  );
}
