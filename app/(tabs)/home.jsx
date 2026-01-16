import { Ionicons } from "@expo/vector-icons";
import { useRouter, useFocusEffect } from "expo-router";
import React, { useState, useCallback } from "react";
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image
} from "react-native";
import { useProjectStore } from "../../store/projectStore";

// Projects data
const ALL_PROPERTIES = [
  {
    "_id": "693dba0e771d5d3f31d003e7",
    "agentId": "693d7061d1a4eaebe4befd6d",
    "projectName": "The Weave",
    "developer": "Al Ghurair",
    "location": "JVC",
    "type": "Apartment",
    "bedrooms": 1,
    "status": "Off-Plan",
    "currency": "AED",
    "price": 1225000,
    "areaSqFt": 776,
    "areaSqM": 72.09,
    "dldPercent": 4,
    "serviceChargePerSqFt": 11,
    "isLiked": false,
    "isSold": true,
    "isDeleted": false,
  },
  {
    "_id": "693dba0e771d5d3f31d003e9",
    "agentId": "693d7061d1a4eaebe4befd6d",
    "projectName": "Dubai Islands",
    "developer": "Emaar, Ellington Properties",
    "type": "Apartment",
    "bedrooms": 3,
    "status": "Off-Plan",
    "currency": "AED",
    "price": 2950000,
    "areaSqFt": 1850,
    "areaSqM": 171.87,
    "dldPercent": 4,
    "serviceChargePerSqFt": 15,
    "isLiked": true,
    "isSold": false,
    "isDeleted": false,
  }
];

const COLORS = {
  bg: "#181A20",
  cardBg: "#1C1C1E",
  primary: "#DFFF4F",
  textWhite: "#FFFFFF",
  textGrey: "#8E8E93",
  border: "#2C2C2E",
};

