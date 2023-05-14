import styled from "styled-components/native"; // Import styled from styled-components/native
import { FontAwesome } from "@expo/vector-icons"; // Importing the FontAwesome icon pack from expo/vector-icons
import { RFValue } from "react-native-responsive-fontsize"; // Import RFPercentage from react-native-responsive-fontsize
import { TouchableOpacity } from "react-native"; // Import TouchableOpacity from react-native

interface ContainerProps {
    color: string;
}

export const Container = styled(TouchableOpacity) `
    background-color: ${({ theme }) => theme.colors.shape};
    width: ${RFValue(300)}px;
    position: relative;
    border-radius: 5px;

    padding: 14px;
    padding-bottom: ${RFValue(42)}px;
    margin-right: 16px;

    &:last-child {
        margin-right: 0;
    }
`;

export const Image = styled.Image `
    background-color: ${({ theme }) => theme.colors.background};
    width: 100%;
    height: ${RFValue(154)}px;
    border-radius: 5px;
`;

export const Icon = styled(FontAwesome)<ContainerProps>`
    position: absolute;
    top: ${RFValue(16)}px;
    left: ${RFValue(16)}px;
    color: ${({ color }) => color};
    text-shadow: 0px 1px 2px rgba(1, 1, 1, 0.5);
    font-size: ${RFValue(16)}px;
    padding: ${RFValue(2)}px;
`;

export const DateContainer = styled.View`
    background-color: ${({ theme }) => theme.colors.background_light};
    border-bottom-right-radius: 5px;
    flex-direction: row;
    position: absolute;
    padding: 5px;
    bottom: 0px;
    right: 0px;
`;

export const Date = styled.Text`
    color: ${({ theme }) => theme.colors.shape};
    font-size: ${RFValue(10)}px;
`;

export const Footer = styled.View`
    justify-content: space-between;
    flex-direction: row;
    position: absolute;
    bottom: ${RFValue(12)}px;
    left: ${RFValue(18)}px;
    width: ${RFValue(270)}px;
`;

export const Title = styled.Text<ContainerProps>`
    font-family: ${({ theme }) => theme.fonts.medium};
    color: ${({ color }) => color};
    text-shadow: 0px 1px 2px rgba(1, 1, 1, 0.5);
    font-size: ${RFValue(14)}px;
`;