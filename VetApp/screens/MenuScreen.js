import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import firebase from "../firebase";
import { useNavigation } from '@react-navigation/native';

export default function MenuScreen({ route }) {
    const [user, setUser] = useState(null);
    const navigation = useNavigation();
    const [animals, setAnimals] = useState([]);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        if (route.params) {
            const { user } = route.params;
            if (user) {
                setUser(user);
            }
        }
        getAnimals();
    }, [route.params]);

    const getAnimals = () => {
        const animalsRef = firebase.firestore().collection('animals');
        animalsRef
            .get()
            .then((querySnapshot) => {
                const animalsData = querySnapshot.docs.map((doc) => doc.data());
                setAnimals(animalsData);
            })
            .catch((error) => {
                alert(error);
            });
    };

    useEffect(() => {
        getAnimals();
    }, [reload]);

    const renderItem = ({ item }) => (
        <View style={styles.animalItem}>
            <Text style={styles.text}>{item.name}</Text>
            <TouchableOpacity
                onPress={() => navigation.navigate('DetailScreen', { details: item, user: user })}
                style={styles.detailsButton}
            >
                <Text style={styles.buttonText}>View Details</Text>
            </TouchableOpacity>
            <View style={styles.separator} />
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Menu</Text>
            <Text style={styles.text}>Welcome,  {user ? user.email.split('@')[0] : ''}</Text>
            <Text style={styles.sectionTitle}>Animals</Text>
            <FlatList
                data={animals}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
            <TouchableOpacity
                onPress={() => navigation.navigate('DetailScreen', { details: null, user: user })}
                style={styles.addButton}
            >
                <Text style={styles.buttonText}>Add Animal</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => setReload(!reload)}
                style={styles.reloadButton}
            >
                <Text style={styles.buttonText}>Reload</Text>
            </TouchableOpacity>
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
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 8,
    },
    animalItem: {
        marginBottom: 16,
    },
    text: {
        fontSize: 18,
        marginBottom: 8,
    },
    separator: {
        height: 1,
        width: '100%',
        backgroundColor: '#ccc',
    },
    detailsButton: {
        backgroundColor: '#3498db',
        marginTop: 8,
        padding: 12,
        borderRadius: 4,
        alignItems: 'center',
    },
    addButton: {
        backgroundColor: '#2ecc71',
        marginTop: 16,
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    reloadButton: {
        backgroundColor: '#e74c3c',
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
