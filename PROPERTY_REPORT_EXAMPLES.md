# Property Report System - Usage Examples

## Example 1: Basic Integration

Simply import and use the dashboard:

```jsx
import PropertyReportDashboard from './components/PropertyReportDashboard';

export default function PropertyDetailScreen() {
  return <PropertyReportDashboard />;
}
```

## Example 2: Load Data from API

```jsx
import { useEffect } from 'react';
import { usePropertyReportStore } from './store/propertyReportStore';
import PropertyReportDashboard from './components/PropertyReportDashboard';

export default function PropertyDetailScreen({ propertyId }) {
  const {
    updatePropertyDetails,
    updateRating,
    syncPaymentTimeline,
    updateBreakdown,
    updateExitStrategies,
  } = usePropertyReportStore();

  useEffect(() => {
    const fetchPropertyData = async () => {
      try {
        const response = await fetch(`/api/properties/${propertyId}`);
        const data = await response.json();

        // Update all store data from API
        updatePropertyDetails({
          projectName: data.projectName,
          builder: data.builder,
          apartment: data.apartment,
          bedroom: data.bedroom,
          area: data.area,
          price: data.price,
          pricePerSqft: data.pricePerSqft,
        });

        updateRating(data.rating);
        syncPaymentTimeline(data.paymentTimeline);
        updateBreakdown(data.breakdown);
        updateExitStrategies(data.exitStrategies);
      } catch (error) {
        console.error('Failed to fetch property:', error);
      }
    };

    fetchPropertyData();
  }, [propertyId]);

  return <PropertyReportDashboard />;
}
```

## Example 3: Update Rating Based on User Input

```jsx
import { usePropertyReportStore } from './store/propertyReportStore';
import { View, Text, Slider, StyleSheet } from 'react-native';

export default function RatingUpdater() {
  const { rating, updateRating } = usePropertyReportStore();

  return (
    <View style={styles.container}>
      <Text>Current Rating: {rating.toFixed(1)}</Text>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={10}
        step={0.1}
        value={rating}
        onValueChange={updateRating}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  slider: { height: 40 },
});
```

## Example 4: Calculate Rating from Multiple Scores

```jsx
import { usePropertyReportStore } from './store/propertyReportStore';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function RatingCalculator() {
  const { calculateRating } = usePropertyReportStore();

  const handleCalculate = () => {
    calculateRating({
      locationScore: 8.5,      // Location quality
      amenitiesScore: 7.8,     // Amenities available
      priceScore: 8.2,         // Price competitiveness
      developmentScore: 7.5,   // Developer reputation
    });
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleCalculate}>
      <Text style={styles.buttonText}>Calculate Rating</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#F1FE74',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#0F1115',
    fontWeight: '600',
  },
});
```

## Example 5: Update Payment Timeline Dynamically

```jsx
import { usePropertyReportStore } from './store/propertyReportStore';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function TimelineUpdater() {
  const { syncPaymentTimeline } = usePropertyReportStore();

  const handleUpdateTimeline = () => {
    const newTimeline = [
      { date: 'Jan 26', step: 1, percent: 10, amount: 119701, status: 'green' },
      { date: 'Feb 26', step: 2, percent: 20, amount: 119701, status: 'green' },
      { date: 'Mar 26', step: 3, percent: 30, amount: 119701, status: 'default' },
      { date: 'Apr 26', step: 4, percent: 40, amount: 119701, status: 'default' },
      { date: 'May 26', step: 5, percent: 50, amount: 119701, status: 'default' },
      { date: 'Jun 26', step: 6, percent: 60, amount: 119701, status: 'default' },
      { date: 'Jul 26', step: 7, percent: 80, amount: 119701, status: 'key' },
      { date: 'Aug 26', step: 8, percent: 100, amount: 119701, status: 'flag' },
    ];

    syncPaymentTimeline(newTimeline);
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleUpdateTimeline}>
      <Text style={styles.buttonText}>Update Timeline</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#F1FE74',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#0F1115',
    fontWeight: '600',
  },
});
```

## Example 6: Access and Display PDF Data

```jsx
import { usePropertyReportStore } from './store/propertyReportStore';
import { View, Text, StyleSheet } from 'react-native';

export default function DataDisplay() {
  const pdfData = usePropertyReportStore((state) => state.getPdfData());

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Property Information</Text>

      <Text style={styles.label}>Project:</Text>
      <Text style={styles.value}>{pdfData.propertyDetails.projectName}</Text>

      <Text style={styles.label}>Price:</Text>
      <Text style={styles.value}>
        AED {pdfData.propertyDetails.price.toLocaleString()}
      </Text>

      <Text style={styles.label}>Rating:</Text>
      <Text style={styles.value}>{pdfData.rating.toFixed(1)}/10</Text>

      <Text style={styles.label}>Total Installments:</Text>
      <Text style={styles.value}>{pdfData.paymentTimeline.length}</Text>

      <Text style={styles.label}>Net Total:</Text>
      <Text style={styles.value}>
        AED {pdfData.breakdown.netTotal.toLocaleString()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 20, fontWeight: '600', marginBottom: 16, color: '#FFF' },
  label: { fontSize: 12, color: '#9CA3AF', marginTop: 12 },
  value: { fontSize: 14, color: '#FFF', fontWeight: '600' },
});
```

