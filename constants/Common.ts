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
    marginBottom: 15,
  },
  dangerButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.light.danger,
  },
  profileContent: {
    padding: 13,
  },
  profileContentTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 15,
  },
  profileReviewContainer: {
    backgroundColor: Colors.light.background,
    marginBottom: 10,
  },
  Reviewbutton: {
    paddingVertical: 12,
    borderRadius: 7,
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#000',
    marginBottom: 15,
  },
  ReviewbuttonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  imageContainer: {
    position: 'relative', 
  },
  userContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.light.background,
    padding: 10,
    marginBottom: 5,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginRight: 10,
  },
  details: {
    flexDirection: 'column',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtext: {
    color: '#777',
    fontSize: 14
  },
  levelBadge: {
    position: 'absolute',
    bottom: 0,
    right: 10,
    backgroundColor: '#f3f0f0',
    borderRadius: 12,
    paddingHorizontal: 4,
    paddingVertical: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: Colors.light.primary,
  },
  content: {
    paddingHorizontal: 15,
  },
  header: {
    fontSize: 32,
    fontWeight: '900',
  },
  subHeader: {
    fontSize: 16,
    marginBottom: 15,
    color: '#808080',
  },
  ErrorMessage: {
    color: Colors.light.danger
  },
  continueText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  }
});
export default Common;
