import * as React from 'react';
import { Alert, Image, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text, View } from '../components/Themed';
import Firebase from '../config/Firebase';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import { Entypo } from '@expo/vector-icons'; 
import ImageUtils from '../Utils/ImageUtils';
import firebase from 'firebase';
import { updateImage } from '../store/user';

function ProfileTab(props: any) {
  let uploadTask: any = undefined;
  const navigation = useNavigation()
  const renderCameraIcon = () => {
    return <View style={{
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              top: 4,
              right: -12 ,
              zIndex: 10,
              width: 30,
              height: 30,
              borderRadius: 15,
            }}>
              <Entypo style={{ marginTop: 2 }} name="camera" size={17} color="black" />
            </View>
  }

  const selectImage = async () => {
    const status = await ImageUtils.askForImagePermissions()
    if(status === true) {
      let result = await ImageUtils.pickImage();
      if (!result.cancelled) {
        const { modifiedImage, fileName } = await ImageUtils.handleImageSelection(result)
        uploadImage(modifiedImage)
      }
    }
  }

  const uploadImage = async (modifiedImage: any) => {
    const response = await fetch(modifiedImage.uri);
    const blob = await response.blob()
    let ref = Firebase.storage().ref().child(`profile/${props.user.uid}/profile.jpg`)

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
              props.updateImage(downloadURL)
              console.log(downloadURL)
            });
        });
}


  const renderProfilePic = () => {
    if(props.user.image) {
      return <TouchableOpacity 
              onPress={selectImage}
              style={styles.avatar}>
                {renderCameraIcon()}
                <Image 
                  style={styles.avatar}
                  source={{
                    uri: props.user.image
                  }}/>
              </TouchableOpacity>
    }
    return <TouchableOpacity 
            onPress={selectImage}
            style={styles.avatar}>
              {renderCameraIcon()}
          </TouchableOpacity>
  }
  return (
    <View style={styles.container}>
      <View style={{
        flexDirection: 'row',
        marginLeft: 30,
        marginRight: 15,
        alignItems: 'center'
      }}>

        {renderProfilePic()}
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
    updateImage: (image: string) => dispatch(updateImage(image)),
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
  avatar: {
    width: 80,
    height: 80,
    backgroundColor: 'lightgrey',
    borderRadius: 40
  }
});
