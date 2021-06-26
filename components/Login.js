import React, { useState } from 'react';
import Firebase from '../config/Firebase'
import { View, Text, TextInput, Button, TouchableOpacity,} from 'react-native';
import { styles } from '../App'
import { useNavigation } from '@react-navigation/native';

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigation = useNavigation(); 

    const handleLogin = () => {
        Firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => navigation.navigate('Profile'))
            .catch(error => alert(error.message))
    }

    return (
        <View>
            <TextInput
                value={email}
                style={styles.input}
                onChangeText={email => setEmail(email)}
                placeholder='Email'
            />
            <TextInput
                value={password}
                style={styles.input}
                onChangeText={password => setPassword(password)}
                placeholder='Password'
                secureTextEntry={true}
            />
            <Button
                title='Log in'
                style={styles.button}
                onPress={handleLogin}
            />
            <Button 
                title="Don't have an account yet? Sign up" 
                onPress={() => navigation.navigate('Signup')}
            />
        </View>
    )
}

export default Login;