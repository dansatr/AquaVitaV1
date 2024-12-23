import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { articles } from '../data/Articles';

const ArticlesScreen = () => {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'identification', 'treatment', 'conservation'];

  const filteredArticles = selectedCategory === 'all'
    ? articles.waterQuality
    : articles.waterQuality.filter(article => article.category === selectedCategory);

  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoryContainer}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.selectedCategory
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text style={styles.categoryText}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.articlesContainer}>
        {filteredArticles.map((article) => (
          <TouchableOpacity
            key={article.id}
            style={styles.articleCard}
            onPress={() => navigation.navigate('ArticleDetail', { article })}
          >
            <Text style={styles.articleTitle}>{article.title}</Text>
            <Text style={styles.articleSummary}>{article.summary}</Text>
            <Text style={styles.readMore}>Read More →</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3F2FD',
  },
  categoryContainer: {
    padding: 10,
  },
  categoryButton: {
    backgroundColor: '#1E88E5',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  selectedCategory: {
    backgroundColor: '#1565C0',
  },
  categoryText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  articlesContainer: {
    padding: 10,
  },
  articleCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E88E5',
    marginBottom: 5,
  },
  articleSummary: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  readMore: {
    color: '#1E88E5',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default ArticlesScreen;