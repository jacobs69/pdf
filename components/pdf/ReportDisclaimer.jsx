import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { height: screenHeight } = Dimensions.get("window");

export default function ReportDisclaimer() {
  return (
    <View style={styles.page}>
      <View style={styles.container}>
        {/* Center Logo */}
        <View style={styles.centerBlock}>
          <Text style={styles.brandText}>LIYANTIS</Text>
        </View>

        {/* Disclaimer */}
        <View style={styles.disclaimerBlock}>
          <View style={styles.disclaimerHeader}>
            <Ionicons name="alert-circle-outline" size={24} color="#F1FE74" />
            <Text style={styles.disclaimerTitle}>Disclaimer</Text>
          </View>
          <Text style={styles.disclaimerText}>
            All investment figures, estimates, and projections presented here are based on data available at the time of preparation and are subject to change due to market conditions, developer revisions, or agent assessment. Liyantis shall not be held responsible for any financial decisions made solely based on this report.
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    minHeight: Dimensions.get("window").height,
    backgroundColor: "#0F1115",
  },
  container: {
    flex: 1,
    backgroundColor: "#0F1115",
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  centerBlock: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  brandText: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "600",
    letterSpacing: 2,
  },
  disclaimerBlock: {
    paddingBottom: 40,
  },
  disclaimerHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  disclaimerTitle: {
    color: "#F1FE74",
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 12,
  },
  disclaimerText: {
    color: "#9CA3AF",
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "400",
  },
});
