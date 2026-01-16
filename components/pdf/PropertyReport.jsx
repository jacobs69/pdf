import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Ionicons, MaterialCommunityIcons, Feather } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function PropertyReport({ project, projectDetails }) {
  if (!project || !projectDetails) return null;

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Property Report</Text>
            <Text style={styles.headerSub}>Generated on {new Date().toLocaleDateString()}</Text>
          </View>
          <View style={styles.logoWrap}>
            <View style={styles.logoContainer}>
              <View style={styles.logoCircle}>
                <Text style={styles.logoL}>L</Text>
              </View>
              <Text style={styles.logoText}>LIYANTIS</Text>
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Property Name */}
        <View style={styles.centerBlock}>
          <Text style={styles.propertyName}>{project.projectName}</Text>
          <Text style={styles.builder}>by {project.developer}</Text>
          <Text style={styles.price}>AED {(project.price / 1000000).toFixed(2)}mn</Text>
        </View>

        {/* Rating */}
        <View style={styles.ratingRow}>
          <View style={styles.ratingCircle}>
            <Text style={styles.ratingText}>{projectDetails.rating}</Text>
          </View>
          <Text style={styles.ratingDesc}>
            The final project rating is an aggregate score calculated from all the individual parameters assessed by the agent.
          </Text>
        </View>

        {/* Property Details */}
        <Text style={styles.sectionTitle}>Property Details</Text>
        <View style={styles.detailsRow}>
          <Detail icon="bed-outline" label={`${projectDetails.bedrooms} BR`} sub="Bedrooms" />
          <Detail icon="square-outline" label={`${projectDetails.area.sqft} ft²`} sub="Area" />
          <Detail icon="location-outline" label={project.location || "N/A"} sub="Location" />
        </View>

        {/* Exit Strategies */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Exit Strategies</Text>
          
          <View style={styles.exitTabs}>
            <Text style={styles.exitTabActive}>STP</Text>
            <Text style={styles.exitTab}>MTP</Text>
            <Text style={styles.exitTab}>LTP</Text>
          </View>

          <View style={styles.table}>
            <TableRow
              title="Moderate"
              moderate={projectDetails.exitStrategies.stp.moderate.percent}
              moderateAmt={projectDetails.exitStrategies.stp.moderate.val}
              cons={projectDetails.exitStrategies.stp.conservative.percent}
              consAmt={projectDetails.exitStrategies.stp.conservative.val}
              opt={projectDetails.exitStrategies.stp.optimistic.percent}
              optAmt={projectDetails.exitStrategies.stp.optimistic.val}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const Detail = ({ icon, label, sub }) => (
  <View style={styles.detailItem}>
    {icon && <Ionicons name={icon} size={20} color="#F1FE74" />}
    <Text style={styles.detailValue}>{label}</Text>
    {sub && <Text style={styles.detailSub}>{sub}</Text>}
  </View>
);

const TableRow = ({ title, moderate, moderateAmt, cons, consAmt, opt, optAmt }) => (
  <View style={styles.tableRow}>
    <View style={styles.tableLeft}>
      <Text style={styles.tableTitle}>{title}</Text>
    </View>
    <View style={styles.tableCol}>
      <Text style={styles.percent}>{moderate}</Text>
      <Text style={styles.amount}>{moderateAmt}</Text>
    </View>
    <View style={styles.tableCol}>
      <Text style={styles.percent}>{cons}</Text>
      <Text style={styles.amount}>{consAmt}</Text>
    </View>
    <View style={styles.tableCol}>
      <Text style={styles.percent}>{opt}</Text>
      <Text style={styles.amount}>{optAmt}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  page: {
    minHeight: Dimensions.get("window").height,
    backgroundColor: "#0F1115",
  },
  container: {
    flex: 1,
    backgroundColor: "#0F1115",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  header: {
    marginTop: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "600",
  },
  headerSub: {
    color: "#9CA3AF",
    fontSize: 10,
    marginTop: 4,
  },
  logoWrap: {
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#FF6B00",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 6,
  },
  logoL: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  logoText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  divider: {
    height: 1,
    marginVertical: 20,
    borderTopWidth: 1,
    borderTopColor: "#F5F5F5",
    borderStyle: "dashed",
  },
  centerBlock: {
    alignItems: "center",
  },
  propertyName: {
    color: "#F1FE74",
    fontSize: 22,
    fontWeight: "600",
  },
  builder: {
    color: "#9CA3AF",
    fontSize: 13,
    marginTop: 4,
  },
  price: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "700",
    marginTop: 16,
  },
  ratingRow: {
    flexDirection: "row",
    marginTop: 30,
    alignItems: "center",
  },
  ratingCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 4,
    borderColor: "#F1FE74",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  ratingText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },
  ratingDesc: {
    color: "#F5F5F5",
    fontSize: 13,
    flex: 1,
    lineHeight: 18,
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "600",
    marginTop: 30,
    marginBottom: 16,
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detailItem: {
    alignItems: "center",
    flex: 1,
  },
  detailValue: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "400",
    marginTop: 8,
  },
  detailSub: {
    color: "#9CA3AF",
    fontSize: 11,
    marginTop: 2,
  },
  card: {
    backgroundColor: "#171A20",
    borderRadius: 14,
    marginTop: 30,
    padding: 16,
    marginBottom: 20,
  },
  exitTabs: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  exitTab: {
    color: "#FFFFFF",
    fontSize: 13,
  },
  exitTabActive: {
    color: "#F1FE74",
    fontWeight: "600",
    fontSize: 13,
  },
  table: {
    borderTopWidth: 1,
    borderTopColor: "#2A2E35",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#2A2E35",
  },
  tableLeft: {
    flex: 2,
  },
  tableTitle: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "500",
  },
  tableCol: {
    flex: 1,
    alignItems: "flex-end",
  },
  percent: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
  },
  amount: {
    color: "#9CA3AF",
    fontSize: 12,
    marginTop: 4,
  },
});
