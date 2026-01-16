import { Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { 
  ScrollView, 
  Text, 
  TouchableOpacity, 
  View, 
  StyleSheet, 
  SafeAreaView,
  Image
} from "react-native";
import Svg, { Circle, Line } from "react-native-svg";

const data = [
  { date: "Oct 25", step: 1, percent: "5%", amount: "61,250", type: "circle", color: "#FFFFFF" },
  { date: "Nov 25", step: 2, percent: "10%", amount: "122,500", type: "circle", color: "#8E8E93" },
  { date: "Mar 26", step: 3, percent: "10%", amount: "122,500", type: "circle", color: "#8E8E93" },
  { date: "Jan 26", step: 4, percent: "10%", amount: "122,500", type: "circle", color: "#8BE24A" },
  { date: "Jan 26", step: 5, percent: "10%", amount: "122,500", type: "circle", color: "#8BE24A" },
  { date: "Jan 26", step: 6, percent: "10%", amount: "122,500", type: "circle", color: "#8BE24A" },
  { date: "Jan 26", step: 7, percent: "10%", amount: "122,500", type: "key", color: "#FFFFFF" },
  { date: "Jan 26", step: 8, percent: "35%", amount: "122,500", type: "flag", color: "#FFFFFF" },
];

export default function TimelineScreen() {
  const router = useRouter();

  const renderIcon = (item) => {
    if (item.type === 'key') {
      return (
        <View style={styles.iconWrapper}>
          <Feather name="key" size={14} color="#fff" style={styles.keyIcon} />
        </View>
      );
    }
    if (item.type === 'flag') {
      return (
        <View style={styles.iconWrapper}>
          <Feather name="flag" size={14} color="#fff" />
        </View>
      );
    }
    return (
      <Svg height="20" width="20">
        <Circle cx="10" cy="10" r="5" fill={item.color} />
      </Svg>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Modal Grabber */}
        <View style={styles.modalGrabber} />

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Image 
              source={require("../../assets/images/png/back button png.png")} 
              style={{ width: 24, height: 24 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Payment Timeline</Text>
          <Feather name="more-horizontal" size={24} color="white" />
        </View>

        {/* Yellow Toggles */}
        <View style={styles.toggleRow}>
          <View style={[styles.yellowBadge, { width: 110, height: 24 }]}>
            <Text style={styles.badgeText}>Cumulative</Text>
            <View style={styles.checkbox} />
          </View>

          <View style={[styles.yellowBadge, { width: 62, height: 24 }]}>
            <Text style={styles.badgeText}>AED</Text>
            <Feather name="chevron-down" size={14} color="#000" />
          </View>
        </View>

        {/* Table Header */}
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderText, { width: 60 }]}>Date</Text>
          <View style={styles.dottedDivider} />
          <Text style={[styles.tableHeaderText, { width: 100, textAlign: 'center', marginLeft: 34 }]}>Instalment (%)</Text>
          <Text style={[styles.tableHeaderText, { flex: 1, textAlign: 'right' }]}>Amount</Text>
        </View>

        <View style={styles.horizontalLine} />

        {/* Timeline List */}
        <ScrollView showsVerticalScrollIndicator={false}>
          {data.map((item, index) => (
            <View key={index}>
              <View style={styles.row}>
                {/* Date */}
                <Text style={styles.dateText}>{item.date}</Text>

                {/* Timeline Column */}
                <View style={styles.timelineColumn}>
                  {index !== data.length - 1 && (
                    <View style={styles.verticalLineContainer}>
                      <Svg height="65" width="2">
                        <Line
                          x1="1" y1="0" x2="1" y2="65"
                          stroke="#444"
                          strokeWidth="1.5"
                          strokeDasharray="4, 4"
                        />
                      </Svg>
                    </View>
                  )}
                  <View style={styles.iconContainer}>
                    {renderIcon(item)}
                  </View>
                </View>

                {/* Step Number */}
                <Text style={styles.stepText}>{item.step}</Text>

                {/* Percent */}
                <Text style={styles.percentText}>{item.percent}</Text>

                {/* Amount */}
                <Text style={styles.amountText}>{item.amount}</Text>
              </View>
              
              {index !== data.length - 1 && (
                <View style={styles.rowSeparator} />
              )}
            </View>
          ))}
          <View style={{ height: 40 }} />
        </ScrollView>

        {/* Bottom Legend */}
        <View style={styles.legendContainer}>
          <View style={styles.legendItem}>
            <View style={styles.flipReadyDot} />
            <Text style={styles.legendText}>Flip Ready</Text>
          </View>
          <View style={styles.legendItem}>
            <Feather name="key" size={12} color="#ccc" style={styles.legendKey} />
            <Text style={styles.legendText}>Handover</Text>
          </View>
          <View style={styles.legendItem}>
            <Feather name="flag" size={12} color="#ccc" style={{ marginRight: 6 }} />
            <Text style={styles.legendText}>Last Instalment</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#262A34',
  },
  container: {
    flex: 1,
    backgroundColor: '#181A20',
    paddingHorizontal: 20,
    paddingTop: 10,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  modalGrabber: {
    width: 40,
    height: 4,
    backgroundColor: '#444',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
    paddingHorizontal: 0,
  },
  yellowBadge: {
    backgroundColor: '#EFF998',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 15,
  },
  badgeText: {
    color: '#16181D',
    fontWeight: '600',
    fontSize: 13,
    marginRight: 8,
  },
  checkbox: {
    width: 12,
    height: 12,
    borderWidth: 1.5,
    borderColor: '#16181D',
    borderRadius: 2,
  },
  tableHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  tableHeaderText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '500',
  },
  dottedDivider: {
    width: 1,
    height: 16,
    backgroundColor: '#444',
    marginHorizontal: 10,
    borderStyle: 'dotted',
    borderWidth: 1,
    borderColor: '#666',
  },
  horizontalLine: {
    height: 1,
    backgroundColor: '#333',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
  },
  dateText: {
    color: '#888',
    fontSize: 14,
    width: 60,
  },
  timelineColumn: {
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  verticalLineContainer: {
    position: 'absolute',
    top: 20,
    zIndex: -1,
  },
  iconContainer: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#16181D',
  },
  iconWrapper: {
    alignItems: 'center',
  },
  keyIcon: {
    transform: [{ rotate: '-45deg' }],
  },
  stepText: {
    color: '#666',
    fontSize: 16,
    width: 24,
    marginLeft: 4,
  },
  percentText: {
    color: '#888',
    fontSize: 16,
    width: 80,
    textAlign: 'right',
  },
  amountText: {
    color: '#aaa',
    fontSize: 16,
    flex: 1,
    textAlign: 'right',
  },
  rowSeparator: {
    height: 1,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#2A2F38',
    borderStyle: 'dashed',
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    marginTop: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flipReadyDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#8BE24A',
    marginRight: 8,
  },
  legendText: {
    color: '#888',
    fontSize: 14,
  },
  legendKey: {
    marginRight: 6,
    transform: [{ rotate: '-45deg' }],
  },
});