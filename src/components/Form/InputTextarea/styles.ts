import styled from "styled-components/native"; // Import styled from styled-components/native
import { TextInput } from "react-native"; // Import TextInput from react-native
import { RFValue } from "react-native-responsive-fontsize"; // Import RFValue from react-native-responsive-fontsize

export const Container = styled.View`
    width: 100%;
`;

export const Input = styled(TextInput).attrs({
    placeholderTextColor: '#969CB2',
    textAlignVertical: 'top',
    multiline: true
})`
    background-color: ${({ theme }) => theme.colors.shape};
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;
    height: ${RFValue(150)}px;
    border-radius: 5px;
    margin-bottom: 8px;
    padding: 10px;
    width: 100%;
`;

export const Error = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    color: ${({ theme }) => theme.colors.attention};
    font-size: ${RFValue(12)}px;
    margin-bottom: 12px;
`;