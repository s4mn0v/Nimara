import { Text, View } from 'react-native';
import styeles from '@/constants/Style';

export default function TrashScreen() {
  return (
    <View style={styeles.sstandard.container}>
      <Text style={styeles.sstandard.text}>Reportes en papelera</Text>
    </View>
  );
}
