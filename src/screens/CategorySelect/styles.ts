import styled from "styled-components/native"; // Import styled from styled-components/native
import { FontAwesome } from "@expo/vector-icons"; // Import FontAwesome from @expo/vector-icons
import { RFValue } from "react-native-responsive-fontsize"; // Import RFValue from react-native-responsive-fontsize
import { GestureHandlerRootView } from "react-native-gesture-handler"; // Import GestureHandlerRootView from react-native-gesture-handler

interface CategoryProps {
    isActive: boolean;
}

export const Container = styled(GestureHandlerRootView)`
    background-color: ${({ theme }) => theme.colors.background};
    flex: 1;
`;

export const Header = styled.View`
    background-color: ${({ theme }) => theme.colors.primary};
    width: 100%;
    height: ${RFValue(113)}px;
    align-items: center;
    justify-content: flex-end;
    padding-bottom: 19px;
    font-size: ${RFValue(18)}px;
`;

export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    color: ${({ theme }) => theme.colors.shape};
    font-size: ${RFValue(18)}px;
`;

export const Category = styled.TouchableOpacity<CategoryProps>`
    width: 100%;
    padding: ${RFValue(15)}px;
    flex-direction: row;
    align-items: center;

    background-color: ${({ isActive, theme }) =>
        isActive ? theme.colors.secondary_light : theme.colors.background
    };
`;

export const Icon = styled(FontAwesome)`
    font-size: ${RFValue(20)}px;
    margin-right: 16px;
`;

export const Name = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;
`;

export const Separator = styled.View`
    background-color: ${({ theme }) => theme.colors.text};
    height: 1px;
    width: 100%;
    opacity: 0.2;
`;

export const Footer = styled.View`
    width: 100%;
    padding: 24px;
`;