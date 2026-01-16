import React from 'react';
import {
  View,
  Modal,
  Pressable,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import PropertyPdf from './pdf/PropertyPdf';

const PdfModal = ({ visible, onClose, project, projectDetails }) => {
  if (!project || !projectDetails) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={onClose} hitSlop={10}>
            <Feather name="x" size={24} color="#fff" />
          </Pressable>
        </View>

        {/* PDF Content */}
        <PropertyPdf project={project} projectDetails={projectDetails} />
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F1115',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#27292D',
    alignItems: 'flex-end',
  },
});

export default PdfModal;