export default function HomeScreen() {
  const router = useRouter();
  const { projects } = useProjectStore();

  // Combine default projects with user-created projects
  const allProjects = [...ALL_PROPERTIES, ...projects];

  // State for filtering and search
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [sortOption, setSortOption] = useState("Most recent");
  const [favStates, setFavStates] = useState(allProjects.map((p) => p.isLiked || false));

  // Refresh when projects change
  useFocusEffect(
    useCallback(() => {
      setFavStates(allProjects.map((p) => p.isLiked || false));
    }, [projects])
  );

  // Function to get greeting based on time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      return "Good Morning";
    } else if (hour >= 12 && hour < 17) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };

  const toggleFav = (index) => {
    const updated = [...favStates];
    updated[index] = !updated[index];
    setFavStates(updated);
  };

  // Filter Logic: Changes data based on button click and search
  const getFilteredData = () => {
    let filtered = [...allProjects];

    // Apply filter
    if (activeFilter === "Sold projects") {
      filtered = filtered.filter((item) => item.isSold === true);
    } else if (activeFilter === "Favourites") {
      // Show only favorited projects
      filtered = filtered.filter((item, index) => {
        const originalIndex = allProjects.findIndex(p => p.projectName === item.projectName);
        return favStates[originalIndex];
      });
    }

    // Apply search
    if (searchQuery.trim() !== "") {
      filtered = filtered.filter((item) =>
        item.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.developer.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply sorting
    if (sortOption === "A to Z") {
      filtered.sort((a, b) => a.projectName.localeCompare(b.projectName));
    } else if (sortOption === "Z to A") {
      filtered.sort((a, b) => b.projectName.localeCompare(a.projectName));
    } else if (sortOption === "Price (Low to high)") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === "Price (High to low)") {
      filtered.sort((a, b) => b.price - a.price);
    }
    // "Most recent" keeps original order

    return filtered;
  };

  const displayedData = getFilteredData();

  const renderItem = ({ item }) => {
    // Find the original index in allProjects
    const originalIndex = allProjects.findIndex(p => p.projectName === item.projectName);
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.propertyRow}
        onPress={() => {
          router.push({
            pathname: "/dashboard",
            params: { projectName: item.projectName, projectId: item._id }
          });
        }}
      >
        {/* Left: Heart Icon */}
        <TouchableOpacity onPress={() => toggleFav(originalIndex)} style={styles.heartContainer}>
          <Ionicons
            name={favStates[originalIndex] ? "heart" : "heart-outline"}
            size={20}
            color={favStates[originalIndex] ? "#E74C3C" : COLORS.textWhite}
          />
        </TouchableOpacity>

        {/* Middle: Text Info */}
        <View style={styles.textContainer}>
          <Text style={styles.propertyName}>{item.projectName}</Text>
          <Text style={styles.propertyBuilder}>{item.developer}</Text>
        </View>

        {/* Right: Arrow */}
        <Image
          source={require("../../assets/images/svg/Arrow 1.png")}
          style={{ width: 18, height: 18 }}
          resizeMode="contain"
        />
      </TouchableOpacity>
    );
  };

  // Helper for Filter Chips
  const FilterChip = ({ label }) => {
    const isActive = activeFilter === label;
    const handlePress = () => {
      if (label === "Sort By") {
        setShowSortMenu(!showSortMenu);
      } else {
        setActiveFilter(label);
        setShowSortMenu(false);
      }
    };

    return (
      <TouchableOpacity
        style={[
          styles.filterChip,
          isActive ? styles.filterChipActive : styles.filterChipInactive,
        ]}
        onPress={handlePress}
      >
        <Text
          style={[
            styles.filterText,
            isActive ? styles.filterTextActive : styles.filterTextInactive,
          ]}
        >
          {label}
        </Text>
        {label === "Sort By" && (
          <Ionicons
            name={showSortMenu ? "chevron-up" : "chevron-down"}
            size={12}
            color={isActive ? "#000" : "#fff"}
            style={{ marginLeft: 4 }}
          />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.bg} />
      <View style={styles.contentContainer}>
        {/* HEADER */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.greetingSmall}>Hello Arpit,</Text>
            <Text style={styles.greetingLarge}>{getGreeting()}</Text>
          </View>
          <TouchableOpacity style={styles.notificationWrapper}>
            <Ionicons name="notifications-outline" size={24} color="#fff" />
            <View style={styles.notificationDot} />
          </TouchableOpacity>
        </View>

        {/* SEARCH BAR */}
        <View style={styles.searchBar}>
          <Image
            source={require("../../assets/images/svg/search png.png")}
            style={{ width: 20, height: 20, marginRight: 10 }}
            resizeMode="contain"
          />
          <TextInput
            placeholder="Search projects"
            placeholderTextColor="#666"
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons name="close-circle" size={20} color="#666" />
            </TouchableOpacity>
          )}
        </View>

        {/* HORIZONTAL FILTERS */}
        <View style={{ height: 50, zIndex: 10 }}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterScroll}
          >
            <FilterChip label="All" />
            <FilterChip label="Sold projects" />
            <FilterChip label="Sort By" />
            <FilterChip label="Favourites" />
          </ScrollView>
        </View>

        {/* SORT BY DROPDOWN MENU */}
        {showSortMenu && (
          <View style={styles.sortMenuContainer}>
            <TouchableOpacity
              style={styles.sortMenuItem}
              onPress={() => {
                setSortOption("Most recent");
                setShowSortMenu(false);
              }}
            >
              <Text style={styles.sortMenuText}>Most recent</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.sortMenuItem}
              onPress={() => {
                setSortOption("A to Z");
                setShowSortMenu(false);
              }}
            >
              <Text style={styles.sortMenuText}>A to Z</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.sortMenuItem}
              onPress={() => {
                setSortOption("Z to A");
                setShowSortMenu(false);
              }}
            >
              <Text style={styles.sortMenuText}>Z to A</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.sortMenuItem}
              onPress={() => {
                setSortOption("Price (Low to high)");
                setShowSortMenu(false);
              }}
            >
              <Text style={styles.sortMenuText}>Price</Text>
              <Text style={styles.sortMenuSubtext}>(Low to high)</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.sortMenuItem}
              onPress={() => {
                setSortOption("Price (High to low)");
                setShowSortMenu(false);
              }}
            >
              <Text style={styles.sortMenuText}>Price</Text>
              <Text style={styles.sortMenuSubtext}>(High to low)</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* SECTION TITLE */}
        <Text style={styles.sectionTitle}>
          {activeFilter === "Sold projects" ? "Sold projects" :
            activeFilter === "Favourites" ? "Favourites" : "All projects"}
        </Text>

        {/* LIST */}
        {displayedData.length > 0 ? (
          <FlatList
            data={displayedData}
            keyExtractor={(item) => item.projectName}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 100 }}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="search-outline" size={64} color="#333" />
            <Text style={styles.emptyTitle}>No projects found</Text>
            <Text style={styles.emptySubtitle}>
              {searchQuery ? `No results for "${searchQuery}"` : "Try adjusting your filters"}
            </Text>
          </View>
        )}
      </View>

      {/* BOTTOM TAB BAR */}
      <View style={styles.tabBar}>
        <TouchableOpacity>
          <Image
            source={require("../../assets/images/png/Home_fill.png")}
            style={{ width: 26, height: 26 }}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="heart-outline" size={26} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.centerButton} onPress={() => router.push("/form1")}>
          <Image
            source={require("../../assets/images/svg/add proj png.png")}
            style={{ width: 56, height: 56 }}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="document-text-outline" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/Profile")}>
          <Ionicons name="person-circle-outline" size={28} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  // Header
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginTop: 10,
    marginBottom: 20,
  },
  greetingSmall: {
    color: '#D1D1D1',
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    marginBottom: 4
  },
  greetingLarge: {
    color: "#fff",
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: "700"
  },
  notificationWrapper: {
    position: "relative",
    padding: 4
  },
  notificationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
    position: "absolute",
    top: 4,
    right: 4,
  },
  // Search
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.cardBg,
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 44,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#333",
  },
  searchInput: {
    flex: 1,
    color: "#F5F5F5",
    fontSize: 14,
    fontFamily: 'Nunito-Regular',
    fontWeight: '500'
  },
  // Filters
  filterScroll: {
    alignItems: 'center',
    paddingRight: 20
  },
  filterChip: {
    height: 28,
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 10,
    marginRight: 12,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterChipActive: {
    backgroundColor: "#D9D9D9",
    borderColor: "#F5F5F5",
  },
  filterChipInactive: {
    backgroundColor: "#262A34",
    borderColor: "#F5F5F5",
  },
  filterText: {
    fontSize: 14,
    fontFamily: 'Inter-Light',
    fontWeight: "300",
    textAlign: 'center'
  },
  filterTextActive: { color: "#000" },
  filterTextInactive: { color: "#FFF" },
  // Sort Menu
  sortMenuContainer: {
    position: 'absolute',
    top: 240,
    right: 20,
    backgroundColor: '#262A34',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#3A3F4B',
    paddingVertical: 8,
    minWidth: 160,
    zIndex: 1000,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  sortMenuItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  sortMenuText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  sortMenuSubtext: {
    color: '#999',
    fontSize: 12,
    marginTop: 2,
  },
  // List Headers & Items
  sectionTitle: {
    color: "#fff",
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
    fontWeight: "500",
    marginTop: 10,
    marginBottom: 13,
  },
  propertyRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  heartContainer: {
    marginRight: 15
  },
  textContainer: {
    flex: 1
  },
  propertyName: {
    color: "#fff",
    fontSize: 16,
    fontFamily: 'Inter-Light',
    fontWeight: "300",
    marginBottom: 4
  },
  propertyBuilder: {
    color: "#666",
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    fontWeight: "500"
  },
  separator: {
    height: 1,
    backgroundColor: "#FFFFFF"
  },
  // Empty State
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100,
  },
  emptyTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    color: '#666',
    fontSize: 14,
    textAlign: 'center',
  },
  // Bottom Navigation
  tabBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 75,
    backgroundColor: "#27292D",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  centerButton: {
    width: 56,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
  },
});
