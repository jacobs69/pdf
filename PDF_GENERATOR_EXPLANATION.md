# PDF Generator - Complete Explanation

## Overview
The PDF generator converts project data into a professional 4-page PDF report using React Native's `expo-print` library. It builds HTML content and converts it to PDF format.

---

## Architecture Flow

```
User clicks "Download" in PdfModal
    ↓
generateProjectPDF() is called with project & projectDetails
    ↓
buildCompletePDFHTML() creates complete HTML string
    ↓
expo-print converts HTML → PDF file
    ↓
expo-sharing opens share dialog
    ↓
User saves/shares PDF
```

---

## Key Components

### 1. **Main Function: `generateProjectPDF()`**

```javascript
export const generateProjectPDF = async (project, projectDetails) => {
  try {
    const html = buildCompletePDFHTML(project, projectDetails);
    const { uri } = await Print.printToFileAsync({ html });
    
    await Sharing.shareAsync(uri, {
      mimeType: 'application/pdf',
      dialogTitle: `${project.projectName || 'Project'} Report`,
    });
    
    return uri;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};
```

**What it does:**
- Takes `project` (basic info) and `projectDetails` (ratings, area, etc.)
- Calls `buildCompletePDFHTML()` to create HTML
- Uses `expo-print.printToFileAsync()` to convert HTML → PDF
- Uses `expo-sharing.shareAsync()` to open native share dialog
- Returns the PDF file URI

---

### 2. **HTML Builder: `buildCompletePDFHTML()`**

This function extracts data and builds a complete HTML document with 4 pages.

#### **Data Extraction**

```javascript
const {
  projectName = 'Project',
  developer = 'N/A',
  location = 'N/A',
  price = 0,
  paymentPlan = {},
} = project;

const {
  rating = 0,
  bedrooms = 'N/A',
  area = {},
  exitStrategies = {},
  dld = 0,
  serviceCharge = 0,
} = projectDetails;
```

Uses destructuring with default values to safely extract data.

#### **Date Formatting**

```javascript
const formatDate = (inst) => {
  // If date already exists in YYYY-MM-DD format, use it
  if (inst.date) {
    return inst.date;
  }
  // Otherwise, construct from month/year
  const monthMap = {
    'Jan': '01', 'Feb': '02', 'Mar': '03', ...
  };
  if (!inst.month || !inst.year) return 'N/A';
  const monthNum = monthMap[inst.month] || '01';
  return `${inst.year}-${monthNum}-01`;
};
```

**Handles two data formats:**
- Default projects: `date: "2026-01-26"` (already formatted)
- Form-created projects: `month: "Jan", year: "2026"` (needs conversion)

---

### 3. **Timeline Generation**

```javascript
const timelineRowsHTML = installments
  .map((inst, idx) => {
    const stageType = inst.stage || inst.type || 'During Construction';
    const isCompleted = stageType === 'On Handover' || stageType === 'Post Handover' || stageType === 'Handover';
    const isKeyDate = stageType === 'Down Payment' || stageType === 'On Handover';
    const amount = (parseInt(inst.percent) * price / 100).toLocaleString();
    const date = formatDate(inst);
    
    return `
      <div class="timeline-row-item">
        <div class="timeline-date-col">${date}</div>
        <div class="timeline-line-col">
          <div class="timeline-dot ${isCompleted ? 'completed' : isKeyDate ? 'key-date' : 'pending'}">
            ${isKeyDate && !isCompleted ? '🚩' : ''}
          </div>
          ${idx < installments.length - 1 ? '<div class="timeline-line"></div>' : ''}
        </div>
        <div class="timeline-percent-col">${inst.percent}%</div>
        <div class="timeline-amount-col">AED ${amount}</div>
      </div>
    `;
  })
  .join('');
```

**For each installment:**
1. Determines stage type (Down Payment, During Construction, On Handover, etc.)
2. Checks if completed (green dot) or key date (flag emoji)
3. Calculates amount: `(percentage × price) / 100`
4. Formats date using `formatDate()`
5. Adds dotted line between items (except last one)
6. Returns HTML string for that row

---

## HTML Structure (4 Pages)

### **Page 1: Disclaimer**
```html
<div class="page disclaimer-page">
  <div class="center-block">
    <div class="brand-text">LIYANTIS</div>
  </div>
  <div class="disclaimer-block">
    <div class="disclaimer-header">
      <span class="disclaimer-icon">⚠️</span>
      <div class="disclaimer-title">Disclaimer</div>
    </div>
    <div class="disclaimer-text">
      All investment figures, estimates, and projections...
    </div>
  </div>
</div>
```

**Purpose:** Legal disclaimer about the report

---

### **Page 2: Property Report**
```html
<div class="page">
  <div class="header">
    <h2>Property Report</h2>
    <div class="logo-container">L LIYANTIS</div>
  </div>
  
  <div class="center-content">
    <div class="property-name">${projectName}</div>
    <div class="builder">by ${developer}</div>
    <div class="price">AED ${price}mn</div>
  </div>
  
  <div class="rating-section">
    <div class="rating-circle">${rating}</div>
    <div class="rating-desc">Rating explanation...</div>
  </div>
  
  <div class="details-grid">
    <!-- Bedrooms, Area, Location -->
  </div>
  
  <div class="card">
    <!-- Exit Strategies Table -->
  </div>
</div>
```

