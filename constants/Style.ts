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

const webHeader = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f0f0f0',
    height: 50,
  },
  link: {
    marginLeft: 20,
  },
  linkText: {
    fontSize: 16,
    color: '#9F2CBF',
    textTransform: 'capitalize',
  },
})

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
    backgroundColor: 'purple',
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

export default { sstandard, smenu, webHeader };