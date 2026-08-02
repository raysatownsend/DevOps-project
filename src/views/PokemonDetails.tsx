import * as react from 'react';
import {Text, View, Image, ScrollView, StyleSheet, FlatList, Button, TouchableOpacity, ActivityIndicator} from 'react-native';
import { PokemonDetail } from '../models/PokemonDetails';
import { useState, useEffect } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../AppNavigation';
import { style } from '../styles/DetailsStyle'
import { useNavigation } from '@react-navigation/native';

type PokemonDetailsProps = NativeStackScreenProps<RootStackParamList, 'PokemonDetails'>;

function PokemonDetails(props: PokemonDetailsProps) {
    const { navigation } = props;
    const { route } = props;
    const { name, details: url, image } = route.params;
    const [details, setDetails] = useState<PokemonDetail[]>([])
    const [loading, setLoading] = useState(false)
    
    const getDetails = async () => {
        try {
            setLoading(true)
            const response = await fetch(url);
            if(response.status === 200 && response) {
                const json = await response.json();
                const formattedData: PokemonDetail = {
                        types: json.types,
                        abilities: json.abilities,
                        moves: json.moves,
                        name: json.name
                };
                setDetails([formattedData]);
                setLoading(false);
            }
        }catch(error) {
            setLoading(false)
            console.log('Error while getting Pokemon details.')
        }
    }

    useEffect(() => {
        getDetails();
    }, []);
    
    

    if (loading) {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    const abilities = details[0]?.abilities || [];
    const hability = abilities.map((a: any) => a.ability.name) || [];
    const moves = details[0]?.moves || [];
    const types = details[0]?.types || [];
    const type = types.map((t:any) => t.type.name) || [];

    const handleSelectMove = (moveUrl: string, name: string) => {
        navigation.navigate('Mooves', { moveDetails: moveUrl, moveName: name });
    };

    const renderGridItem = ({ item }: { item: any }) => (
        <TouchableOpacity
            onPress={() => handleSelectMove(item.move.url, item.move.name)}
            activeOpacity={0.7}

        >
            <Text style={style.details}>{item.move.name}</Text>
        </TouchableOpacity>
    );

    return (
        <ScrollView>
            <View style={{padding: 16}}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../assets/back.png')} style={style.back}/>
                </TouchableOpacity>
                
                <Text style={style.detailsTitle}>{name}</Text>
                <Image source={{uri: image}} style={style.detailsImage}/>

                <FlatList
                    data={type}
                    renderItem={({item:typeName}) => (
                        <Text style={[style.typeDetails, typeName.includes('grass') ? {backgroundColor: '#085f17'} : typeName.includes('fire') ? {backgroundColor: '#942f00'} : typeName.includes('poison') ? {backgroundColor: '#B50A0A'} : typeName.includes('water') ? {backgroundColor: '#1c90f4'} : {backgroundColor: '#D5A701'}]}>{typeName}</Text>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={2}
                    columnWrapperStyle={style.columnWrapperTypes}
                    scrollEnabled={false}
                    snapToAlignment='center'
                    />
                <Text style={[style.detailssubtitle, { color:'#3465A7'}]}>Abilities:</Text>
                <FlatList
                    data={hability}
                    renderItem={({item:abilityName}) => (
                        <Text style={style.details}>{abilityName}</Text>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={2}
                    columnWrapperStyle={style.columnWrapper}
                    scrollEnabled={false}
                    />
                <Text style={[style.detailssubtitle, { color:'#D5A701'}]}>Movements:</Text>
                <FlatList
                    data={moves}
                    renderItem={renderGridItem}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={2}
                    columnWrapperStyle={style.columnWrapper}
                    scrollEnabled={false}
                    />
            </View>
        </ScrollView>
    );
}

export default PokemonDetails;