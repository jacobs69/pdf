import React from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  FlatList,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";

export default function PaymentTimeline({ project, projectDetails }) {
  // Generate timeline data from project payment plan
  const generateTimelineData = () => {
    if (project?.paymentPlan?.installments) {
      return project.paymentPlan.installments.map((installment, index) => ({
        date: new Date(installment.date).toLocaleDateString('en-GB', { 
          month: 'short', 
          year: '2-digit' 
        }),
        step: index + 1,
        percent: `${installment.percent}%`,
        amount: ((project.price * installment.percent) / 100 / 1000).toFixed(0) + "k",
        status: index < 3 ? "green" : index === 6 ? "key" : index === project.paymentPlan.installments.length - 1 ? "flag" : "default"
      }));
    }
    
    // Default data if no payment plan
    return [
      { date: "Oct 25", step: 1, percent: "5%", amount: "61,250", status: "default" },
      { date: "Nov 25", step: 2, percent: "15%", amount: "183,750", status: "default" },
      { date: "Jan 26", step: 3, percent: "25%", amount: "122,500", status: "default" },
      { date: "Jan 26", step: 4, percent: "35%", amount: "122,500", status: "green" },
      { date: "Jan 26", step: 5, percent: "45%", amount: "122,500", status: "green" },
      { date: "Jan 26", step: 6, percent: "55%", amount: "122,500", status: "green" },
      { date: "Jan 26", step: 7, percent: "65%", amount: "122,500", status: "key" },
      { date: "Jan 26", step: 8, percent: "100%", amount: "122,500", status: "flag" },
    ];
  };

  const DATA = generateTimelineData();

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Payment Timeline</Text>

      {/* Legend */}
      <View style={styles.legendRow}>
        <LegendDot color="#A3A6AD" label="Upcoming" />
        <LegendDot color="#8DFF3F" label="Paid" />
        <LegendIcon icon="key" iconType="Feather" label="Flip at" />
        <LegendIcon icon="flag" iconType="Ionicons" label="Handover" />
      </View>

      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={[styles.headerText, { flex: 2 }]}>Date</Text>
        <Text style={[styles.headerText, { flex: 2 }]}>Installments%</Text>
        <Text style={[styles.headerText, { flex: 1, textAlign: "right" }]}>Amount</Text>
      </View>

      {/* Timeline */}
      <FlatList
        data={DATA}
        keyExtractor={(item) => item.step.toString()}
        renderItem={({ item, index }) => (
          <TimelineRow item={item} isLast={index === DATA.length - 1} />
        )}
        scrollEnabled={false}
      />
    </View>
  );
}

/* ---------- Components ---------- */
const TimelineRow = ({ item, isLast }) => {
  const isGreen = item.status === "green";
  const isKey = item.status === "key";
  const isFlag = item.status === "flag";

  return (
    <View style={styles.row}>
      {/* Date */}
      <Text style={[styles.date]}>{item.date}</Text>

      {/* Timeline */}
      <View style={styles.timelineCol}>
        {!isLast && <View style={styles.dottedLine} />}
        {isGreen && <View style={styles.greenDot} />}
        {isKey && (
          <View style={styles.iconCircle}>
            <Feather name="key" size={12} color="#FFFFFF" />
          </View>
        )}
        {isFlag && (
          <View style={styles.iconCircle}>
            <Ionicons name="flag" size={12} color="#FFFFFF" />
          </View>
        )}
        {!isGreen && !isKey && !isFlag && (
          <View style={styles.grayDot} />
        )}
      </View>

      {/* Step */}
      <Text style={styles.step}>{item.step}</Text>

      {/* Percent */}
      <Text style={styles.percent}>{item.percent}</Text>

      {/* Amount */}
      <Text style={styles.amount}>{item.amount}</Text>
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
      <Feather name={icon} size={12} color="rgba(245, 245, 245, 0.75)" />
    ) : (
      <Ionicons name={icon} size={12} color="rgba(245, 245, 245, 0.75)" />
    )}
    <Text style={styles.legendText}>{label}</Text>
  </View>
);

/* ---------- Styles ---------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B0D11",
    paddingHorizontal: 20,
    paddingTop: 0,
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
    fontFamily: "Inter",
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
    fontFamily: "Inter",
    fontWeight: "600",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    gap: 25,
  },
  date: {
    flex: 2,
    color: "#C9CCD1",
    fontSize: 13,
  },
  timelineCol: {
    width: 24,
    alignItems: "center",
    marginLeft: -70,
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
    borderColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  step: {
    width: 30,
    color: "#8B8F97",
    fontSize: 12,
    textAlign: "center",
    marginLeft: -10,
  },
  percent: {
    flex: 2,
    color: "#C9CCD1",
    fontSize: 13,
  },
  amount: {
    flex: 1,
    color: "#C9CCD1",
    fontSize: 13,
    textAlign: "right",
  },
});