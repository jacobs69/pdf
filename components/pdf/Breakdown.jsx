import React from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
} from "react-native";

export default function Breakdown({ project, projectDetails }) {
  const calculateBreakdown = () => {
    const price = project?.price || 1197013;
    const dldPercent = project?.dldPercent || 4;
    const serviceChargePerSqFt = project?.serviceChargePerSqFt || 11;
    const areaSqFt = project?.areaSqFt || 776;
    
    const dldFee = (price * dldPercent) / 100;
    const serviceCharges = serviceChargePerSqFt * areaSqFt;
    const agentCommission = price * 0.02; // 2% agent commission
    const legalFees = 5000; // Fixed legal fees
    
    return {
      propertyPrice: price,
      dldFee,
      serviceCharges,
      agentCommission,
      legalFees,
      total: price + dldFee + serviceCharges + agentCommission + legalFees
    };
  };

  const breakdown = calculateBreakdown();

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Breakdown</Text>

      {/* Card */}
      <View style={styles.card}>
        {/* Header Row */}
        <View style={[styles.row, styles.headerRow]}>
          <Text style={[styles.leftCol, styles.headerText]}>Details</Text>
          <View style={styles.verticalDivider} />
          <Text style={[styles.rightCol, styles.headerText]}>AED</Text>
        </View>

        <Divider />

        {/* Rows */}
        <TableRow label="Property Price" value={breakdown.propertyPrice.toLocaleString()} />
        <Divider />
        <TableRow label="DLD Fee (4%)" value={breakdown.dldFee.toLocaleString()} />
        <Divider />
        <TableRow label="Service Charges" value={breakdown.serviceCharges.toLocaleString()} />
        <Divider />
        <TableRow label="Agent Commission (2%)" value={breakdown.agentCommission.toLocaleString()} />
        <Divider />
        <TableRow label="Legal Fees" value={breakdown.legalFees.toLocaleString()} />
        <Divider />

        {/* Net Total */}
        <View style={[styles.row, styles.netRow]}>
          <Text style={[styles.leftCol, styles.netText]}>Net Total</Text>
          <View style={styles.verticalDivider} />
          <Text style={[styles.rightCol, styles.netText]}>
            {breakdown.total.toLocaleString()}.00
          </Text>
        </View>
      </View>
    </View>
  );
}

/* ---------- Components ---------- */
const TableRow = ({ label, value }) => (
  <View style={styles.row}>
    <Text style={[styles.leftCol, styles.cellText]}>{label}</Text>
    <View style={styles.verticalDivider} />
    <Text style={[styles.rightCol, styles.cellText]}>{value}</Text>
  </View>
);

const Divider = () => <View style={styles.horizontalDivider} />;

/* ---------- Styles ---------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F1115",
    paddingHorizontal: 20,
    paddingTop: 0,
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
    textAlign: "right",
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
  verticalDivider: {
    width: 1,
    height: "100%",
    backgroundColor: "#3A3D42",
  },
  horizontalDivider: {
    height: 1,
    backgroundColor: "#3A3D42",
  },
});