import React, { useState } from 'react';
import Firebase from '../config/Firebase'
import { View, Text, TextInput, Button, TouchableOpacity, Alert,} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { updateEmail, updatePassword, login, getUser } from '../store/user'
import { connect } from 'react-redux'
import Styles from '../constants/Styles';


const Login = (props: any) => {
    const navigation = useNavigation(); 
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = () => {
        props.updateEmail(email)
        props.updatePassword(password)
        props.login().catch((error: any)=> {
            Alert.alert("Error", error.message)
        })
    }

    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            paddingTop: 35,
            backgroundColor: 'white'
        }}>
            <TextInput
                value={email}
                style={Styles.input}
                onChangeText={email => {
                    setEmail(email)
                }}
                autoCapitalize={"none"}
                autoCorrect={false}
                autoCompleteType={"off"}
                placeholder='Email'
            />
            <TextInput
                value={password}
                style={Styles.input}
                onChangeText={password => {
                    setPassword(password)
                }}
                placeholder='Password'
                secureTextEntry={true}
            />
            <Button
                title='Log in'
                onPress={handleLogin}
            />
            <Button 
                title="Don't have an account yet? Sign up" 
                onPress={() => navigation.navigate('Signup')}
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
        updatePassword: (password: string) => dispatch(updatePassword(password)),
        login: () => dispatch(login()),
        getUser: (uid: string) => dispatch(getUser(uid))
    }
}
export default connect(mapState, mapDispatch)(Login)