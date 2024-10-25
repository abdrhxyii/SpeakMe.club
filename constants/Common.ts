import { StyleSheet } from 'react-native';
import { Colors } from './Colors';
//    paddingHorizontal: 5,
const Common = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  headerBtn: {
    backgroundColor: '#f3f0f0', 
    padding: 10,                    
    borderRadius: 25,               
    marginRight: 10
  },
  dangerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 7,
    marginTop: 20,
    borderWidth: 1,
    borderColor: Colors.light.danger,
    marginBottom: 30,
  },
  dangerButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.light.danger,
  },
});
export default Common;
