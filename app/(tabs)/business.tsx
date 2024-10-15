import { Platform, Text, View } from 'react-native';
import styeles from '@/constants/Style';

export default function BusinessScreen() {
  return (
    <View style={styeles.sstandard.container}>
      <Text style={styeles.sstandard.text}>Empresas</Text>
    </View>
  );
}
