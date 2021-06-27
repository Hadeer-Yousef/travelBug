import * as React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text, View } from '../components/Themed';
import Firebase from '../config/Firebase';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';

function ProfileTab(props: any) {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <View style={{
        flexDirection: 'row',
        marginLeft: 30,
        marginRight: 15,
        alignItems: 'center'
      }}>

      <View style={{
        width: 80,
        height: 80,
        backgroundColor: 'lightgrey',
        borderRadius: 40
      }}/>

        <Text style={{ marginLeft: 30 }}>{props.user.username}</Text>


      </View>

      <Text>I am on Profile</Text>
      <TouchableOpacity onPress={() => {
        Firebase.auth().signOut().catch((error) => {
          console.log(error)
        });
      }}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const mapState = (state: any) => {
  return {
      user: state.user
  }
}

const mapDispatch = (dispatch: any) => {
  return {
  }
}
export default connect(mapState, mapDispatch)(ProfileTab)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
