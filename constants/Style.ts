import { StyleSheet } from 'react-native';

const sstandard = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#190526',
    paddingVertical: 45,
    paddingHorizontal: 20,
  },
  text: {
    color: '#fff',
  },
});

const smenu = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#190526',
  },
  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    backgroundColor: '#ffd33d',
    borderRadius: 28,
    zIndex: 2,
    elevation: 3,
  },
  dropdown: {
    position: 'absolute',
    right: 20,
    bottom: 90,
    borderRadius: 8,
    padding: 8,
    elevation: 0,
  },
  tabButton: {
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 50,
    marginBottom: 10,
    width: 56,
    height: 56,
    right: -5,
  },
});

export default { sstandard, smenu };