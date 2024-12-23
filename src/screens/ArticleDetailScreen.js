import React from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  Image,
  Dimensions 
} from 'react-native';

const ArticleDetailScreen = ({ route }) => {
  const { article } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image
        source={article.image}
        style={styles.image}
        resizeMode="cover"
      />
      
      <View style={styles.content}>
        <Text style={styles.title}>{article.title}</Text>
        
        <View style={styles.metadata}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{article.category}</Text>
          </View>
          <Text style={styles.date}>{article.timestamp}</Text>
        </View>

        <Text style={styles.summary}>{article.summary}</Text>
        
        <Text style={styles.bodyText}>{article.content}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    width: Dimensions.get('window').width,
    height: 200,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E88E5',
    marginBottom: 10,
  },
  metadata: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  categoryBadge: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
  },
  categoryText: {
    color: '#1E88E5',
    fontSize: 14,
  },
  date: {
    color: '#666',
    fontSize: 14,
  },
  summary: {
    fontSize: 16,
    color: '#333',
    fontStyle: 'italic',
    marginBottom: 20,
    lineHeight: 24,
  },
  bodyText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
});

export default ArticleDetailScreen;