import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Modal, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView,
  StatusBar,
  Alert,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PropertyPdf from './pdf/PropertyPdf';
import { generateProjectPDF } from '../utils/pdfService';

const PdfModal = ({ visible, onClose, project, projectDetails }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSharePDF = async () => {
    try {
      setIsGenerating(true);
      console.log('Starting PDF generation from modal...');
      console.log('Project:', project);
      console.log('Project Details:', projectDetails);
      
      const result = await generateProjectPDF(project, projectDetails);
      console.log('PDF generation completed:', result);
      
      // Don't show success alert since sharing dialog will handle the UX
    } catch (error) {
      console.error('PDF generation error:', error);
      Alert.alert(
        'Error', 
        `Failed to generate PDF: ${error.message || 'Unknown error'}. Please try again.`,
        [{ text: 'OK' }]
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="fullScreen">
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#0F1115" />
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>PDF Preview</Text>
          
          {/* Enhanced Share Button */}
          <TouchableOpacity 
            style={[styles.shareButton, isGenerating && styles.shareButtonDisabled]} 
            onPress={handleSharePDF}
            disabled={isGenerating}
            activeOpacity={0.7}
          >
            <View style={styles.shareButtonContent}>
              {isGenerating ? (
                <>
                  <ActivityIndicator size="small" color="#FFFFFF" style={styles.loadingIcon} />
                  <Text style={styles.shareButtonText}>Creating...</Text>
                </>
              ) : (
                <>
                  <Ionicons name="share-outline" size={20} color="#FFFFFF" style={styles.shareIcon} />
                  <Text style={styles.shareButtonText}>Share</Text>
                </>
              )}
            </View>
          </TouchableOpacity>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#27292D',
  },
  closeButton: {
    padding: 5,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  
  // Enhanced Share Button (Header)
  shareButton: {
    backgroundColor: '#FF6B00',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    minWidth: 80,
  },
  shareButtonDisabled: {
    opacity: 0.6,
  },
  shareButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareIcon: {
    marginRight: 6,
  },
  loadingIcon: {
    marginRight: 6,
  },
  shareButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default PdfModal;