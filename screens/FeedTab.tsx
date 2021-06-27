import * as React from 'react';
import { FlatList, Image, StyleSheet, TouchableOpacity, useWindowDimensions} from 'react-native';
import { Text, View } from '../components/Themed';
import { Entypo } from '@expo/vector-icons'; 
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { db } from '../config/Firebase';
import { connect } from 'react-redux';
import { addPost } from '../store/posts';

function FeedTab(props: any) {
  const windowWidth = useWindowDimensions().width;
  const navigation = useNavigation()
  const [posts, setPosts] = React.useState([])
  React.useEffect(()=> {
    db.collection("posts")
    .onSnapshot((snapshot) => {
      snapshot.docChanges().forEach(function(change) {
        if (change.type === "added") {
          const newPost: any = [{
            ...change.doc.data(),
            id: change.doc.id
          }]
          props.addPost(newPost)
        }
    });

    });

  }, [])
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
  const renderPost = (rowData: any) => {
    return <View style={{
      borderBottomWidth: 2,
      borderColor: 'lightgrey',
      alignSelf: 'stretch',
      paddingBottom: 25,
      paddingHorizontal: 20,
    }}>
    <View style={{ flexDirection: 'row', paddingTop: 15}}>

    <Image style={{
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: 'lightgrey'
    }} 
    source={{
      uri: rowData.item.image
    }}/>

    <Text style={{ marginLeft: 10, marginTop: 10, fontWeight: '700'}}>{rowData.item.username}</Text>
    </View>

    <Text style={{ marginTop: 15, fontSize: 16 }}>{rowData.item.text}</Text>
    {
      rowData.item.postImage? 
      <Image style={{
        width: windowWidth -50,
        marginTop: 25,
        height: 200,
        borderRadius: 25,
        backgroundColor: 'lightgrey'
      }} 
      resizeMode="cover"
      source={{
        uri: rowData.item.postImage
      }}/>
      :
      null
    }
    </View>
  }
  return (
    <View style={styles.container}>
      <FlatList
      renderItem={renderPost}
      data={props.posts}
      // keyExtractor={(item)=>{

      //   return item.text
      // }}
      />
      {renderNewPostButton()}
    </View>
  );
}
const mapState = (state: any) => {
  return {
      user: state.user,
      posts: state.posts
  }
}

const mapDispatch = (dispatch: any) => {
  return {
    addPost: (post: Array<any>) => dispatch(addPost(post)),
  }
}
export default connect(mapState, mapDispatch)(FeedTab)

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
