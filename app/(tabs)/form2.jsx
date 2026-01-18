import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { useProjectStore } from '../../store/projectStore';

// --- Constants & Theme ---
const COLORS = {
  background: '#181A20',
  cardBg: '#1C1C1E', // Slightly lighter for inputs/cards
  primary: '#EEFB73', // Updated yellow color
  textWhite: '#FFFFFF',
  textGrey: '#A0A0A0',
  border: '#2C2C2E',
  danger: '#FF453A',
};

// --- Components ---
const InputField = ({ label, value, onChangeText, optional = false, suffix = '%' }) => {
  const handleTextChange = (text) => {
    // Remove any existing % signs
    let cleanText = text.replace(/%/g, '');
    // Call the original onChangeText with clean number
    onChangeText(cleanText);
  };

  const displayValue = value ? `${value}%` : '';

  return (
    <View style={styles.inputContainer}>
      <View style={styles.labelRow}>
        <Text style={styles.label}>{label}</Text>
        {optional && <Text style={styles.optionalLabel}>Optional</Text>}
      </View>
      <View style={styles.inputWrapper}>
        <TextInput
          value={displayValue}
          onChangeText={handleTextChange}
          style={styles.input}
          placeholderTextColor={COLORS.textGrey}
          keyboardType="numeric"
        />
      </View>
    </View>
  );
};

