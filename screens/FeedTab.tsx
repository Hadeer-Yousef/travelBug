import * as React from 'react';
import { StyleSheet, TouchableOpacity} from 'react-native';
import { Text, View } from '../components/Themed';
import { Entypo } from '@expo/vector-icons'; 
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

export default function FeedTab() {
  const navigation = useNavigation()
  const renderNewPostButton = () => {
    return <TouchableOpacity 
    onPress={()=> {
      navigation.navigate('NewPost')
    }}
    style={{
      width: 60,
      height: 60,
      borderRadius: 30,
      position: 'absolute',
      bottom: 50,
      right: 20,
      backgroundColor: 'blue',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Entypo name="new-message" size={24} color="white" />
    </TouchableOpacity>
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Feed</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text>I am on feed</Text>

      {renderNewPostButton()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