**Contains:**
- Project name, developer, price
- Overall rating (1-10 scale)
- Property details (bedrooms, area, location)
- Exit strategies (STP, MTP, LTP)

---

### **Page 3: Payment Timeline**
```html
<div class="page">
  <div class="timeline-title">Payment Timeline</div>
  
  <div class="legend">
    <!-- Legend: Completed, Pending, Key Date -->
  </div>
  
  <div class="timeline-container">
    <div class="timeline-header">
      <div class="timeline-header-date">Date</div>
      <div class="timeline-header-line"></div>
      <div class="timeline-header-percent">%</div>
      <div class="timeline-header-amount">Amount</div>
    </div>
    ${timelineRowsHTML}  <!-- Generated timeline rows -->
  </div>
</div>
```

**Contains:**
- Header row with column labels
- Legend explaining dot colors and flags
- Timeline with dates, percentages, amounts
- Vertical dotted line with colored dots

---

### **Page 4: Breakdown**
```html
<div class="page">
  <div class="breakdown-title">Breakdown</div>
  <div class="breakdown-card">
    <div class="breakdown-header">
      <div class="breakdown-header-left">Details</div>
      <div class="breakdown-header-right">AED</div>
    </div>
    
    <div class="breakdown-row">
      <div class="breakdown-row-left">Property Price</div>
      <div class="breakdown-row-right">${price}mn</div>
    </div>
    
    <div class="breakdown-row">
      <div class="breakdown-row-left">DLD (4%)</div>
      <div class="breakdown-row-right">${dld}k</div>
    </div>
    
    <div class="breakdown-row">
      <div class="breakdown-row-left">Service Charges/Sq Ft</div>
      <div class="breakdown-row-right">AED ${serviceCharge}</div>
    </div>
    
    <div class="breakdown-net">
      <div class="breakdown-net-left">Net Total</div>
      <div class="breakdown-net-right">${netTotal}mn</div>
    </div>
  </div>
</div>
```

**Contains:**
- Property price
- DLD (Dubai Land Department) fees
- Service charges
- Net total calculation

---

## CSS Styling

The HTML includes comprehensive CSS for:

### **Page Layout**
- A4 size: 210mm × 297mm
- Padding: 15mm on all sides
- Dark theme: #0F1115 background

### **Typography**
- Primary color: #F1FE74 (yellow)
- Text color: #FFFFFF (white)
- Secondary text: #9CA3AF (gray)

### **Timeline Styling**
- Dots: 12px circles (gray, green for completed, transparent for key dates)
- Dotted line: 2px width with 3px/6px pattern
- Compact spacing: 12px between rows, 8px gaps

### **Cards & Sections**
- Background: #27292D (dark gray)
- Borders: 1px solid #3A3D45
- Border radius: 10px

---

## Data Flow Example

**User clicks Download:**

```
Dashboard.jsx
  ↓
PdfModal.jsx (handleDownloadPDF)
  ↓
generateProjectPDF(project, projectDetails)
  ↓
buildCompletePDFHTML()
  ├─ Extracts: projectName, developer, price, installments, etc.
  ├─ Formats dates: "Jan 2026" → "2026-01-01"
  ├─ Calculates amounts: (10% × 1,225,000) = 122,500
  ├─ Builds timeline HTML with dots and lines
  └─ Returns complete 4-page HTML string
  ↓
expo-print.printToFileAsync(html)
  ├─ Renders HTML in native print engine
  ├─ Converts to PDF format
  └─ Returns file URI
  ↓
expo-sharing.shareAsync(uri)
  ├─ Opens native share dialog
  └─ User can save/email/share PDF
```

---

## Key Features

✅ **Responsive Data Handling**
- Handles both default projects and form-created projects
- Safe defaults for missing data

✅ **Professional Design**
- Dark theme with accent colors
- Proper typography hierarchy
- Consistent spacing and alignment

✅ **Compact Layout**
- Optimized for A4 page fit
- Scales timeline based on number of installments
- Readable font sizes

✅ **Dynamic Content**
- Timeline rows generated from installments array
- Calculations done in real-time
- Dates formatted correctly

✅ **Cross-Platform**
- Works on iOS and Android
- Uses native print/share APIs
- Consistent PDF output

---

## Libraries Used

| Library | Purpose |
|---------|---------|
| `expo-print` | Converts HTML to PDF |
| `expo-sharing` | Opens native share dialog |

---

## Summary

The PDF generator is a **data-to-PDF pipeline** that:
1. Receives project data
2. Builds complete HTML with CSS styling
3. Converts HTML to PDF using native APIs
4. Shares PDF with user

It's efficient, professional, and handles all edge cases with proper data formatting and validation.
