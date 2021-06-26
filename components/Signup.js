import React, { useState } from 'react';
import Firebase from '../config/Firebase'
import { View, Text, TextInput, Button, TouchableOpacity,} from 'react-native';
import { styles } from '../App'
import { useNavigation } from '@react-navigation/native';

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const navigation = useNavigation(); 

    const handleSignup = () => {
        Firebase.auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => navigation.navigate('Profile'))
            .catch(error => alert(error.message))
    }

    return (
        <View>
            <TextInput
                value={name}
                style={styles.input}
                onChangeText={name => setName(name)}
                placeholder='Name'
            />
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
                title='Sign up'
                style={styles.button}
                onPress={handleSignup}
            />
            <Button 
                title="Already have an account? Log in"
                onPress={() => navigation.navigate('Login')}
            />
        </View>
    )
}

export default Signup;