export default function PaymentDetailsScreen() {
  const router = useRouter();

  // --- State ---
  const [constructionTarget, setConstructionTarget] = useState("40");
  const [handoverTarget, setHandoverTarget] = useState("60");
  const [postHandoverTarget, setPostHandoverTarget] = useState("0");
  const [flipAt, setFlipAt] = useState("35%");
  const [handoverAt, setHandoverAt] = useState("70%");

  // Validation states
  const [flipAtError, setFlipAtError] = useState(false);
  const [percentageError, setPercentageError] = useState(false);

  const [installments, setInstallments] = useState([]);

  // State for managing the custom dropdown
  const [activeDropdownId, setActiveDropdownId] = useState(null);

  // --- Computed Values ---
  const totalPercent = useMemo(() => {
    return installments.reduce((acc, curr) => acc + (Number(curr.percent) || 0), 0);
  }, [installments]);

  const totalCount = installments.length;

  // --- Validation Functions ---
  const validateFlipAt = (flipValue, handoverValue) => {
    const flipNum = parseFloat(flipValue.replace('%', ''));
    const handoverNum = parseFloat(handoverValue.replace('%', ''));
    return flipNum >= handoverNum;
  };

  const validatePercentage = (total) => {
    return total !== 100;
  };

  // Update validation states when values change
  React.useEffect(() => {
    setFlipAtError(validateFlipAt(flipAt, handoverAt));
  }, [flipAt, handoverAt]);

  React.useEffect(() => {
    setPercentageError(validatePercentage(totalPercent));
  }, [totalPercent]);

  // --- Handlers ---
  const handleFlipAtChange = (text) => {
    // Remove any existing % signs
    let cleanText = text.replace(/%/g, '');
    // Add % symbol automatically
    const displayValue = cleanText ? `${cleanText}%` : '';
    setFlipAt(displayValue);
  };

  const handleHandoverAtChange = (text) => {
    // Remove any existing % signs
    let cleanText = text.replace(/%/g, '');
    // Add % symbol automatically
    const displayValue = cleanText ? `${cleanText}%` : '';
    setHandoverAt(displayValue);
  };

  const addInstallment = () => {
    const newId = installments.length > 0 ? Math.max(...installments.map(i => i.id)) + 1 : 1;
    const nextDisplayId = String(installments.length + 1);
    // First installment is always Down Payment, others default to During Construction
    const isFirstInstallment = installments.length === 0;
    const newInstallment = {
      id: newId,
      displayId: nextDisplayId,
      month: 'Dec',
      year: '2025',
      percent: isFirstInstallment ? 10 : 0,
      type: isFirstInstallment ? 'Down Payment' : 'During Construction',
    };
    setInstallments([...installments, newInstallment]);
  };

  const removeInstallment = (id) => {
    const filtered = installments.filter((item) => item.id !== id);
    // Re-index displayIds after removal and ensure first is Down Payment
    const reindexed = filtered.map((item, index) => ({
      ...item,
      displayId: String(index + 1),
      type: index === 0 ? 'Down Payment' : item.type,
      percent: index === 0 ? 10 : item.percent,
    }));
    setInstallments(reindexed);
  };

  const updateInstallment = (id, field, value) => {
    setInstallments(installments.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
    if (field === 'type' || field === 'month') {
      setActiveDropdownId(null); // Close dropdown after selection
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* --- Header --- */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color={COLORS.textWhite} />
        </TouchableOpacity>
        
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Payment Details</Text>
          {/* Progress Bar (Step 2 active) */}
          <View style={styles.progressBar}>
            <View style={styles.progressDot} />
            <View style={[styles.progressDot, styles.progressActive]} />
            <View style={styles.progressDot} />
            <View style={styles.progressDot} />
          </View>
        </View>
        <View style={{ width: 24 }} />
      </View>

      {/* Click overlay to close type dropdowns only */}
      {/* Removed overlay as it was blocking dropdown item clicks */}

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView 
          contentContainerStyle={styles.scrollContent} 
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          onScrollBeginDrag={() => setActiveDropdownId(null)}
        >
          
          {/* Top Configuration Section */}
          <View style={styles.configSection}>
            <InputField 
              label="During Construction" 
              value={constructionTarget} 
              onChangeText={setConstructionTarget} 
              suffix={null}
            />
            <InputField 
              label="On Handover" 
              value={handoverTarget} 
              onChangeText={setHandoverTarget} 
              suffix={null}
            />
            <InputField 
              label="Post Handover" 
              value={postHandoverTarget} 
              onChangeText={setPostHandoverTarget} 
              optional 
              suffix={null}
            />
            
            <View style={styles.flipAtRow}>
              <View style={styles.flipAtContainer}>
                <View style={styles.inputContainerLeft}>
                  <View style={styles.labelRow}>
                    <Text style={styles.label}>Flip At</Text>
                  </View>
                  <View style={[styles.flipAtInputWrapper, flipAtError && styles.inputError]}>
                    <TextInput
                      value={String(flipAt)}
                      onChangeText={handleFlipAtChange}
                      style={styles.flipAtInput}
                      placeholderTextColor={COLORS.textGrey}
                      keyboardType="numeric"
                      multiline={false}
                      scrollEnabled={false}
                      editable={true}
                    />
                  </View>
                  {flipAtError && <Text style={styles.errorTextBelow}>(Cannot be &gt; handover)</Text>}
                </View>
              </View>
              <View style={styles.flipAtContainer}>
                <View style={styles.inputContainerLeft}>
                  <View style={styles.labelRow}>
                    <Text style={styles.label}>Handover At</Text>
                  </View>
                  <View style={styles.handoverInputWrapper}>
                    <TextInput
                      value={String(handoverAt)}
                      onChangeText={handleHandoverAtChange}
                      style={styles.handoverAtInput}
                      placeholderTextColor={COLORS.textGrey}
                      keyboardType="numeric"
                      multiline={false}
                      scrollEnabled={false}
                      editable={true}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Add Installments Header */}
          <View style={styles.headerRow}>
            <Text style={styles.sectionHeaderTitle}>Add Installments</Text>
            <TouchableOpacity onPress={addInstallment} style={styles.addButton}>
              <Ionicons name="add" size={21} color="#000000" />
            </TouchableOpacity>
          </View>
          <Text style={styles.subText}>
            Add installments to complete the 100% payment for the project.
          </Text>

          {/* Progress Card (The "Graph") */}
          <LinearGradient
            colors={['#D2D2D2', '#676767']}
            style={styles.cardGradientBorder}
          >
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <View>
                  <View style={styles.percentRow}>
                    <Text style={styles.bigPercent}>{totalPercent}%</Text>
                  </View>
                  <Text style={styles.cardLabel}>Complete</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                  <Text style={styles.bigCount}>{totalCount}</Text>
                  <Text style={[styles.cardLabel, { color: '#FFFFFF', marginLeft: 8, alignSelf: 'flex-end' }]}>Total installments</Text>
                </View>
              </View>

              {/* Dynamic Timeline */}
              <View style={styles.timelineContainer}>
                {/* Background Track Line */}
                <View style={styles.trackLine} />
                
                {/* Active Progress Nodes */}
                <View style={styles.nodesContainer}>
                  {installments.map((inst, index) => {
                    const count = installments.length;
                    const positionPercent = count > 1 ? (index / (count - 1)) * 100 : 0;
                    return (
                      <View 
                        key={inst.id} 
                        style={[
                          styles.nodeWrapper,
                          { left: `${positionPercent}%` }
                        ]}
                      >
                        <View style={[
                          styles.node,
                          count > 30 && styles.nodeSmall
                        ]} />
                      </View>
                    );
                  })}
                </View>
              </View>
            </View>
          </LinearGradient>

          {/* Installments List */}
          <View style={styles.listContainer}>
            {installments.map((inst, index) => {
              const isFirstInstallment = index === 0;
              const isTypeDropdownOpen = activeDropdownId === inst.id;
              const isMonthDropdownOpen = activeDropdownId === `month-${inst.id}`;
              const isYearDropdownOpen = activeDropdownId === `year-${inst.id}`;
              const isAnyDropdownOpen = isTypeDropdownOpen || isMonthDropdownOpen || isYearDropdownOpen;
              return (
                <View key={inst.id} style={[
                  styles.listItem,
                  { zIndex: isAnyDropdownOpen ? 100 : 0 }
                ]}>
                  {/* Editable Index */}
                  <TextInput
                    style={styles.indexInput}
                    value={inst.displayId}
                    onChangeText={(text) => updateInstallment(inst.id, 'displayId', text)}
                  />

                  {/* Editable Date */}
                  <View style={styles.dateColumn}>
                    <View style={styles.dateRow}>
                      <TouchableOpacity 
                        style={styles.monthDropdown}
                        onPress={() => setActiveDropdownId(`month-${inst.id}`)}
                      >
                        <Text style={styles.monthText}>{inst.month}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity 
                        style={styles.yearDropdown}
                        onPress={() => setActiveDropdownId(`year-${inst.id}`)}
                      >
                        <Text style={styles.yearText}>{inst.year}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  {/* Percentage Input */}
                  <View style={styles.percentInputWrapper}>
                    <TextInput
                      style={[styles.percentInput, totalPercent !== 100 && styles.percentInputError]}
                      value={String(inst.percent)}
                      onChangeText={(text) => updateInstallment(inst.id, 'percent', Number(text))}
                      placeholder="0"
                      placeholderTextColor="#64748b"
                      keyboardType="numeric"
                    />
                    <Text style={[styles.percentSuffix, totalPercent !== 100 && styles.percentSuffixError]}>%</Text>
                  </View>

                  {/* Type Dropdown / Label */}
                  <View style={styles.typeWrapper}>
                    <TouchableOpacity 
                      style={styles.typeRow}
                      onPress={() => {
                        if (!isFirstInstallment) {
                          setActiveDropdownId(isTypeDropdownOpen ? null : inst.id);
                        }
                      }}
                    >
                      <Text style={styles.typeText} numberOfLines={1}>
                        {inst.type}
                      </Text>
                      {!isFirstInstallment && (
                        <Ionicons name="chevron-down" size={14} color="#F5F5F5" style={{ marginLeft: 1 }} />
                      )}
                    </TouchableOpacity>

                    {/* Custom Dropdown Menu */}
                    {isTypeDropdownOpen && !isFirstInstallment && (
                      <View style={styles.dropdownMenu}>
                        <TouchableOpacity 
                          style={[
                            styles.dropdownItem,
                            inst.type === 'During Construction' && styles.dropdownItemActive
                          ]}
                          onPress={() => {
                            updateInstallment(inst.id, 'type', 'During Construction');
                            setActiveDropdownId(null);
                          }}
                        >
                          <Text style={[
                            styles.dropdownItemText,
                            inst.type === 'During Construction' && styles.dropdownItemTextActive
                          ]}>
                            During Construction
                          </Text>
                        </TouchableOpacity>
                        <View style={styles.dropdownDivider} />
                        <TouchableOpacity 
                          style={[
                            styles.dropdownItem,
                            inst.type === 'On Handover' && styles.dropdownItemActive
                          ]}
                          onPress={() => {
                            updateInstallment(inst.id, 'type', 'On Handover');
                            setActiveDropdownId(null);
                          }}
                        >
                          <Text style={[
                            styles.dropdownItemText,
                            inst.type === 'On Handover' && styles.dropdownItemTextActive
                          ]}>
                            On Handover
                          </Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>

                  {/* Year Dropdown */}
                  {/* Year selection is now handled by modal */}

                  {/* Remove Action */}
                  <TouchableOpacity 
                    onPress={() => removeInstallment(inst.id)}
                    style={styles.removeButton}
                  >
                    <Ionicons name="close" size={16} color="#94a3b8" />
                  </TouchableOpacity>
                </View>
              );
            })}
            
            {installments.length === 0 && (
              <Text style={styles.emptyText}>
                No installments added. Tap + to start.
              </Text>
            )}

            {/* Percentage Error Message - appears after all installments */}
            {totalPercent !== 100 && installments.length > 0 && (
              <Text style={styles.percentageErrorTextEnd}>
                (percentage must be equal to 100%)
              </Text>
            )}
          </View>

          {/* Footer Info */}
          <View style={styles.footerInfo}>
            <View style={styles.footerContent}>
              <Ionicons name="information-circle-outline" size={12} color={COLORS.textGrey} />
              <Text style={styles.footerText}>Total calculated automatically</Text>
            </View>
          </View>

          {/* Next Button - Now part of scroll content */}
          <View style={styles.nextButtonContainer}>
            <TouchableOpacity 
              style={[styles.nextButton, percentageError && styles.nextButtonDisabled]} 
              onPress={() => {
                // Only proceed if validation passes
                if (percentageError) {
                  return;
                }
                // Form data is collected - your senior will handle backend integration
                router.push('/form3');
              }}
            >
              <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Month Selection Modal */}
      <Modal
        visible={activeDropdownId !== null && activeDropdownId.toString().startsWith('month-')}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setActiveDropdownId(null)}
      >
        <TouchableOpacity 
          style={styles.modalBackdrop} 
          activeOpacity={1} 
          onPress={() => setActiveDropdownId(null)}
        >
          <View style={styles.monthModalMenu}>
            <FlatList
              data={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']}
              keyExtractor={(item) => item}
              renderItem={({ item, index }) => {
                const currentInstallmentId = activeDropdownId ? parseInt(activeDropdownId.toString().replace('month-', '')) : null;
                const currentInstallment = installments.find(inst => inst.id === currentInstallmentId);
                const isSelected = currentInstallment?.month === item;
                
                return (
                  <View>
                    <TouchableOpacity
                      style={[styles.monthModalItem, isSelected && styles.monthModalItemSelected]}
                      onPress={() => {
                        if (currentInstallmentId) {
                          updateInstallment(currentInstallmentId, 'month', item);
                        }
                      }}
                      activeOpacity={0.7}
                    >
                      <Text style={[styles.monthModalItemText, isSelected && styles.monthModalItemTextSelected]}>
                        {item}
                      </Text>
                      {isSelected && (
                        <View style={styles.checkIcon}>
                          <Ionicons name="checkmark" size={16} color="#60a5fa" />
                        </View>
                      )}
                    </TouchableOpacity>
                    {index < 11 && <View style={styles.monthModalSeparator} />}
                  </View>
                );
              }}
              bounces={false}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Year Selection Modal */}
      <Modal
        visible={activeDropdownId !== null && activeDropdownId.toString().startsWith('year-')}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setActiveDropdownId(null)}
      >
        <TouchableOpacity 
          style={styles.modalBackdrop} 
          activeOpacity={1} 
          onPress={() => setActiveDropdownId(null)}
        >
          <View style={styles.monthModalMenu}>
            <FlatList
              data={Array.from({ length: 10 }, (_, i) => (new Date().getFullYear() + i).toString())}
              keyExtractor={(item) => item}
              renderItem={({ item, index }) => {
                const currentInstallmentId = activeDropdownId ? parseInt(activeDropdownId.toString().replace('year-', '')) : null;
                const currentInstallment = installments.find(inst => inst.id === currentInstallmentId);
                const isSelected = currentInstallment?.year === item;
                const yearData = Array.from({ length: 10 }, (_, i) => (new Date().getFullYear() + i).toString());
                
                return (
                  <View>
                    <TouchableOpacity
                      style={[styles.monthModalItem, isSelected && styles.monthModalItemSelected]}
                      onPress={() => {
                        if (currentInstallmentId) {
                          updateInstallment(currentInstallmentId, 'year', item);
                          setActiveDropdownId(null);
                        }
                      }}
                      activeOpacity={0.7}
                    >
                      <Text style={[styles.monthModalItemText, isSelected && styles.monthModalItemTextSelected]}>
                        {item}
                      </Text>
                      {isSelected && (
                        <View style={styles.checkIcon}>
                          <Ionicons name="checkmark" size={16} color="#60a5fa" />
                        </View>
                      )}
                    </TouchableOpacity>
                    {index < yearData.length - 1 && <View style={styles.monthModalSeparator} />}
                  </View>
                );
              }}
              bounces={false}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 0,
  },
  backButton: { padding: 4 },
  headerTitleContainer: { alignItems: 'center' },
  headerTitle: {
    color: '#F5F5F5',
    fontSize: 19,
    fontFamily: 'Poppins-Bold',
    fontWeight: 'bold',
    marginBottom: 6,
  },
  progressBar: { flexDirection: 'row', gap: 4 },
  progressDot: {
    width: 27,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#D9D9D9',
  },
  progressActive: { backgroundColor: '#EEFB73' },
  
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 50,
    backgroundColor: 'transparent',
  },

  scrollContent: { 
    paddingHorizontal: 16, // 16px left and right margins
    paddingVertical: 12, // Reduced from 16 to fit properly
    paddingBottom: 25, // Reduced from 30 to 25
  },

  // --- Config Section ---
  configSection: {
    marginBottom: 8, // Changed back to 8px
    gap: 8, // Changed back to 8px for spacing between boxes
    alignItems: 'center', // Revert back to center for box alignment
  },
  inputContainer: {
    gap: 8, // Keep as 8
    marginBottom: 8, // Changed back to 8px
    alignItems: 'center', // Revert back to center for box alignment
  },
  inputContainerLeft: {
    gap: 8, // Keep as 8
    marginBottom: 8, // Changed back to 8px
    alignItems: 'flex-start', // Align to left for flip at
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: '100%', // Ensure full width for proper spacing
    alignSelf: 'flex-start', // Align the entire label row to left
  },
  label: {
    color: '#F5F5F5',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    textAlign: 'left', // Align label text to left
    alignSelf: 'flex-start', // Align label container to left
  },
  optionalLabel: {
    color: COLORS.textGrey,
    fontSize: 12,
    textAlign: 'right', // Align optional text to right
  },
  inputWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  input: {
    width: 320, // Reduced from 330 to ensure content fits
    height: 48,
    backgroundColor: 'transparent',
    borderColor: '#FFFFFF',
    borderWidth: 0.5,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: '#F5F5F5',
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    fontWeight: '500',
    textAlign: 'left', // Align text inside input to left
  },
  suffix: {
    position: 'absolute',
    right: 16,
    color: COLORS.textGrey,
  },
  row: {
    flexDirection: 'row',
    gap: 16,
  },
  halfWidth: {
    flex: 1,
  },
  flipAtRow: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Align to edges like post handover box
    alignItems: 'flex-start',
    width: 320, // Reduced from 330 to ensure content fits
    gap: 10, // Reverted back to original gap
  },
  flipAtContainer: {
    alignItems: 'flex-start', // Align flip at label to left
  },
  flipAtInputWrapper: {
    position: 'relative',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderColor: '#FFFFFF',
    borderWidth: 0.5,
    borderRadius: 10,
    width: 155, // Reverted back to original size
    height: 48,
    paddingHorizontal: 16,
  },
  inputError: {
    borderColor: '#FF453A',
    borderWidth: 1,
  },
  errorText: {
    color: '#FF453A',
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    fontWeight: '400',
  },
  errorTextBelow: {
    color: '#FF453A',
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    fontWeight: '400',
    textAlign: 'left',
    marginTop: 4,
  },
  percentageErrorText: {
    color: '#FF453A',
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    fontWeight: '400',
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 8,
  },
  percentageErrorTextEnd: {
    color: '#FF453A',
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    fontWeight: '400',
    textAlign: 'left',
    marginTop: 8,
    marginLeft: 50, // Align with the installment content
  },
  handoverInputWrapper: {
    position: 'relative',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderColor: '#FFFFFF',
    borderWidth: 0.5,
    borderRadius: 10,
    width: 155, // Reverted back to original size
    height: 48,
    paddingHorizontal: 16,
  },
  flipAtInput: {
    width: '100%',
    backgroundColor: 'transparent',
    color: '#F5F5F5',
    fontSize: 22,
    fontFamily: 'Inter-Medium',
    fontWeight: '500',
    textAlign: 'center',
    textAlignVertical: 'center', // Center vertically on Android
  },
  handoverAtInput: {
    width: '100%',
    backgroundColor: 'transparent',
    color: '#F5F5F5',
    fontSize: 22,
    fontFamily: 'Inter-Medium',
    fontWeight: '500',
    textAlign: 'center',
    textAlignVertical: 'center', // Center vertically on Android
  },

  // --- Header ---
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8, // Changed back to 8px
  },
  sectionHeaderTitle: {
    color: '#F5F5F5',
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
  },
  addButton: {
    backgroundColor: '#EEFB73',
    borderRadius: 10,
    width: 26, // Increased from 22.86 to 26
    height: 25, // Increased from 21.86 to 25
    alignItems: 'center',
    justifyContent: 'center',
  },
  subText: {
    color: COLORS.textGrey,
    fontSize: 12,
    marginBottom: 8, // Changed back to 8px
  },

  // --- Graph Card ---
  cardGradientBorder: {
    borderRadius: 14,
    padding: 4,
    marginBottom: 8, // Changed back to 8px
  },
  card: {
    backgroundColor: '#27292D',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    height: 95,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  percentRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  bigPercent: {
    fontSize: 24,
    fontFamily: 'Inter-Medium',
    fontWeight: '500',
    color: '#F5F5F5',
    lineHeight: 28,
    marginTop: -4,
  },
  bigCount: {
    fontSize: 36,
    fontFamily: 'Inter-Medium',
    fontWeight: '500',
    color: '#FFFFFF',
    lineHeight: 40,
  },
  cardLabel: {
    color: 'rgba(245, 245, 245, 0.75)',
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    fontWeight: '400',
    marginTop: -2,
    letterSpacing: 0.5,
  },

  // Timeline
  timelineContainer: {
    height: 16,
    width: '100%',
    justifyContent: 'center',
    marginBottom: 4,
    position: 'relative',
  },
  trackLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#CDCDCD', // Updated timeline line color
    top: '50%',
    marginTop: -1,
  },
  nodesContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    height: 16,
  },
  nodeWrapper: {
    position: 'absolute',
    top: '50%',
    marginTop: -6, // Center the 12px circle on the line: -6px (half of circle height)
    transform: [{ translateX: -6 }] // Center horizontally: -6px (half of circle width)
  },
  node: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#EEFB73',
    borderWidth: 2,
    borderColor: '#EEFB73',
    shadowColor: '#EEFB73',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  nodeSmall: {
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 1,
    marginTop: 2, // Adjust for smaller circles to stay centered: 2px offset from the -6px base
  },

  // --- List ---
  listContainer: {
    gap: 8, // Changed back to 8px for spacing between installment items
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  indexInput: {
    width: 32,
    marginRight: 18, // Changed from 8 to 18 for W18 gap between 1 and Nov
    color: '#F5F5F5',
    fontFamily: 'Inter-Medium',
    fontWeight: '500',
    fontSize: 16,
    textAlign: 'left', // Changed from right to left to align numbers to left
    borderBottomWidth: 1,
    borderBottomColor: 'transparent',
  },
  dateColumn: {
    position: 'relative',
    width: 80,
    marginRight: 18, // Changed from 8 to 18 for W18 gap between 2025 and 5%
    marginLeft: -20, // Increased from -16 to -20 to move Nov even more left
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10, // Reduced from 14 to 10 to move 2025 even more left
  },
  monthDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  yearDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    marginLeft: 8,
  },
  monthText: {
    color: '#F5F5F5',
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    fontWeight: '500',
  },
  yearText: {
    color: '#F5F5F5',
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    fontWeight: '500',
  },
  // Month Modal Styles
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  monthModalMenu: {
    width: 180,
    maxHeight: 400,
    backgroundColor: '#1e293b',
    borderRadius: 20,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  monthModalItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  monthModalItemSelected: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
  },
  monthModalItemText: {
    fontSize: 16,
    color: '#e2e8f0',
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
    textAlign: 'center',
  },
  monthModalItemTextSelected: {
    color: '#60a5fa',
    fontWeight: '700',
  },
  checkIcon: {
    position: 'absolute',
    right: 15,
  },
  monthModalSeparator: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    width: '70%',
    alignSelf: 'center',
  },
  percentInputWrapper: {
    width: 35, // Reduced from 45 to 35 to make it even smaller
    marginRight: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start', // Changed from flex-end to flex-start to align left
  },
  percentInput: {
    flex: 1,
    textAlign: 'left', // Changed from right to left to align percentage text left
    color: '#F5F5F5',
    fontFamily: 'Inter-Medium',
    fontWeight: '500',
    fontSize: 16,
    padding: 0,
  },
  percentSuffix: {
    color: COLORS.textGrey,
    fontSize: 14,
    marginLeft: 2, // Keep small margin between number and %
    marginRight: 0, // Remove any right margin to keep it close to the number
  },
  percentInputError: {
    color: '#FF453A',
  },
  percentSuffixError: {
    color: '#FF453A',
  },
  percentOverTenError: {
    color: '#FF453A',
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    fontWeight: '400',
    textAlign: 'left',
    marginTop: 4,
    marginLeft: 50,
  },
  typeWrapper: {
    flex: 1,
    position: 'relative',
  },
  typeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  typeText: {
    color: '#cbd5e1',
    fontSize: 11, // Reduced from 12 to 11 to fit "During Construction" on one line
    flex: 1,
  },

  // Custom Dropdown Styles
  dropdownMenu: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    marginTop: 4,
    backgroundColor: '#1e293b',
    borderColor: '#334155',
    borderWidth: 1,
    borderRadius: 8,
    zIndex: 999,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  dropdownItemActive: {
    backgroundColor: 'rgba(238, 251, 115, 0.15)',
  },
  dropdownItemText: {
    color: '#e2e8f0',
    fontSize: 14,
  },
  dropdownItemTextActive: {
    color: '#EEFB73',
    fontWeight: '600',
  },
  dropdownDivider: {
    height: 1,
    backgroundColor: '#334155',
  },
  removeButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 4, // Reverted back to 4
  },
  emptyText: {
    textAlign: 'center',
    color: COLORS.textGrey,
    fontStyle: 'italic',
    paddingVertical: 20,
  },

  // --- Footer ---
  footerInfo: {
    marginTop: 32,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: COLORS.cardBg,
    alignItems: 'center',
  },
  footerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  footerText: {
    color: 'rgba(245, 245, 245, 0.75)',
    fontSize: 12,
  },

  nextButtonContainer: {
    marginTop: 20, // Reduced from 25 to 20
    marginBottom: 12, // Reduced from 15 to 12
    alignItems: 'center', // Center the button horizontally
  },
  nextButton: {
    backgroundColor: '#EEFB73',
    width: 320, // Reduced from 330 to ensure content fits
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButtonDisabled: {
    backgroundColor: '#A0A0A0',
    opacity: 0.5,
  },
  nextButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '700',
  },
});