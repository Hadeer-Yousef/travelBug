import React, { useState } from 'react';
import Firebase from '../config/Firebase'
import { View, Text, TextInput, Button, TouchableOpacity, Alert, StyleSheet,} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux'
import { updateEmail, updatePassword, signup, updateUsername } from '../store/user'
import Styles from '../constants/Styles';

const Signup = (props: any) => {
    const navigation = useNavigation(); 
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSignup = async () => {
        props.updateEmail(email)
        props.updateUsername(username)
        props.updatePassword(password)
        await props.signup().catch((error: any) => {
            Alert.alert("Error", error.message)
        })
    }

    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            backgroundColor: 'white',
            paddingTop: 35
        }}>
            <TextInput
                autoCapitalize={"none"}
                value={email}
                style={Styles.input}
                onChangeText={(email: string) => setEmail(email)}
                placeholder='Email'
            />
            <TextInput
                autoCapitalize={"none"}
                value={username}
                style={Styles.input}
                onChangeText={(username: string) => setUsername(username)}
                placeholder='Username'
            />
            <TextInput
                autoCapitalize={"none"}
                value={password}
                style={Styles.input}
                onChangeText={(password: string) => setPassword(password)}
                placeholder='Password'
                secureTextEntry={true}
            />
            <Button
                title='Sign up'
                onPress={handleSignup}
            />
            <Button 
                title="Already have an account? Log in"
                onPress={() => navigation.navigate('Login')}
            />
        </View>
    )
}


const mapState = (state: any) => {
    return {
        user: state.user
    }
}

const mapDispatch = (dispatch: any) => {
    return {
        updateEmail: (email: string) => dispatch(updateEmail(email)),
        updateUsername: (username: string) => dispatch(updateUsername(username)),
        updatePassword: (password: string) => dispatch(updatePassword(password)),
        signup: () => dispatch(signup())
    }
}
export default connect(mapState, mapDispatch)(Signup)