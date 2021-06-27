import * as React from 'react';
import { Alert, Image, StyleSheet, TextInputBase } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { Text, View, } from '../components/Themed';
import Firebase, { db } from '../config/Firebase';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import firebase from 'firebase';
import ImageUtils from '../Utils/ImageUtils';
import { FontAwesome5 } from '@expo/vector-icons'; 

function AddPost(props: any) {
  const navigation = useNavigation()
  const [text, setText] = React.useState('')
  const [postImage, setPostImage] = React.useState('')
  let uploadTask: any = undefined;
  const post = async () => {
      const data: any = {
        text,
        username: props.user.username,
        uid: props.user.id,
        image: props.user.image || null
    }

    if(postImage) {
        data.postImage = postImage
    }
    await db.collection('posts')
    .add(data)
    .then(()=> {
        navigation.goBack()
    })
    .catch(error => {
        throw error
    })

  }

  const selectImage = async () => {
    const status = await ImageUtils.askForImagePermissions()
    if(status === true) {
      let result = await ImageUtils.pickImage();
      if (!result.cancelled) {
        const { modifiedImage, fileName } = await ImageUtils.handleImageSelection(result)
        uploadImage(modifiedImage, fileName)
      }
    }
  }

  const uploadImage = async (modifiedImage: any, filename: any) => {
    const response = await fetch(modifiedImage.uri);
    const blob = await response.blob()
    let ref = Firebase.storage().ref().child(`posts/${props.user.id}/${filename}`)

    uploadTask = ref.put(blob)
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, 
        (snapshot: any) => {
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes);
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: 
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING:
                    console.log('Upload is running');
                    break;
            }
        }, (error: any) => {
            console.log(error)
            switch (error.code) {
                case 'storage/unauthorized':
                    Alert.alert('Sorry, you don\'t have permission to do this')
                    break;

                case 'storage/canceled':
                    Alert.alert('Uploaed cancelled')
                    break;

                case 'storage/unknown':
                    Alert.alert('Unknowne error occured')
                    break;
            }
        }, () => {
            // Upload completed successfully, now we can get the download URL
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL: string) => {
              setPostImage(downloadURL)
              console.log(downloadURL)
            });
        });
}
  const renderImage = () => {
      if(!props.user.image) {
          return <View
          style={{
            height: 60,
            width: 60,
            borderRadius: 30,
            backgroundColor: 'lightgrey',
            marginLeft: 25
        }}
          />
      }
      return <Image
      source={{
          uri: props.user.image
      }}
      style={{
          height: 60,
          width: 60,
          borderRadius: 30,
          marginLeft: 25
      }}
      />
  }

  const renderPostImage = () => {
      if(postImage) {
          console.log('rendering post')
       return <Image
       style={{ width: 150, height: 100, borderRadius: 5, marginTop: 25, alignSelf: 'center' }}
       resizeMode="cover"
       source={{
           uri: postImage
       }}
       />
      }
      return null
  }
  return (
    
    <View style={{ flex: 1, backgroundColor: 'white'}}>
        <View style={styles.container}>
      {renderImage()}
      <TextInput
      value={text}
      onChangeText={setText}
      placeholder="Enter text.."
      style={{flex: 1, 
        marginLeft: 20,
        fontSize: 18,
        paddingTop: 20,
        backgroundColor: 'white'}}
      multiline={true}
      />
        </View>

        {renderPostImage()}
        <View style={{ justifyContent: 'flex-end', flexDirection: 'row'}}>
        <TouchableOpacity 
        onPress={()=> {
            selectImage()
        }}
        style={{
          marginTop: 25,
          marginRight: 20,
        }}>

        <FontAwesome5 name="file-image" size={36} color="blue" />
        </TouchableOpacity>

        <TouchableOpacity 
        onPress={()=> {
            post()
        }}
        
        style={{
            borderRadius: 5,
            width: 100,
            height:50,
            backgroundColor: 'blue',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'flex-end',
            marginRight: 20,
            marginTop: 25,
        }}>
            <Text style={{
                fontSize: 16,
                color: 'white'
            }}>Post</Text>
        </TouchableOpacity>
        </View>

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
export default connect(mapState, mapDispatch)(AddPost)

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingTop: 25,
    flexDirection: 'row',
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
