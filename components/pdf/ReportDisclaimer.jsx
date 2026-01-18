import React from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  Dimensions,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PropertyReport from "./PropertyReport";
import PaymentTimeline from "./PaymentTimeline";

const { height: screenHeight } = Dimensions.get("window");

export default function ReportDisclaimer({ project, projectDetails }) {
  return (
    <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="light-content" backgroundColor="#0F1115" />
      
      {/* Page 1: Disclaimer */}
      <View style={[styles.page, styles.container]}>
        {/* Center Logo */}
        <View style={styles.centerBlock}>
          <View style={styles.logoImage}>
            <Text style={styles.brandText}>L</Text>
          </View>
          <Text style={styles.brandText}>LIYANTIS</Text>
        </View>

        {/* Disclaimer */}
        <View style={styles.disclaimerBlock}>
          <View style={styles.disclaimerHeader}>
            <Text style={styles.disclaimerTitle}>Disclaimer</Text>
            <View style={styles.disclaimerIcon}>
              <Ionicons name="information-circle" size={20} color="#9CA3AF" />
            </View>
          </View>
          <Text style={styles.disclaimerText}>
            All investment figures, estimates, and projections presented here are
            based on data available at the time of preparation and are subject to
            change due to market conditions, developer revisions, or agent
            assessment. Liyantis shall not be held responsible for any financial
            decisions made solely based on this report.
          </Text>
        </View>
      </View>

      {/* Page 2: Property Report */}
      <PropertyReport project={project} projectDetails={projectDetails} />

      {/* Page 3: Payment Timeline */}
      <PaymentTimeline project={project} projectDetails={projectDetails} />
    </ScrollView>
  );
}

/* ---------- Styles ---------- */
const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: "#0F1115",
  },
  page: {
    height: screenHeight,
  },
  container: {
    flex: 1,
    backgroundColor: "#0F1115",
    paddingHorizontal: 24,
  },
  centerBlock: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#FF6B00",
    justifyContent: "center",
    alignItems: "center",
  },
  brandText: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "600",
    marginTop: 18,
    letterSpacing: 2,
  },
  disclaimerBlock: {
    paddingBottom: 40,
  },
  disclaimerHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  disclaimerTitle: {
    color: "#9CA3AF",
    fontSize: 14,
    fontWeight: "500",
  },
  disclaimerIcon: {
    width: 20,
    height: 20,
    marginLeft: 6,
  },
  disclaimerText: {
    color: "#6B7280",
    fontSize: 8,
    lineHeight: 12,
  },
});