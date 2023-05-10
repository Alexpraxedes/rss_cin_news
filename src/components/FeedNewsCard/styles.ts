import styled from "styled-components/native"; // Import styled from styled-components/native
import { RFValue } from "react-native-responsive-fontsize"; // Import RFPercentage from react-native-responsive-fontsize
import { FontAwesome } from "@expo/vector-icons"; // Importing the FontAwesome icon pack from expo/vector-icons
import { TouchableOpacity } from "react-native"; // Import TouchableOpacity from react-native

interface ContainerProps {
    color: string;
}

export const Container = styled(TouchableOpacity)<ContainerProps>`
    background-color: ${({ theme }) => theme.colors.shape};
    border-left-color: ${({ color }) => color};
    border-left-width: 5px;
    border-radius: 5px;
    border-radius: 5px;
    padding: 10px 10px 10px 14px;
    margin-bottom: 16px;
`;

export const Header = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const Title = styled.Text<ContainerProps>`
    font-family: ${({ theme }) => theme.fonts.medium};
    color: ${({ color }) => color};
    font-size: ${RFValue(14)}px;
`;

export const Category = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const Icon = styled(FontAwesome)<ContainerProps>`
    color: ${({ color }) => color};
    margin-right: 5px;
    font-size: ${RFValue(20)}px;
`;

export const Footer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-top: 15px;
`;

export const TextAbstract = styled.Text`
font-family: ${({ theme }) => theme.fonts.regular};
    color: ${({ theme }) => theme.colors.text};
    font-size: ${RFValue(12)}px;
    height: ${RFValue(40)}px;
    width: 70%;
`;

export const Date = styled.Text`
    color: ${({ theme }) => theme.colors.text};
    font-size: ${RFValue(12)}px;
    width: 20%;
`;