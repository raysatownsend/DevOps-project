import * as react from 'react';
import {Text, View, Image, FlatList, Button, TouchableOpacity, TouchableHighlight, TextInput, Modal, Alert, Pressable} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect, useRef } from 'react';
import { style }from '../styles/HomeStyles';
import { GridItem } from '../models/GridItem';
import { ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../AppNavigation';
import { CheckBoxItems } from '../models/CheckBoxItems';
import { PokemonDetail } from '../models/PokemonDetails';

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

function Home(props: HomeProps) {
    const { navigation } = props;
    const [data, setData] = useState<GridItem[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [inputText, setInputText] = useState('');
    const [modalVisible, setModalVisible] = useState(false)
    const [checkedItems, setCheckedItems] = useState<CheckBoxItems[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const fullData = useRef<GridItem[]>([]);

    const handleSelectPokemon = (item: GridItem) => {
        const details = item.url;
        const name = item.name;
        const image = item.image;
        navigation.navigate('PokemonDetails', { name, details, image });
    };

    const fetchMorePokemon = async (pageNum: number) => {
        if (loading) return;

        try {
            setLoading(true);
            const limit = 20;
            const offset = (pageNum - 1) * limit;

            const response = await fetch(
                `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
            );
            const json = await response.json();

            // Transform API data to include images
            const formattedData: GridItem[] = json.results.map((item: any) => {
                const pokemonId = item.url.split('/').filter(Boolean).pop();
                return {
                    name: item.name,
                    url: item.url,
                    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`,
                };
            });

            setData(prev => [...prev, ...formattedData]);
            fullData.current = [...fullData.current, ...formattedData];
            await fetchFilters(formattedData);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching Pokemon:', error);
            setLoading(false);
        }
    };


    useEffect(()=> {
        fetchMorePokemon(1);
    }, []);

    const handlePagination = () => {
        if(isSearching) return;
        setPage(page + 1);
        fetchMorePokemon(page + 1)
    }

    const renderGridItem = ( {item}: {item: GridItem}) => (
        <TouchableOpacity 
            style={style.gridItem}
            onPress={() => handleSelectPokemon(item)}
            activeOpacity={0.7}
        >
            <Image 
                source={{uri: item.image}}
                style={style.gridImage}
                resizeMode='contain'
            />
            <Text style={style.gridTitle}>{item.name}</Text>
        </TouchableOpacity>
    );

    const handleSearch = () => {

        if(!inputText.trim()) {
            setIsSearching(false);
            setData(fullData.current);
            return;
        }

        const filteredData = fullData.current.filter((item) => item.name.toLowerCase().match(inputText.toLowerCase()));

        if(filteredData.length === 0) {
            Alert.alert(`Could not find any pokémon named ${inputText}`)
             setIsSearching(false);
            setData(fullData.current);
            return;
        }
        setIsSearching(true);
        setData(filteredData);
    }

    const fetchFilters = async (pokemonList : GridItem[]) => {
        const types = new Set<string>();
        try {
            await Promise.all(
                pokemonList.map(async(pokemon) => {
                    const url = pokemon.url
                    const res = await fetch(url);
                    if(!res.ok) return;
                    const detail: PokemonDetail = await res.json();
                    if (!detail.types || !Array.isArray(detail.types) || detail.types === undefined) return;
                    const pokemonTypes = detail.types.map(t => t.type.name);
                    pokemon.type = pokemonTypes;
                    pokemonTypes.forEach(type => types.add(type));
                })
            );
            fullData.current = fullData.current.map(p => {
                const updated = pokemonList.find(p1 => p1.url === p.url);
                return updated ?? p;
            })

            if(types.size === 0) return

            setCheckedItems(prev => {
                const existingLabels = prev.map(p => p.label);
                const newFilters: CheckBoxItems[] = Array.from(types)
                    .filter(type => !existingLabels.includes(type))
                    .map((type,index) => ({
                        indId: prev.length + index,
                        id: prev.length + index + 1,
                        label: type,
                        checked: false,
                    }));
                return [...prev, ...newFilters]
            })
        } catch (error) {
            console.log(error);
        }
        
    }

    const changeInputText = (text: string) => {
        setInputText(text);
    }

    const handleModalFilter = () => {
        setModalVisible(true)

    }

    const renderFilters = ({item}: {item: CheckBoxItems}) => {
        return (
            <TouchableOpacity style={style.filterOptions} onPress={() => toggleFilter(item.id)}>
                <View style={[style.checkbox, item.checked && style.checkboxChecked]}>
                    {item.checked && <Text style={style.checkmark}>✓</Text>}
                </View>
                <Text>{item.label}</Text>
            </TouchableOpacity>
        );
    }

    const toggleFilter = (id: number) => {
        setCheckedItems(prev =>
            prev.map(item => item.id === id ? {...item, checked: !item.checked}: item)
        );
    }

    const handleFilter = () => {
        const selectedTypes = checkedItems
            .filter(item => item.checked)
            .map(item => item.label);
        if (selectedTypes.length === 0) {
            setData(fullData.current);
            setModalVisible(false);
            return
        }

        const filteredPokemon = fullData.current.filter(pokemon => pokemon.type?.some(type => selectedTypes.includes(type))
            );
            
        if(filteredPokemon.length === 0) {
            Alert.alert('No pokemon found with filters')
        }
        setIsSearching(true)
        setData(filteredPokemon)
        setModalVisible(false);
    }

    return (
        <SafeAreaProvider style={style.container}>
            <View style={style.headerContainer}>
                <Image source={require('../assets/pokemon-logo.png')}
                       style={style.headerImage}
                       resizeMode='cover'
                />
                <Text style={style.headerSubtitle}>Decks</Text>
            </View>
            <View style={style.searchContainer}>
                <TouchableOpacity onPress={handleModalFilter}>
                    <Image source={require('../assets/filter.png')} style={style.filters}/>
                </TouchableOpacity>
                <TextInput style={style.textInput} onChangeText={changeInputText} value={inputText} placeholder='search for a pokémon...'/>
                <TouchableOpacity onPress={handleSearch}>
                    <Image source={require('../assets/search.png')} style={style.filters}/>
                </TouchableOpacity>
                <Modal 
                        animationType="slide"
                        transparent={false}
                        visible={modalVisible}
                        onRequestClose={() => {
                            setModalVisible(!modalVisible);
                        }}>
                        <View style={style.modalCentered}>
                            <View style={style.modal}>
                                <Text style={style.filterHeader}>Filters</Text>
                                <FlatList
                                    data={checkedItems}
                                    renderItem={renderFilters}
                                    keyExtractor={(item) => item.label}
                                    numColumns={2}
                                    scrollEnabled={true}
                                />
                                <TouchableHighlight activeOpacity={0.6} underlayColor="#DDDDDD" onPress={handleFilter}>
                                    <Text style={style.filterHeader}>Filter</Text>
                                </TouchableHighlight>
                                <Pressable
                                    style={[style.button, style.buttonClose]}
                                    onPress={() => setModalVisible(!modalVisible)}>
                                    <Text style={style.textStyle}>Hide Modal</Text>
                                </Pressable>
                            </View>
                        </View>
                </Modal>
            </View>
            <View style={style.container}>
                <FlatList
                    data={data}
                    renderItem={renderGridItem}
                    keyExtractor={(item) => item.name}
                    numColumns={2}
                    columnWrapperStyle={style.columnWrapper}
                    contentContainerStyle={style.flatListContent}
                    scrollEnabled={true}
                    onEndReached={handlePagination}
                    onEndReachedThreshold={0.8}
                    ListFooterComponent={
                        loading ? <ActivityIndicator size="large" color="#b3b3b4" /> : null
                    }
                    />
            </View>

        </SafeAreaProvider>
    );
}

export default Home;