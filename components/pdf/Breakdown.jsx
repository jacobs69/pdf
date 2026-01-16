import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

export default function Breakdown({ project, projectDetails }) {
  if (!project || !projectDetails) return null;

  const dldAmount = projectDetails.dld;
  const netTotal = project.price + (dldAmount * 1000);

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        {/* Title */}
        <Text style={styles.title}>Breakdown</Text>

        {/* Card */}
        <View style={styles.card}>
          {/* Header Row */}
          <View style={[styles.row, styles.headerRow]}>
            <View style={styles.leftCol}>
              <Text style={styles.headerText}>Details</Text>
            </View>
            <View style={styles.rightCol}>
              <Text style={styles.headerText}>AED</Text>
            </View>
          </View>

          <View style={styles.horizontalDivider} />

          {/* Property Price */}
          <TableRow label="Property Price" value={(project.price / 1000000).toFixed(2) + "mn"} />

          {/* DLD */}
          <TableRow label="DLD (4%)" value={dldAmount + "k"} />

          {/* Service Charges */}
          <TableRow label="Service Charges/Sq Ft" value={"AED " + projectDetails.serviceCharge} />

          {/* Net Total */}
          <View style={[styles.row, styles.netRow]}>
            <View style={styles.leftCol}>
              <Text style={styles.netText}>Net Total</Text>
            </View>
            <View style={styles.rightCol}>
              <Text style={styles.netText}>{(netTotal / 1000000).toFixed(2)}mn</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const TableRow = ({ label, value }) => (
  <View>
    <View style={styles.row}>
      <View style={styles.leftCol}>
        <Text style={styles.cellText}>{label}</Text>
      </View>
      <View style={styles.rightCol}>
        <Text style={styles.cellText}>{value}</Text>
      </View>
    </View>
    <View style={styles.horizontalDivider} />
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
  title: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 24,
  },
  card: {
    backgroundColor: "#27292D",
    borderRadius: 14,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 48,
  },
  headerRow: {
    backgroundColor: "#2C2F34",
  },
  leftCol: {
    flex: 2,
    paddingLeft: 16,
  },
  rightCol: {
    flex: 1,
    paddingRight: 16,
    alignItems: "flex-end",
  },
  headerText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  cellText: {
    color: "#E5E7EB",
    fontSize: 13,
  },
  netRow: {
    backgroundColor: "#2A2D31",
  },
  netText: {
    color: "#EEFB73",
    fontSize: 14,
    fontWeight: "600",
  },
  horizontalDivider: {
    height: 1,
    backgroundColor: "#3A3D42",
  },
});
