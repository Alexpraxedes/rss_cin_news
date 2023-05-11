import React, { useContext, useState, useEffect } from "react"; // Importing React, useEffect and useState
import { 
    Modal, 
    TouchableWithoutFeedback, 
    Keyboard,
    Alert
} from "react-native"; // Importing Modal from react-native
import AsyncStorage from "@react-native-async-storage/async-storage"; // Importing AsyncStorage from @react-native-async-storage/async-storage
import { useNavigation } from "@react-navigation/native"; // Importing useNavigation from @react-navigation/native
import { yupResolver } from "@hookform/resolvers/yup"; // Importing yupResolver from @hookform/resolvers/yup
import { useForm } from "react-hook-form"; // Importing useForm and UseFormReturn from react-hook-form
import { categories } from "../../utils/categories"; // Importing the categories object
import * as Yup from "yup"; // Importing Yup

import { 
    Container,
    Form, 
    Fields
} from "./styles"; // Importing the styled components
import { CategorySelectButton } from "../../components/Form/CategorySelectButton"; // Importing the CategorySelect component
import { Button } from "../../components/Form/Button"; // Importing the Button componentTransactionTypeButton component
import { InputAbstractarea } from "../../components/Form/InputAbstractarea"; // Importing the Input component
import { InputTextarea } from "../../components/Form/InputTextarea"; // Importing the Input component
import { ScreenHeader } from "../../components/ScreenHeader"; // Importing the ScreenHeader component
import { InputForm } from "../../components/Form/InputForm"; // Importing the Input component
import { CategorySelect } from '../CategorySelect'; // Importing the CategorySelect component
import { NewsContext } from "../../context/NewsContext"; // Importing the NewsContext

const schema = Yup.object().shape({
    title: Yup.string().required('Título é obrigatório'),
    image: Yup.string(),
    abstract: Yup.string().required('Resumo é obrigatório'),
    text: Yup.string().required('Texto é obrigatório')
});

export function FeedNewsEdit() {
    const dataKey = '@rss_cin_news:news';
    const { navigate } = useNavigation();

    const [categoryModalOpen, setCategoryModalOpen] = useState(false);
    const {selectedNews} = useContext(NewsContext);
    const newFeed = selectedNews;

    const [newFeedCategory] = categories.filter(
        item => item.key === newFeed?.category
    );

    const [category, setCategory] = useState({
        key: newFeedCategory.key,
        name: newFeedCategory.name
    });

    const { 
        control, 
        setValue,
        handleSubmit, 
        reset,
        formState: { errors } 
    } = useForm({ 
        resolver: yupResolver(schema)
    });

    function SetValuesNews(){
        setValue('title', newFeed?.title);
        setValue('image', newFeed?.image);
        setValue('abstract', newFeed?.abstract);
        setValue('text', newFeed?.text);
    };

    function handleOpenSelectCategoryModal() {
        setCategoryModalOpen(true);
    };

    function handleCloseSelectCategoryModal() {
        setCategoryModalOpen(false);
    };

    async function handleEdit(form: any) {
        if (category.key === 'category')
            return Alert.alert('Selecione a categoria');

        const newFeedNews = {
            id: newFeed?.id,
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
            currentData.map((item: any) => {
                if (item.id === newFeedNews.id) {
                    item.title = newFeedNews.title;
                    item.abstract = newFeedNews.abstract;
                    item.text = newFeedNews.text;
                    item.category = newFeedNews.category;
                    item.date = newFeedNews.date;
                }
            });
            const dataFormatted = [
                ...currentData
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

    useEffect(() => {
        SetValuesNews();
    }, []);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container>
                <ScreenHeader title="Editar notícia" />

                <Form>
                    <Fields>
                        <InputForm
                            name="title"
                            control={control}
                            autoCapitalize="sentences"
                            autoCorrect={false}
                            error={errors.title && errors.title.message as string}
                        />
                        <InputForm
                            name="image"
                            control={control}
                            autoCapitalize="sentences"
                            autoCorrect={false}
                            error={errors.image && errors.image.message as string}
                        />
                        <InputAbstractarea 
                            name="abstract"
                            control={control}
                            autoCapitalize="sentences"
                            autoCorrect={false}
                            error={errors.abstract && errors.abstract.message as string} textAlignVertical={undefined}                        
                        />
                        <InputTextarea
                            name="text"
                            control={control}
                            autoCapitalize="sentences"
                            autoCorrect={false}
                            error={errors.text && errors.text.message as string} textAlignVertical={undefined}                        
                        />

                        <CategorySelectButton 
                            title={category.name} 
                            onPress={handleOpenSelectCategoryModal}
                        />
                    </Fields>

                    <Button 
                        title="Salvar" 
                        onPress={handleSubmit(handleEdit)}
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
