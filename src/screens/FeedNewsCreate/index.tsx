import React, { useState } from "react"; // Importing React and useState
import { 
    Modal, 
    TouchableWithoutFeedback, 
    Keyboard,
    Alert
} from "react-native"; // Importing Modal from react-native
import * as Yup from "yup"; // Importing Yup
import { yupResolver } from "@hookform/resolvers/yup"; // Importing yupResolver from @hookform/resolvers/yup
import { useForm } from "react-hook-form"; // Importing useForm from react-hook-form
import AsyncStorage from "@react-native-async-storage/async-storage"; // Importing AsyncStorage from @react-native-async-storage/async-storage
import uuid from "react-native-uuid"; // Importing uuid from react-native-uuid
import { useNavigation } from "@react-navigation/native"; // Importing useNavigation from @react-navigation/native

import { 
    Container,
    Form, 
    Fields
} from "./styles"; // Importing the styled components
import { InputForm } from "../../components/Form/InputForm"; // Importing the Input component
import { InputAbstractarea } from "../../components/Form/InputAbstractarea"; // Importing the Input component
import { InputTextarea } from "../../components/Form/InputTextarea"; // Importing the Input component
import { Button } from "../../components/Form/Button"; // Importing the Button componentTransactionTypeButton component
import { CategorySelectButton } from "../../components/Form/CategorySelectButton"; // Importing the CategorySelect component
import { CategorySelect } from '../CategorySelect'; // Importing the CategorySelect component
import { ScreenHeader } from "../../components/ScreenHeader";

const schema = Yup.object().shape({
    title: Yup.string().required('Título é obrigatório'),
    image: Yup.string(),
    abstract: Yup.string().required('Resumo é obrigatório'),
    text: Yup.string().required('Texto é obrigatório')
});

/**
 * Creates a new feed news item and saves it to the device's local storage.
 *
 * @return {JSX.Element} The JSX element representing the new feed news item form.
 */
export function FeedNewsCreate() {
    const dataKey = '@rss_cin_news:news';
    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria'
    });
    const { navigate } = useNavigation();
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);
    const { 
        control, 
        handleSubmit, 
        reset,
        formState: { errors } 
    } = useForm(
        { resolver: yupResolver(schema) }
    );

    /**
     * Sets the state of `categoryModalOpen` to `true`.
     */
    function handleOpenSelectCategoryModal() {
        setCategoryModalOpen(true);
    };

    /**
     * Closes the select category modal.
     *
     * @return {void} 
     */
    function handleCloseSelectCategoryModal() {
        setCategoryModalOpen(false);
    };

        /**
     * An async function that handles the registration of a new feed news item.
     *
     * @param {any} form - The form data object.
     * @return {Promise<void>} A Promise that resolves when the registration is complete.
     */
    async function handleRegister(form: any) {
        if (category.key === 'category')
            return Alert.alert('Selecione a categoria');

        const newFeedNews = {
            id: String(uuid.v4()),
            title: form.title,
            image: form.image,
            abstract: form.abstract,
            text: form.text,
            category: category.key,
            date: new Date()
        };
        
        try {
            const dataStorage = await AsyncStorage.getItem(dataKey);
            const currentData = dataStorage ? JSON.parse(dataStorage) : [];
            const dataFormatted = [
                ...currentData,
                newFeedNews
            ];

            await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));

            setCategory({
                key: 'category',
                name: 'Categoria'
            });
            reset();

            navigate('Feed' as never);

        } catch (error) {
            console.log(error);
            Alert.alert('Não foi possível salvar');
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container>
                <ScreenHeader title="Nova notícia" />

                <Form>
                    <Fields>
                        <InputForm 
                            name="title"
                            control={control}
                            placeholder="Título" 
                            autoCapitalize="sentences"
                            autoCorrect={false}
                            error={errors.title && errors.title.message as string}
                        />
                        <InputForm 
                            name="image"
                            control={control}
                            placeholder="Link da imagem" 
                            autoCapitalize="sentences"
                            autoCorrect={false}
                            error={errors.image && errors.image.message as string}
                        />
                        <InputAbstractarea 
                            name="abstract"
                            control={control}
                            placeholder="Resumo" 
                            autoCapitalize="sentences"
                            autoCorrect={false}
                            error={errors.abstract && errors.abstract.message as string}
                        />
                        <InputTextarea
                            name="text"
                            control={control}
                            placeholder="Texto"
                            autoCapitalize="sentences"
                            autoCorrect={false}
                            error={errors.text && errors.text.message as string}
                        />

                        <CategorySelectButton 
                            title={category.name} 
                            onPress={handleOpenSelectCategoryModal}
                        />
                    </Fields>

                    <Button 
                        title="Cadastrar" 
                        onPress={handleSubmit(handleRegister)}
                    />
                </Form>

                <Modal visible={categoryModalOpen}>
                    <CategorySelect 
                        category={category}
                        setCategory={setCategory}
                        closeSelectCategory={handleCloseSelectCategoryModal}
                    />
                </Modal>
            </Container>
        </TouchableWithoutFeedback>
    );
};
