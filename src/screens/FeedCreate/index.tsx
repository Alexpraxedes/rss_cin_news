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
import { InputTextarea } from "../../components/Form/InputTextarea"; // Importing the Input component
import { Button } from "../../components/Form/Button"; // Importing the Button componentTransactionTypeButton component
import { CategorySelectButton } from "../../components/Form/CategorySelectButton"; // Importing the CategorySelect component
import { CategorySelect } from '../CategorySelect'; // Importing the CategorySelect component
import { ScreenHeader } from "../../components/ScreenHeader";

const schema = Yup.object().shape({
    title: Yup.string().required('Título é obrigatório'),
    urlFeed: Yup.string().required('Link do feed é obrigatório'),
    description: Yup.string().required('Descrição é obrigatório'),
    image: Yup.string()
});

export function FeedCreate() {
    const dataKey = '@rss_cin_news:feed';
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

    function handleOpenSelectCategoryModal() {
        setCategoryModalOpen(true);
    };

    function handleCloseSelectCategoryModal() {
        setCategoryModalOpen(false);
    };

    async function handleRegister(form: any) {
        if (category.key === 'category')
            return Alert.alert('Selecione a categoria');

        const newFeed = {
            id: String(uuid.v4()),
            title: form.title,
            image: form.image,
            urlFeed: form.urlFeed,
            description: form.description,
            category: category.key,
            date: new Date()
        };
        
        try {
            const dataStorage = await AsyncStorage.getItem(dataKey);
            const currentData = dataStorage ? JSON.parse(dataStorage) : [];
            const dataFormatted = [
                ...currentData,
                newFeed
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
                <ScreenHeader title="Nova portal de notícias" />

                <Form>
                    <Fields>
                        <InputForm 
                            name="title"
                            control={control}
                            placeholder="Nome do portal" 
                            autoCapitalize="sentences"
                            autoCorrect={false}
                            error={errors.title && errors.title.message as string}
                        />
                        <InputForm 
                            name="urlFeed"
                            control={control}
                            placeholder="Link do feed do portal" 
                            autoCorrect={false}
                            error={errors.urlFeed && errors.urlFeed.message as string}
                        />
                        <InputForm 
                            name="image"
                            control={control}
                            placeholder="Link da imagem" 
                            autoCapitalize="sentences"
                            autoCorrect={false}
                            error={errors.image && errors.image.message as string}
                        />
                        <InputTextarea 
                            name="description"
                            control={control}
                            placeholder="Descrição" 
                            autoCapitalize="sentences"
                            autoCorrect={false}
                            error={errors.description && errors.description.message as string}
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
