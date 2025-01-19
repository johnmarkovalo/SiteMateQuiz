import React from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

type SearchBarProps = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: () => void;
  loading: boolean;
};

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  setSearchQuery,
  handleSearch,
  loading,
}) => {
  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.input}
        placeholder="Search here..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        accessibilityLabel="Search input"
        editable={!loading} // Disable input while searching
      />
      <TouchableOpacity
        style={styles.searchButton}
        onPress={handleSearch}
        accessibilityLabel="Search button"
        disabled={loading}
      >
        <Icon
          name="search"
          size={20}
          color={loading ? "#ccc" : "#fff"} // Change color when disabled
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 2, // For Android shadow
    width: "90%",
    maxWidth: 600,
    paddingHorizontal: 10,
    marginVertical: 15,
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
    padding: 10,
    borderRadius: 25,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SearchBar;
