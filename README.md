# React Native PDF Generation

A comprehensive PDF generation solution for React Native using `expo-print` and `expo-sharing`.

## 🚀 Features

- **3-Page PDF Layout** - Professional property report design
- **Real-time Preview** - See exactly what the PDF will look like
- **Timeline Visualization** - Interactive dots and dotted lines
- **Direct Sharing** - Share to WhatsApp, Email, and other apps
- **Dark Theme Design** - Modern LIYANTIS branding
- **Mobile Optimized** - Works on iOS and Android

## 📱 Screenshots

### PDF Preview Modal
- Page 1: Disclaimer with agent info
- Page 2: Property details and exit strategies  
- Page 3: Payment timeline with visual indicators

### Timeline Features
- ✅ Green dots for flip-ready milestones
- 🔑 Key emoji for handover dates
- 🏁 Flag emoji for final payments
- Dotted lines connecting timeline items

## 🛠 Installation

### Dependencies
```bash
npm install expo-print expo-sharing expo-asset
```

### Required Packages
```json
{
  "expo-print": "~15.0.8",
  "expo-sharing": "~14.0.8",
  "expo-asset": "^12.0.12"
}
```

## 📂 File Structure

```
├── components/
│   ├── PdfModal.jsx              # Main PDF modal component
│   └── pdf/
│       ├── PropertyPdf.jsx       # PDF preview component
│       ├── PropertyReport.jsx    # Property details section
│       ├── PaymentTimeline.jsx   # Timeline visualization
│       ├── ReportDisclaimer.jsx  # Disclaimer page
│       └── Breakdown.jsx         # Exit strategies breakdown
├── utils/
│   ├── pdfService.js            # PDF generation service
│   └── pdfGenerator.js          # Alternative PDF generator
└── assets/
    └── images/png/
        ├── L-logo.png           # LIYANTIS logo
        ├── pdf-profile.png      # Profile image
        └── dirhams.png          # Currency symbol
```

## 🔧 Usage

### Basic Implementation

```javascript
import PdfModal from './components/PdfModal';
import { generateProjectPDF } from './utils/pdfService';

// In your component
const [pdfModalVisible, setPdfModalVisible] = useState(false);

// Show PDF modal
<PdfModal
  visible={pdfModalVisible}
  onClose={() => setPdfModalVisible(false)}
  project={projectData}
  projectDetails={projectDetails}
/>

// Generate PDF directly
const handleGeneratePDF = async () => {
  try {
    await generateProjectPDF(projectData, projectDetails);
  } catch (error) {
    console.error('PDF generation failed:', error);
  }
};
```

### Project Data Structure

```javascript
const projectData = {
  projectName: "The Weave",
  location: "JVC",
  developer: "Al Ghurair",
  price: 1197013,
  bedrooms: 1,
  areaSqFt: 776
};

const projectDetails = {
  rating: "7.5",
  exitStrategies: {
    stp: {
      moderate: { percent: "25.46%", val: "137,24,000" },
      conservative: { percent: "7.87%", val: "42,42,000" },
      optimistic: { percent: "34.46%", val: "185,75,000" }
    }
    // ... mtp, ltp
  }
};
```

## 🎨 Customization

### Colors & Branding
```javascript
// Update colors in pdfService.js
const COLORS = {
  primary: '#FF6B00',      // LIYANTIS orange
  background: '#181A20',   // Dark background
  accent: '#F1FE74',       // Yellow accent
  text: '#FFFFFF'          // White text
};
```

### Timeline Configuration
```javascript
// Customize timeline data
const TIMELINE_DATA = [
  { date: "Oct 25", percent: "5%", amount: "61,250", status: "default" },
  { date: "Nov 25", percent: "15%", amount: "183,750", status: "green" },
  // Add more timeline items...
];
```

## 📋 PDF Content

### Page 1: Disclaimer
- Company logo and branding
- Agent contact information
- Legal disclaimer text
- Professional gradient design

### Page 2: Property Report
- Property name and location
- Developer information
- Price with currency symbol
- Rating visualization
- Property details (bedrooms, area, price/ft²)
- Exit strategies table (STP, MTP, LTP)

### Page 3: Payment Timeline
- Interactive timeline visualization
- Payment milestones with dates
- Percentage and amount breakdown
- Visual indicators for key dates

## 🔄 How It Works

1. **Preview Generation**: PropertyPdf.jsx renders the preview using React Native components
2. **HTML Template**: pdfService.js converts the design to HTML/CSS
3. **PDF Creation**: expo-print generates PDF from HTML string
4. **Sharing**: expo-sharing opens native share dialog

## 🐛 Troubleshooting

### Common Issues

**Image Loading Errors:**
- Ensure image files have no spaces in names
- Use correct relative paths from component location
- Check that assets are properly bundled

**PDF Generation Fails:**
- Verify expo-print and expo-sharing are installed
- Check HTML template syntax
- Ensure CSS is valid for PDF context

**Sharing Not Working:**
- Test on physical device (sharing may not work in simulator)
- Check platform permissions
- Verify expo-sharing compatibility

## 📱 Platform Support

- ✅ **iOS** - Full support with native sharing
- ✅ **Android** - Full support with native sharing  
- ⚠️ **Web** - PDF generation works, sharing limited

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with Expo and React Native
- Uses expo-print for PDF generation
- Inspired by modern property report designs
- LIYANTIS branding and design system