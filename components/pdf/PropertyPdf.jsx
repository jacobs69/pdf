import React from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PropertyReport from "./PropertyReport";
import PaymentTimeline from "./PaymentTimeline";
import Breakdown from "./Breakdown";
import ReportDisclaimer from "./ReportDisclaimer";

const { height: screenHeight } = Dimensions.get("window");

export default function PropertyPdf({ project, projectDetails }) {
  return (
    <ScrollView style={styles.scrollContainer}>
      {/* Page 1: Disclaimer */}
      <ReportDisclaimer />

      {/* Page 2: Property Report */}
      <PropertyReport project={project} projectDetails={projectDetails} />

      {/* Page 3: Payment Timeline */}
      <PaymentTimeline project={project} />

      {/* Page 4: Breakdown */}
      <Breakdown project={project} projectDetails={projectDetails} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: "#0F1115",
  },
  page: {
    minHeight: screenHeight,
  },
});
