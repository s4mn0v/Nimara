import { Text, View, StyleSheet } from 'react-native';
import styles from '@/constants/Style'; // Importas el objeto que contiene sstandard y smenu

export default function Home() {
  return (
    <View style={styles.sstandard.container}>
      <Text style={styles.sstandard.text}>Reportes</Text>
      <Text style={styles.sstandard.text}>Reportes 2</Text>
    </View>
  );
}
