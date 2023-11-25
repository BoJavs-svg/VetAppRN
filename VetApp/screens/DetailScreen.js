import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet ,TouchableOpacity} from 'react-native';
import firebase from "../firebase";
import { useNavigation } from '@react-navigation/native';

export default function DetailScreen({ route }) {
    const [details, setDetails] = useState(null);
    const [user, setUser] = useState(null);
    const [name, setName] = useState('');
    const [weight, setWeight] = useState('');
    const [age, setAge] = useState('');

    useEffect(() => {
        if (route.params) {
            const { details } = route.params;
            const { user } = route.params;
            if (details) {
                setDetails(details);
            }
            if (user) {
                setUser(user);
            }
        }
    }, [route.params]);

    const navigation = useNavigation();

    const saveAnimal = () => {
        if (name === '' || weight === '' || age === '') {
            alert('Please fill out all fields');
            return;
        }
        const animalsRef = firebase.firestore().collection('animals');
        animalsRef
            .add({
                name,
                weight,
                age,
                email: user.email,
            })
            .then(() => {
                navigation.navigate('MenuScreen', { user: user });
            })
            .catch((error) => {
                alert(error);
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Details</Text>
            {details ? (
                <View>
                    <Text style={styles.text}>Name: {details.name}</Text>
                    <Text style={styles.text}>Weight: {details.weight}</Text>
                    <Text style={styles.text}>Age: {details.age}</Text>
                    <Text style={styles.text}>Added by: {details.email}</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('MenuScreen', { user: user })}
                        style={styles.detailsButton}
                    >  
                        <Text style={styles.buttonText}>Back to Menu</Text>
                    </TouchableOpacity>

                </View>
            ) : (
                <View>
                    <Text style={styles.label}>Animal Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Animal Name'
                        onChangeText={setName}
                        value={name}
                    />
                    <Text style={styles.label}>Animal Weight</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Animal Weight'
                        onChangeText={setWeight}
                        value={weight}
                    />
                    <Text style={styles.label}>Animal Age</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Animal Age'
                        onChangeText={setAge}
                        value={age}
                    />
                <TouchableOpacity
                    onPress={saveAnimal}
                    style={styles.detailsButton}
                >
                    <Text style={styles.buttonText}>Save Animal</Text>    
                </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    text: {
        fontSize: 18,
        marginBottom: 8,
    },
    label: {
        fontSize: 16,
        marginBottom: 4,
        color: '#333',
    },
    input: {
        height: 40,
        borderColor: '#999',
        borderWidth: 1,
        marginBottom: 8,
        paddingLeft: 8,
    },
    detailsButton: {
        backgroundColor: '#2ecc71',
        marginTop: 16,
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
