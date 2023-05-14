import styled from "styled-components/native"; // Import styled from styled-components/native
import { RFValue } from "react-native-responsive-fontsize"; // Import RFPercentage from react-native-responsive-fontsize
import { FontAwesome } from "@expo/vector-icons"; // Importing the FontAwesome icon pack from expo/vector-icons
import { FlatList } from "react-native"; // Import FlatList from react-native
import { getBottomSpace } from "react-native-iphone-x-helper"; // Import getStatusBarHeight from react-native-iphone-x-helper

interface ContainerProps {
    color: string;
}

export const Container = styled.View`
    background-color: ${({ theme }) => theme.colors.background};
    position: relative;
    flex: 1;
`;

export const Content = styled.ScrollView.attrs({
    showsVerticalScrollIndicator: false,
    contentContainerStyle: {
        paddingBottom: getBottomSpace()
    }
})`
    padding: 10px 20px;
`;

export const Image = styled.Image`
    height: ${RFValue(160)}px;
    margin-bottom: 5px;
    border-radius: 5px;
    width: 100%;
`;

export const InfoContainer = styled.View`
    justify-content: space-between;
    flex-direction: row;
    margin-bottom: 25px;
    align-items: center;
`;

export const Category = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const TextCategory = styled.Text<ContainerProps>`
    font-family: ${({ theme }) => theme.fonts.medium};
    color: ${({ color }) => color};
    font-size: ${RFValue(12)}px;
`;

export const Icon = styled(FontAwesome)<ContainerProps>`
    color: ${({ color }) => color};
    font-size: ${RFValue(18)}px;
    margin-right: 10px;
`;

export const Text = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    color: ${({ theme }) => theme.colors.text_dark};
    text-align: justify;
    font-size: ${RFValue(12)}px;
`;

export const Date = styled.Text`
    color: ${({ theme }) => theme.colors.text};
    font-size: ${RFValue(12)}px;
`;

export const Actions = styled.View`
    background-color: ${({ theme }) => theme.colors.background};
    justify-content: space-between;
    flex-direction: row;
`;

export const Button = styled.TouchableOpacity`
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    border-color: ${({ theme }) => theme.colors.text};
    width: ${RFValue(22)}px;
    height: ${RFValue(22)}px;
    justify-content: center;
    margin-left: 5px;
    align-items: center;
    border-radius: 50%;
    border-width: 1px;
    padding: 5px;
`;

export const IconActions = styled(FontAwesome)<ContainerProps>`
color: ${({ theme }) => theme.colors.text};
    font-size: ${RFValue(12)}px;
`;

export const LoadContainer = styled.View `
    justify-content: center;
    margin-top: 100px;
    align-items: center;
    flex: 1;
`;

export const NewsCards = styled(
    FlatList as new () => FlatList<any>
).attrs({
    showsVerticalScrollIndicator: false,
    contentContainerStyle: {
        paddingBottom: getBottomSpace()
    }
})`
    margin-top: 20px;
`;