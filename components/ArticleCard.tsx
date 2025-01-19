import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from "react-native";
import { Article } from "@/types/article";

type ArticleCardProps = {
  article: Article;
};

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const openInBrowser = async (url: string) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        alert("Unable to open this URL.");
      }
    } catch (error) {
      console.error("Error opening URL:", error);
      alert("An error occurred while trying to open the URL.");
    }
  };

  return (
    <View style={styles.card}>
      <Image source={{ uri: article.urlToImage }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{article.title}</Text>
        <Text style={styles.description} numberOfLines={3}>
          {article.description}
        </Text>
        <Text style={styles.author}>By: {article.author || "Unknown"}</Text>
        <TouchableOpacity
          onPress={() => openInBrowser(article.url)}
          style={styles.readMoreButton}
        >
          <Text style={styles.readMoreText}>Read More</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5, // For Android shadow
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  content: {
    padding: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  author: {
    fontSize: 12,
    color: "#999",
    marginBottom: 15,
  },
  readMoreButton: {
    alignSelf: "flex-start",
    backgroundColor: "#6200EE",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  readMoreText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default ArticleCard;
