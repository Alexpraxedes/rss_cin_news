import React from "react"; // Importing React
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"; // Importing the createBottomTabNavigator function from @react-navigation/bottom-tabs
import { MaterialCommunityIcons } from "@expo/vector-icons"; // Importing the MaterialCommunityIcons component from @expo/vector-icons
import { FeedNewsDetails } from "../screens/FeedNewsDetails"; // Importing the FeedNewsDetails component
import { useTheme } from "styled-components"; // Importing the useTheme hook from styled-components
import { FeedNewsCreate } from "../screens/FeedNewsCreate"; // Importing the Register component
import { FeedNewsEdit } from "../screens/FeedNewsEdit"; // Importing the FeedNewsEdit component
import { FeedDetails } from "../screens/FeedDetails"; // Importing the FeedDetails component
import { FeedCreate } from "../screens/FeedCreate"; // Importing the Register component
import { FeedEdit } from "../screens/FeedEdit"; // Importing the FeedEdit component
import { Platform } from "react-native"; // Importing Platform from react-native
import { Feed } from "../screens/Feed"; // Importing the Dashboard component
const { Navigator, Screen } = createBottomTabNavigator();

interface ScreenOptions {
    tabBarIcon: ({ size, color }: { size: number, color: string }) => React.ReactNode;
}
  
export function AppRoutes() {
    const theme = useTheme();

    return (
        <Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: theme.colors.secondary,
                tabBarInactiveTintColor: theme.colors.text,
                tabBarLabelPosition: 'beside-icon',
                tabBarStyle: {
                    paddingVertical: Platform.OS === 'ios' ? 20 : 0,
                    height: 88
                }
            }}
        >
            <Screen
                name="Feed"
                component={Feed}
                options={{
                    tabBarIcon: ({ size, color }) => (
                    <MaterialCommunityIcons
                        name="rss"
                        size={size}
                        color={color}
                    />
                    )
                }}
            />
            <Screen
                name="Nova notícia"
                component={FeedNewsCreate}
                options={{
                    tabBarIcon: ({ size, color }) => (
                    <MaterialCommunityIcons
                        name="newspaper"
                        size={size}
                        color={color}
                    />
                    ),
                }}
            />
            <Screen
                name="Novo portal"
                component={FeedCreate}
                options={{
                    tabBarIcon: ({ size, color }) => (
                    <MaterialCommunityIcons
                        name="newspaper-variant-multiple"
                        size={size}
                        color={color}
                    />
                    ),
                }}
            />

            <Screen
                name="FeedNewsDetails"
                component={FeedNewsDetails}
                options={{
                    tabBarItemStyle: {
                        display: 'none'
                    }
                }}
            />
            <Screen
                name="FeedNewsEdit"
                component={FeedNewsEdit}
                options={{
                    tabBarItemStyle: {
                        display: 'none'
                    }
                }}
            />

            <Screen
                name="FeedDetails"
                component={FeedDetails}
                options={{
                    tabBarItemStyle: {
                        display: 'none'
                    }
                }}
            />
            <Screen
                name="FeedEdit"
                component={FeedEdit}
                options={{
                    tabBarItemStyle: {
                        display: 'none'
                    }
                }}
            />
        </Navigator>
    );
}
