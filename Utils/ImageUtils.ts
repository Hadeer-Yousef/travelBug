import { Alert } from "react-native"
import * as ImageManipulator from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';

async function askForImagePermissions() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status !== 'granted') {
        Alert.alert('Sorry, we need camera roll permissions to make this work! Please change it in your settings if you want to use this feature.')
        return false
    } else {
        return true
    }
}

async function pickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
    })
    return result
}

async function handleImageSelection(result: any) {
    let regex = /([a-zA-Z0-9\s_\\.\-\(\):])+(.jpeg|.jpg|.png|.gif)$/
    let extensionRegex = /(.jpeg|.jpg|.png|.gif)$/
    const fileNameMatches = result.uri.match(regex);

    if (!fileNameMatches) {
        Alert.alert("Error", "Image extension is unacceptable.")
        return {}
    }

    let fileName = result.uri.match(regex)[0];

    const fileExtensionMatches = fileName.match(extensionRegex);
    if (!fileExtensionMatches) {
        Alert.alert("Error", "Image extension is unacceptable.")
        return {}
    }

    let newImageDimensions = { width: result.width, height: result.height }
    if (result.height > 1000 || result.width > 1000) {
        let resizeFactor = 1
        if (result.height > result.width) {
            resizeFactor = 1000 / result.height
        } else {
            resizeFactor = 1000 / result.width
        }
        newImageDimensions = { width: resizeFactor * result.width, height: resizeFactor * result.height }
    }
    const modifiedImage = await ImageManipulator.manipulateAsync(result.uri, [{ resize: newImageDimensions }], { compress: 0.35, format: ImageManipulator.SaveFormat['JPEG'] })
    return { modifiedImage, fileName }
}


const ImageUtils = {
    askForImagePermissions,
    pickImage,
    handleImageSelection
}
export default ImageUtils;