## Example 7: Export PDF (Future Implementation)

```jsx
import { usePropertyReportStore } from './store/propertyReportStore';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function ExportPdf() {
  const pdfData = usePropertyReportStore((state) => state.getPdfData());

  const handleExportPdf = async () => {
    try {
      // Generate HTML from PDF data
      const html = generatePdfHtml(pdfData);

      // Create PDF
      const { uri } = await Print.printToFileAsync({ html });

      // Share PDF
      await Sharing.shareAsync(uri, {
        mimeType: 'application/pdf',
        dialogTitle: 'Share Property Report',
      });
    } catch (error) {
      console.error('Failed to export PDF:', error);
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleExportPdf}>
      <Text style={styles.buttonText}>Export as PDF</Text>
    </TouchableOpacity>
  );
}

const generatePdfHtml = (data) => {
  return `
    <html>
      <body>
        <h1>${data.propertyDetails.projectName}</h1>
        <p>Price: AED ${data.propertyDetails.price}</p>
        <p>Rating: ${data.rating}/10</p>
      </body>
    </html>
  `;
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#F1FE74',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#0F1115',
    fontWeight: '600',
  },
});
```

## Example 8: Real-Time Form Sync

```jsx
import { useState } from 'react';
import { usePropertyReportStore } from './store/propertyReportStore';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function RealTimeFormSync() {
  const { propertyDetails, updatePropertyDetails } = usePropertyReportStore();
  const [projectName, setProjectName] = useState(propertyDetails.projectName);

  const handleSave = () => {
    updatePropertyDetails({ projectName });
    // PDF updates automatically
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={projectName}
        onChangeText={setProjectName}
        placeholder="Project Name"
      />
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save & Update PDF</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: {
    backgroundColor: '#171A20',
    borderWidth: 1,
    borderColor: '#2A2E35',
    borderRadius: 8,
    padding: 12,
    color: '#FFF',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#F1FE74',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#0F1115',
    fontWeight: '600',
  },
});
```

## Example 9: Conditional Rendering Based on Rating

```jsx
import { usePropertyReportStore } from './store/propertyReportStore';
import { View, Text, StyleSheet } from 'react-native';

export default function RatingBadge() {
  const rating = usePropertyReportStore((state) => state.rating);

  const getRatingColor = () => {
    if (rating >= 8) return '#8DFF3F'; // Green
    if (rating >= 6) return '#F1FE74'; // Yellow
    return '#FF6B00'; // Orange
  };

  const getRatingLabel = () => {
    if (rating >= 8) return 'Excellent';
    if (rating >= 6) return 'Good';
    return 'Fair';
  };

  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: getRatingColor() },
      ]}
    >
      <Text style={styles.label}>{getRatingLabel()}</Text>
      <Text style={styles.rating}>{rating.toFixed(1)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0F1115',
  },
  rating: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F1115',
  },
});
```

## Example 10: Multi-Property Comparison

```jsx
import { usePropertyReportStore } from './store/propertyReportStore';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function PropertyComparison() {
  const { updatePropertyDetails, propertyDetails } = usePropertyReportStore();

  const properties = [
    {
      projectName: 'The Weave, JVC',
      builder: 'Al Ghurair',
      price: 1197013,
    },
    {
      projectName: 'Downtown Tower',
      builder: 'Emaar',
      price: 1500000,
    },
  ];

  const handleSelectProperty = (property) => {
    updatePropertyDetails(property);
  };

  return (
    <View style={styles.container}>
      {properties.map((property, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.card,
            propertyDetails.projectName === property.projectName &&
              styles.cardActive,
          ]}
          onPress={() => handleSelectProperty(property)}
        >
          <Text style={styles.projectName}>{property.projectName}</Text>
          <Text style={styles.builder}>{property.builder}</Text>
          <Text style={styles.price}>
            AED {property.price.toLocaleString()}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  card: {
    backgroundColor: '#171A20',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  cardActive: {
    borderColor: '#F1FE74',
  },
  projectName: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  builder: {
    color: '#9CA3AF',
    fontSize: 12,
    marginTop: 4,
  },
  price: {
    color: '#F1FE74',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
  },
});
```

## Tips & Best Practices

1. **Always use store actions** - Don't modify state directly
2. **Batch updates** - Update multiple fields at once when possible
3. **Validate data** - Check data before updating store
4. **Handle errors** - Wrap API calls in try-catch
5. **Use selectors** - Use `usePropertyReportStore((state) => state.field)` for specific fields
6. **Memoize components** - Use React.memo for performance
7. **Test updates** - Verify PDF updates after form changes
8. **Cache data** - Store API responses locally to reduce requests
