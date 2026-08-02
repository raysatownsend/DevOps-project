import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack";
import Home from "./src/views/Home";
import PokemonDetails from './src/views/PokemonDetails';
import Mooves from "./src/views/Mooves";

export type RootStackParamList = {
    Home: undefined;
    PokemonDetails: {name: string, details: string, image: string};
    Mooves: {moveDetails: string, moveName: string};
}

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator
             screenOptions={{
                headerShown: true,
             }}   
            >
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="PokemonDetails" component={PokemonDetails} /> 
                <Stack.Screen name="Mooves" component={Mooves} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
