import React from "react";
import { 
    Container,
    Header,
    Title,
    Category,
    Icon,
    Name,
    Separator,
    Footer
} from "./styles";
import { Button } from "../../components/Form/Button";
import { categories } from "../../utils/categories";
import { FlatList } from "react-native";

interface Category {
    key: string;
    name: string;
}

interface CategorySelectProps {
    category: Category;
    setCategory: (category: Category) => void;
    closeSelectCategory: () => void;
}

/**
 * Renders a category select component.
 *
 * @param {Object} props - The component props.
 * @param {Category} props.category - The currently selected category.
 * @param {function} props.setCategory - The function to set the selected category.
 * @param {function} props.closeSelectCategory - The function to close the category select.
 * @return {JSX.Element} - The category select component.
 */
export function CategorySelect({
    category,
    setCategory,
    closeSelectCategory
} : CategorySelectProps) {
    /**
     * Sets the selected category to the given category.
     *
     * @param {Category} category - The category to set as selected.
     */
    function handleCategorySelect(category: Category) {
        setCategory(category);
    }

    return(
        <Container>
            <Header>
                <Title>Categorias</Title>
            </Header>

            <FlatList 
                data={categories}
                style={{ flex: 1, width: '100%' }}
                keyExtractor={(item) => item.key}
                renderItem={({ item }) => (
                    <Category
                        onPress={() => handleCategorySelect(item)}
                        isActive={category.key === item.key}
                    >
                        <Icon name={item.icon} />
                        <Name>{item.name}</Name>
                    </Category>
                )}
                ItemSeparatorComponent={() => <Separator />}
            />

            <Footer>
                <Button 
                    title="Selecionar" 
                    onPress={closeSelectCategory}
                />                   
            </Footer>
        </Container>
    );
};