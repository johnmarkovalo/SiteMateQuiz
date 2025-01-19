import React, { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  ActivityIndicator,
} from "react-native";
import api from "@/api/api";
import endpoints from "@/api/endpoints";

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState([]);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const response = await api.get(endpoints.getArticles, {
        params: {
          q: searchQuery,
          pageSize: 10,
          apiKey: "183daca270264bad86fc5b72972fb82a",
        },
      });
      const data = await response.data;
      if (data.status === "ok") {
        setArticles(data.articles);
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      alert("Please enter a search query.");
      return;
    }
    fetchArticles();
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search here..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          accessibilityLabel="Search input"
        />
        <TouchableOpacity
          style={styles.searchButton}
          onPress={handleSearch}
          accessibilityLabel="Search button"
          disabled={loading}
        >
          <Text style={styles.searchButtonText}>
            {loading ? "Searching..." : "Search"}
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.cardscontainer}>
        {loading && <ActivityIndicator size="large" color="#6200EE" />}

        {!loading &&
          articles.map((article, index) => (
            <View key={index} style={styles.card}>
              <Image
                source={{ uri: article.urlToImage }}
                style={styles.image}
              />
              <View style={styles.content}>
                <Text style={styles.title}>{article.title}</Text>
                <Text style={styles.description} numberOfLines={3}>
                  {article.description}
                </Text>
                <Text style={styles.author}>
                  By: {article.author || "Unknown"}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    alert(`Read more at: ${article.url}`);
                  }}
                  style={styles.readMoreButton}
                >
                  <Text style={styles.readMoreText}>Read More</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    // paddingVertical: 20,
    paddingTop: 60,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#ccc",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 3, // For Android shadow
    width: "90%",
    maxWidth: 600, // Prevent search bar from becoming too wide on larger screens
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#333",
  },
  searchButton: {
    backgroundColor: "#6200EE",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
    marginLeft: 10,
  },
  searchButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  cardscontainer: {
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
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
