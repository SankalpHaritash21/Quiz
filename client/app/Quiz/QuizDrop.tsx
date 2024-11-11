import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import quizData from "../utils/quizData.json"; // Path to your JSON file
import Collapsible from "react-native-collapsible";

// Types for Quiz
interface QuizOption {
  [key: number]: string;
}

interface Question {
  id: number;
  question: string;
  options: string[];
  answer: string;
}

interface Subcategory {
  subcategory: string;
  questions: Question[];
}

interface Category {
  category: string;
  subcategories: Subcategory[];
}

const QuizApp: React.FC = () => {
  const [selectedOptions, setSelectedOptions] = useState<QuizOption>({});
  const [collapsedSections, setCollapsedSections] = useState<{
    [key: string]: boolean;
  }>({});
  const [loading, setLoading] = useState(false);

  const toggleSection = (key: string) => {
    setCollapsedSections((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const handleOptionSelect = (questionId: number, option: string) => {
    setSelectedOptions((prev) => ({ ...prev, [questionId]: option }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    let score = 0;
    quizData.quizCategories.forEach((category) => {
      category.subcategories.forEach((subcategory) => {
        subcategory.questions.forEach((question) => {
          if (selectedOptions[question.id] === question.answer) {
            score += 1;
          }
        });
      });
    });

    setLoading(false);
    Alert.alert(`Quiz completed! Your score is ${score}`);
  };

  // Using memoization for quiz categories to optimize rendering
  const renderQuizItem = ({ item }: { item: Question }) => {
    return (
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{item.question}</Text>
        {item.options.map((option) => (
          <TouchableOpacity
            key={option}
            onPress={() => handleOptionSelect(item.id, option)}
            style={[
              styles.optionButton,
              selectedOptions[item.id] === option && styles.selectedOption,
            ]}
          >
            <Text>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderSubcategory = (subcategory: Subcategory) => {
    return (
      <View key={subcategory.subcategory} style={styles.subcategoryContainer}>
        <TouchableOpacity
          onPress={() => toggleSection(subcategory.subcategory)}
        >
          <Text style={styles.subcategoryHeader}>
            {subcategory.subcategory}
          </Text>
        </TouchableOpacity>
        <Collapsible collapsed={collapsedSections[subcategory.subcategory]}>
          <FlatList
            data={subcategory.questions}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderQuizItem}
          />
        </Collapsible>
      </View>
    );
  };

  const renderCategory = (category: Category) => {
    return (
      <View key={category.category}>
        <TouchableOpacity onPress={() => toggleSection(category.category)}>
          <Text style={styles.categoryHeader}>{category.category}</Text>
        </TouchableOpacity>
        <Collapsible collapsed={collapsedSections[category.category]}>
          {category.subcategories.map(renderSubcategory)}
        </Collapsible>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quiz App</Text>

      {quizData.quizCategories.map(renderCategory)}

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button
          title="Submit Quiz"
          onPress={handleSubmit}
          disabled={quizData.quizCategories.some((category) =>
            category.subcategories.some((subcategory) =>
              subcategory.questions.some(
                (question) => !selectedOptions[question.id]
              )
            )
          )}
        />
      )}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f5f5f5",
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  categoryHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#2e78b7",
  },
  subcategoryContainer: {
    marginLeft: 10,
  },
  subcategoryHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 5,
    color: "#5a9",
  },
  questionContainer: {
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  questionText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  optionButton: {
    backgroundColor: "white",
    padding: 10,
    marginVertical: 4,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  selectedOption: {
    backgroundColor: "lightblue",
  },
});

export default QuizApp;
