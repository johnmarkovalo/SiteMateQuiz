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
import { Article } from "@/types/article";
import ArticleCard from "@/components/ArticleCard";
import SearchBar from "@/components/SearchBar";
import Modal from "react-native-modal";
import ErrorModal from "@/components/ErrorModal";

export default function HomeScreen() {
  const apiKey = "183daca270264bad86fc5b72972fb82a";
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [pageSize, setPageSize] = useState(10);

  // In your state
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const response = await api.get(endpoints.getArticles, {
        params: {
          q: searchQuery,
          pageSize: pageSize,
          apiKey: apiKey,
        },
      });
      const data = await response.data;
      if (data.status === "ok") {
        setArticles(data.articles);
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
      setIsErrorModalVisible(true);
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
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
        loading={loading}
      />
      <ScrollView contentContainerStyle={styles.cardscontainer}>
        {loading && <ActivityIndicator size="large" color="#6200EE" />}

        {!loading &&
          articles.map((article, index) => (
            <ArticleCard key={index} article={article} />
          ))}
      </ScrollView>
      <ErrorModal
        isVisible={isErrorModalVisible}
        onClose={() => setIsErrorModalVisible(false)}
      />
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
  cardscontainer: {
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
});
