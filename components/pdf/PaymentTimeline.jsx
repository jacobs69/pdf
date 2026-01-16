import React from "react";
import { View, Text, StyleSheet, FlatList, Dimensions } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";

export default function PaymentTimeline({ project }) {
  if (!project) return null;

  const installments = project.paymentPlan?.installments || [];

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        {/* Title */}
        <Text style={styles.title}>Payment Timeline</Text>

        {/* Legend */}
        <View style={styles.legendRow}>
          <LegendDot color="#8DFF3F" label="Completed" />
          <LegendDot color="#A3A6AD" label="Pending" />
          <LegendIcon icon="flag" iconType="Feather" label="Key Date" />
        </View>

        {/* Header */}
        <View style={styles.headerRow}>
          <Text style={[styles.headerText, { flex: 2 }]}>Date</Text>
          <Text style={[styles.headerText, { flex: 1 }]}>%</Text>
          <Text style={[styles.headerText, { flex: 1 }]}>Amount</Text>
        </View>

        {/* Timeline */}
        <FlatList
          data={installments}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <TimelineRow item={item} isLast={index === installments.length - 1} />
          )}
          scrollEnabled={false}
        />
      </View>
    </View>
  );
}

const TimelineRow = ({ item, isLast }) => {
  const isCompleted = item.stage === "On Handover" || item.stage === "Post Handover" || item.stage === "Handover";
  const isKeyDate = item.stage === "Down Payment" || item.stage === "On Handover";

  return (
    <View style={styles.row}>
      {/* Date */}
      <Text style={[styles.date, { flex: 2 }]}>{item.date}</Text>

      {/* Timeline */}
      <View style={styles.timelineCol}>
        {!isLast && <View style={styles.dottedLine} />}
        {isCompleted ? (
          <View style={styles.greenDot} />
        ) : isKeyDate ? (
          <View style={styles.iconCircle}>
            <Feather name="flag" size={12} color="#F1FE74" />
          </View>
        ) : (
          <View style={styles.grayDot} />
        )}
      </View>

      {/* Percent */}
      <Text style={[styles.percent, { flex: 1 }]}>{item.percent}%</Text>

      {/* Amount */}
      <Text style={[styles.amount, { flex: 1 }]}>AED {(parseInt(item.percent) * 12250).toLocaleString()}</Text>
    </View>
  );
};

const LegendDot = ({ color, label }) => (
  <View style={styles.legendItem}>
    <View style={[styles.legendDot, { backgroundColor: color }]} />
    <Text style={styles.legendText}>{label}</Text>
  </View>
);

const LegendIcon = ({ icon, iconType = "Ionicons", label }) => (
  <View style={styles.legendItem}>
    {iconType === "Feather" ? (
      <Feather name={icon} size={10} color="#F1FE74" />
    ) : (
      <Ionicons name={icon} size={10} color="#F1FE74" />
    )}
    <Text style={styles.legendText}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  page: {
    minHeight: Dimensions.get("window").height,
    backgroundColor: "#0B0D11",
  },
  container: {
    flex: 1,
    backgroundColor: "#0B0D11",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 18,
  },
  legendRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginBottom: 24,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendText: {
    color: "rgba(245, 245, 245, 0.75)",
    fontSize: 12,
    fontWeight: "400",
  },
  headerRow: {
    flexDirection: "row",
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#1E2128",
    marginBottom: 10,
  },
  headerText: {
    color: "rgba(245, 245, 245, 0.75)",
    fontSize: 15,
    fontWeight: "600",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    gap: 12,
  },
  date: {
    color: "#C9CCD1",
    fontSize: 13,
  },
  timelineCol: {
    width: 24,
    alignItems: "center",
    marginLeft: -10,
  },
  dottedLine: {
    position: "absolute",
    top: 14,
    width: 1,
    height: 36,
    borderLeftWidth: 1,
    borderLeftColor: "#3A3D45",
    borderStyle: "dashed",
  },
  grayDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#A3A6AD",
  },
  greenDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#8DFF3F",
  },
  iconCircle: {
    width: 20,
    height: 20,
    borderRadius: 0,
    borderWidth: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  percent: {
    color: "#C9CCD1",
    fontSize: 13,
  },
  amount: {
    color: "#C9CCD1",
    fontSize: 13,
    textAlign: "right",
  },
});
