import * as react from 'react';
import { useState, useEffect } from 'react';
import { MoveDetails } from '../models/MoveDetails';
import {Text, View, Image, ScrollView, FlatList, TouchableOpacity, ActivityIndicator} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../AppNavigation';
import { style } from '../styles/MoveStyle';

type MooveProps = NativeStackScreenProps<RootStackParamList, 'Mooves'>;

function Mooves(props: MooveProps) {
    const { navigation } = props;
    const { route } = props;
    const {moveDetails, moveName} = route.params;
    const [details, setDetails] = useState<MoveDetails[]>([])
    const [loading, setLoading] = useState(false)

    const getDetails = async () => {
        try {
            setLoading(true)
            const response = await fetch(moveDetails);
            if(response.status === 200 && response) {
                const json = await response.json();
                const formattedData: MoveDetails = {
                        moveDetails: json.moveDetails,
                        moveName: json.moveName,
                        effect_entries: json.effect_entries,
                        flavor_text_entries: json.flavor_text_entries,
                        contest_type: json.contest_type,
                        learned_by_pokemon: json.learned_by_pokemon,
                        damage_class: json.damage_class.url.split('/').filter(Boolean).pop(),
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


    if (loading || details.length === 0) {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    const handleEffectEntries = details[0]?.effect_entries;
    const handleShortEntries = details[0]?.flavor_text_entries;
    const shortEffects = handleEffectEntries.map((e) => e.short_effect)[1];
    const flavorEntries = handleShortEntries.map((e) => e.flavor_text)[5];
    const damageClass = details[0]?.damage_class;
    const type = details[0]?.contest_type.name;
    const learnedBy = details[0]?.learned_by_pokemon.map((p) => p.name) || [];


    return (
                <ScrollView>
                    <View style={{padding: 16, width: '100%'}}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Image source={require('../assets/back.png')} style={style.back}/>
                        </TouchableOpacity>

                        <Text style={style.subtitle}>Movements:</Text>
                        <Text style={style.detailsTitle}>{moveName}</Text>
                        <Text style={style.subtitle2}>Damage Level:{damageClass}</Text>

                        <Text style={style.details}>{flavorEntries}</Text>
                        <Text style={style.subtitle3}>Effect Entries</Text>
                        <Text style={style.details1}>{shortEffects}</Text>
                        <Text style={style.subtitle3}>Contest-Type</Text>
                        <Text style={style.moveDetails}>{type}</Text>
                        <Text style={style.subtitle3}>Learned By Pokémon:</Text>
                        <FlatList
                            data={learnedBy}
                            renderItem={({item: learnedByP}) => (
                                <Text style={style.moveDetails2}>{learnedByP}</Text>
                            )}
                            keyExtractor={(item, index) => index.toString()}
                            numColumns={2}
                            columnWrapperStyle={style.columnWrapperTypes}
                            scrollEnabled={false}
                            >
                        </FlatList>
                    </View>

                </ScrollView>
    )
}export default Mooves;