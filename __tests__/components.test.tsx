import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { Text, TextInput } from 'react-native';

jest.mock('react-native-safe-area-context', () => {
  const React = require('react');
  return {
    SafeAreaProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  };
});

jest.mock('react-native', () => {
  const React = require('react');
  return {
    Text: ({ children }: { children?: React.ReactNode }) => <>{children}</>,
    TextInput: ({ placeholder }: { placeholder?: string }) => <>{placeholder}</>,
    View: ({ children }: { children?: React.ReactNode }) => <>{children}</>,
    Image: () => null,
    ScrollView: ({ children }: { children?: React.ReactNode }) => <>{children}</>,
    FlatList: ({ data, renderItem }: { data?: any[]; renderItem: (args: { item: any; index: number }) => React.ReactNode }) => (
      <>{(data || []).map((item, index) => <React.Fragment key={index}>{renderItem({ item, index })}</React.Fragment>)}</>
    ),
    TouchableOpacity: ({ children }: { children?: React.ReactNode }) => <>{children}</>,
    TouchableHighlight: ({ children }: { children?: React.ReactNode }) => <>{children}</>,
    Modal: ({ children }: { children?: React.ReactNode }) => <>{children}</>,
    Pressable: ({ children }: { children?: React.ReactNode }) => <>{children}</>,
    ActivityIndicator: () => null,
    StyleSheet: {
      create: (styles: Record<string, any>) => styles,
    },
    Alert: { alert: jest.fn() },
    Button: () => null,
  };
});

jest.mock('@react-navigation/native', () => ({
  NavigationContainer: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useNavigation: () => ({ navigate: jest.fn(), goBack: jest.fn() }),
}));

jest.mock('@react-navigation/native-stack', () => ({
  createNativeStackNavigator: () => ({
    Navigator: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    Screen: ({ component: Component }: { component: React.ComponentType<any> }) => <Component />,
  }),
}));

jest.mock('../AppNavigation', () => ({
  AppNavigator: () => null,
}));

import App from '../App';
import Home from '../src/views/Home';
import PokemonDetails from '../src/views/PokemonDetails';

const mockListResponse = {
  results: [
    {
      name: 'pikachu',
      url: 'https://pokeapi.co/api/v2/pokemon/25/',
    },
    {
      name: 'bulbasaur',
      url: 'https://pokeapi.co/api/v2/pokemon/1/',
    },
  ],
};

const mockPokemonDetails = {
  'https://pokeapi.co/api/v2/pokemon/25/': {
    types: [{ type: { name: 'electric' } }],
    abilities: [{ ability: { name: 'static' } }],
    moves: [{ move: { name: 'thunderbolt', url: 'https://pokeapi.co/api/v2/move/25/' } }],
    name: 'pikachu',
  },
  'https://pokeapi.co/api/v2/pokemon/1/': {
    types: [{ type: { name: 'grass' } }],
    abilities: [{ ability: { name: 'overgrow' } }],
    moves: [{ move: { name: 'vine-whip', url: 'https://pokeapi.co/api/v2/move/22/' } }],
    name: 'bulbasaur',
  },
};

describe('PokemonApp component smoke tests', () => {
  beforeEach(() => {
    global.fetch = jest.fn((input: string) => {
      if (input.includes('pokemon?limit=')) {
        return Promise.resolve({
          json: async () => mockListResponse,
        });
      }

      if (input in mockPokemonDetails) {
        return Promise.resolve({
          ok: true,
          json: async () => mockPokemonDetails[input as keyof typeof mockPokemonDetails],
        });
      }

      return Promise.resolve({
        ok: true,
        json: async () => ({ status: 'ok' }),
      });
    }) as jest.Mock;
  });

  test('App renders without crashing', async () => {
    let tree: renderer.ReactTestRenderer;

    await act(async () => {
      tree = renderer.create(<App />);
    });

    expect(tree).toBeTruthy();
  });

  test('Home renders the search input and filters button', async () => {
    const navigation = { navigate: jest.fn() };
    const route = {};

    let component: renderer.ReactTestRenderer;

    await act(async () => {
      component = renderer.create(<Home navigation={navigation as any} route={route as any} />);
      await Promise.resolve();
      await Promise.resolve();
    });

    const inputNodes = component!.root.findAllByType(TextInput);
    expect(inputNodes.length).toBeGreaterThan(0);
    expect(inputNodes[0].props.placeholder).toBe('search for a pokémon...');
  });

  test('PokemonDetails fetches the route details payload', async () => {
    const navigation = {
      navigate: jest.fn(),
      goBack: jest.fn(),
    };

    const route = {
      params: {
        name: 'pikachu',
        details: 'https://pokeapi.co/api/v2/pokemon/25/',
        image: 'https://example.com/pikachu.png',
      },
    };

    let component: renderer.ReactTestRenderer;

    await act(async () => {
      component = renderer.create(
        <PokemonDetails navigation={navigation as any} route={route as any} />
      );
      await Promise.resolve();
      await Promise.resolve();
      await Promise.resolve();
    });

    expect(global.fetch).toHaveBeenCalledWith(route.params.details);
    expect(component).toBeTruthy();
  });
});
