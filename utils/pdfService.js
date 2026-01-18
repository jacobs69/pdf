// Alternative PDF service with images (simplified approach)
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

const formatDate = () => {
  try {
    return new Date().toLocaleDateString("en-GB");
  } catch {
    return "";
  }
};

const safeNumber = (v, fallback = 0) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
};

const generateHTMLTemplate = (project = {}, projectDetails = {}) => {
  const currentDate = formatDate();
  const TIMELINE_DATA = [
    { date: "Oct 25", step: 1, percent: "5%", amount: "61,250", status: "default" },
    { date: "Nov 25", step: 2, percent: "15%", amount: "183,750", status: "default" },
    { date: "Jan 26", step: 3, percent: "25%", amount: "122,500", status: "default" },
    { date: "Jan 26", step: 4, percent: "35%", amount: "122,500", status: "green" },
    { date: "Jan 26", step: 5, percent: "45%", amount: "122,500", status: "green" },
    { date: "Jan 26", step: 6, percent: "55%", amount: "122,500", status: "green" },
    { date: "Jan 26", step: 7, percent: "65%", amount: "122,500", status: "key" },
    { date: "Jan 26", step: 8, percent: "100%", amount: "122,500", status: "flag" },
  ];

  const projectName = project?.projectName || "The Weave";
  const location = project?.location || "JVC";
  const developer = project?.developer || "Al Ghurair";
  const price = safeNumber(project?.price, 1197013);
  const areaSqFt = safeNumber(project?.areaSqFt, 776);
  const pricePerSqFt = Math.round(price / (areaSqFt || 1));
  const rating = projectDetails?.rating || "7.5";

  // For now, we'll use CSS styling instead of loading images to avoid path issues
  // TODO: Add proper image loading later

  // For now, use CSS styling instead of loading images to avoid bundling issues
  // The preview will show images, but PDF will use styled elements

  // Generate exit strategies table
  const exitStrategiesTable = ["stp", "mtp", "ltp"].map((key) => {
    const title = key === "stp" ? "Short Term Potential" : key === "mtp" ? "Medium Term Potential" : "Long Term Potential";
    const moderate = projectDetails?.exitStrategies?.[key]?.moderate || {};
    const conservative = projectDetails?.exitStrategies?.[key]?.conservative || {};
    const optimistic = projectDetails?.exitStrategies?.[key]?.optimistic || {};
    
    return `
      <div class="table-row">
        <div class="table-left">
          <div class="table-title">${title}</div>
        </div>
        <div class="table-col">
          <div class="percent">${moderate.percent || "25.46%"}</div>
          <div class="amount">${moderate.val || "137,24,000"}</div>
        </div>
        <div class="table-col">
          <div class="percent">${conservative.percent || "7.87%"}</div>
          <div class="amount">${conservative.val || "42,42,000"}</div>
        </div>
        <div class="table-col">
          <div class="percent">${optimistic.percent || "34.46%"}</div>
          <div class="amount">${optimistic.val || "185,75,000"}</div>
        </div>
      </div>
    `;
  }).join("");

  // Generate timeline rows with dots and dotted lines
  const timelineRows = TIMELINE_DATA.map((item, index) => {
    const isKey = item.status === "key";
    const isFlag = item.status === "flag";
    const isGreen = item.status === "green";
    const isLast = index === TIMELINE_DATA.length - 1;
    
    let dateDisplay = item.date;
    if (isKey) dateDisplay += " 🔑";
    if (isFlag) dateDisplay += " 🏁";
    
    let dotHtml = '';
    if (isGreen) {
      dotHtml = '<div class="timeline-dot timeline-dot-green"></div>';
    } else if (isKey) {
      dotHtml = '<div class="timeline-icon">🔑</div>';
    } else if (isFlag) {
      dotHtml = '<div class="timeline-icon">🏁</div>';
    } else {
      dotHtml = '<div class="timeline-dot timeline-dot-gray"></div>';
    }
    
    return `
      <div class="timeline-row">
        <div class="timeline-date">${dateDisplay}</div>
        <div class="timeline-dot-col">
          ${dotHtml}
          ${!isLast ? '<div class="timeline-dotted-line"></div>' : ''}
        </div>
        <div class="timeline-percent">${item.percent}</div>
        <div class="timeline-amount">${item.amount}</div>
      </div>
    `;
  }).join("");

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Property Report - ${projectName}</title>
      <style>
        @page { size: A4; margin: 0; }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          font-family: Arial, sans-serif;
          background-color: #181A20;
          color: #FFFFFF;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        .page {
          width: 210mm;
          height: 297mm;
          padding: 24px;
          background-color: #181A20;
          position: relative;
          page-break-after: always;
          overflow: hidden;
        }
        .page:last-child { page-break-after: auto; }
        
        /* Page 1 - Disclaimer */
        .disclaimer-page {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .center-block {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding-top: 20px;
        }
        .logo-image {
          width: 130px;
          height: 130px;
          border-radius: 65px;
          margin-bottom: 20px;
        }
        .person-card {
          background: linear-gradient(135deg, #555C72, #240B36);
          border-radius: 16px;
          padding: 20px;
          margin-top: 30px;
          display: flex;
          align-items: center;
          width: 95%;
          max-width: 360px;
          min-height: 140px;
        }
        .person-image {
          width: 60px;
          height: 60px;
          border-radius: 30px;
          margin-right: 16px;
        }
        .person-info { flex: 1; text-align: left; }
        .person-name {
          color: #FFFFFF;
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 6px;
        }
        .email-row { display: flex; align-items: center; gap: 8px; }
        .person-email {
          color: rgba(255, 255, 255, 0.9);
          font-size: 14px;
        }
        .disclaimer-block {
          padding-bottom: 20px;
          width: 100%;
        }
        .disclaimer-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 10px;
        }
        .disclaimer-title {
          color: rgba(255, 255, 255, 0.75);
          font-size: 24px;
          font-weight: 400;
        }
        .disclaimer-text {
          color: rgba(255, 255, 255, 0.75);
          font-size: 12px;
          line-height: 1.5;
        }
        
        /* Header */
        .header-gradient {
          background: linear-gradient(135deg, rgba(255,255,255,0.4), rgba(24,26,32,0.7));
          padding: 20px;
          margin: -24px -24px 20px -24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .header-title { font-size: 20px; font-weight: 600; }
        .header-sub { color: #9CA3AF; font-size: 10px; margin-top: 4px; }
        .logo-small { display: flex; align-items: center; }
        .logo-circle {
          width: 22px; height: 22px; border-radius: 11px;
          background-color: #FF6B00;
          display: flex; align-items: center; justify-content: center;
          margin-right: 6px;
          font-weight: bold; font-size: 12px;
        }
        .logo-text { font-size: 14px; font-weight: 600; }
        .center-block-report { text-align: center; }
        .property-name { color: #F1FE74; font-size: 22px; font-weight: 600; margin-top: 20px; }
        .builder { color: #9CA3AF; font-size: 13px; margin-top: 4px; }
        .price-container { display: flex; align-items: center; justify-content: center; margin-top: 16px; }
        .dirham-icon { width: 24px; height: 24px; margin-right: 8px; }
        .price { font-size: 26px; font-weight: 700; }
        .rating-row { display: flex; align-items: center; margin: 30px 0; }
        .rating-container {
          width: 54px; height: 54px; margin-right: 16px;
          position: relative; display: flex; align-items: center; justify-content: center;
        }
        .rating-circle-background {
          position: absolute;
          width: 54px; height: 54px; border-radius: 27px;
          border: 4px solid #5E6272;
        }
        .rating-circle-progress {
          position: absolute;
          width: 54px; height: 54px; border-radius: 27px;
          border: 4px solid transparent;
          border-top-color: #F1FE74;
          border-right-color: #F1FE74;
          border-bottom-color: #F1FE74;
          transform: rotate(135deg);
        }
        .rating-circle-inner {
          width: 46px; height: 46px; border-radius: 23px;
          background-color: #0F1115;
          display: flex; align-items: center; justify-content: center;
          z-index: 1;
        }
        .rating-text { font-weight: bold; font-size: 16px; }
        .rating-desc { color: #F5F5F5; font-size: 13px; flex: 1; line-height: 1.4; }
        .section-title { font-size: 20px; font-weight: 600; margin: 30px 0 16px 0; }
        .details-row { display: flex; justify-content: space-between; margin-bottom: 20px; gap: 8px; }
        .detail-item { text-align: center; flex: 1; }
        .detail-value { font-size: 14px; font-weight: 600; }
        .detail-sub { font-size: 14px; margin-top: 6px; }
        .exit-strategies-card { background-color: #27292D; border-radius: 14px; padding: 16px; margin-top: 12px; }
        .exit-tabs { display: flex; justify-content: space-between; margin-bottom: 12px; }
        .exit-tab { font-size: 12px; font-weight: 900; color: #FFFFFF; }
        .exit-tab.active { color: #F1FE74; }
        .strategies-table { border-top: 1px solid #2A2E35; }
        .table-row { display: flex; padding: 14px 0; border-bottom: 1px solid #2A2E35; gap: 10px; }
        .table-left { flex: 1.4; }
        .table-title { font-size: 13px; font-weight: 500; }
        .table-col { flex: 1.3; text-align: right; }
        .percent { color: rgba(255, 255, 255, 0.75); font-size: 14px; }
        .amount { font-size: 14px; margin-top: 4px; font-weight: 500; }
        
        /* Timeline */
        .timeline-title { font-size: 22px; font-weight: 600; text-align: center; margin: 20px 0 30px 0; }
        .legend-row { display: flex; justify-content: center; gap: 20px; margin-bottom: 24px; }
        .legend-item { display: flex; align-items: center; gap: 6px; }
        .legend-dot { width: 10px; height: 10px; border-radius: 5px; }
        .legend-text { color: rgba(245, 245, 245, 0.75); font-size: 12px; }
        .timeline-header { display: flex; padding-bottom: 10px; border-bottom: 1px solid #1E2128; margin-bottom: 10px; }
        .timeline-header-text { color: rgba(245, 245, 245, 0.75); font-size: 15px; font-weight: 600; }
        .timeline-row { display: flex; align-items: center; padding: 14px 0; gap: 25px; position: relative; }
        .timeline-date { flex: 2; color: #C9CCD1; font-size: 13px; }
        .timeline-dot-col { width: 24px; display: flex; justify-content: center; position: relative; }
        .timeline-dot { width: 10px; height: 10px; border-radius: 5px; z-index: 2; }
        .timeline-dot-gray { background-color: #A3A6AD; }
        .timeline-dot-green { background-color: #8DFF3F; }
        .timeline-icon { width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; color: #FFFFFF; font-size: 14px; z-index: 2; }
        .timeline-dotted-line { position: absolute; left: 50%; top: 24px; width: 1px; height: 36px; border-left: 1px dashed #3A3D45; z-index: 1; }
        .timeline-percent { flex: 2; color: #C9CCD1; font-size: 13px; }
        .timeline-amount { flex: 1; color: #C9CCD1; font-size: 13px; text-align: right; }
      </style>
    </head>
    <body>
      <!-- Page 1 -->
      <div class="page disclaimer-page">
        <div class="center-block">
          <div class="logo-image" style="background-color: #FF6B00; display: flex; align-items: center; justify-content: center; color: #FFFFFF; font-size: 24px; font-weight: bold;">L</div>
          
          <div class="person-card">
            <div class="person-image" style="background-color: #FF6B00; display: flex; align-items: center; justify-content: center; color: #FFFFFF; font-weight: bold; font-size: 20px;">AG</div>
            <div class="person-info">
              <div class="person-name">Arpit Aryan Gupta</div>
              <div class="email-row">
                <span>✉</span>
                <span class="person-email">arpit@liyantis.com</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="disclaimer-block">
          <div class="disclaimer-header">
            <span class="disclaimer-title">Disclaimer</span>
            <span style="color:#9CA3AF;">ℹ</span>
          </div>
          <div class="disclaimer-text">
            All investment figures, estimates, and projections presented here are based on data available at the time of preparation and are subject to change due to market conditions, developer revisions, or agent assessment. Liyantis shall not be held responsible for any financial decisions made solely based on this report.
          </div>
        </div>
      </div>
      
      <!-- Page 2 -->
      <div class="page">
        <div class="header-gradient">
          <div>
            <div class="header-title">Property report</div>
            <div class="header-sub">generated by Arpit Aryan Gupta on ${currentDate}</div>
          </div>
          <div class="logo-small">
            <div class="logo-circle">L</div>
            <span class="logo-text">LIYANTIS</span>
          </div>
        </div>
        
        <div class="center-block-report">
          <div class="property-name">${projectName}, ${location}</div>
          <div class="builder">by ${developer}</div>
          <div class="price-container">
            <span style="font-size: 26px; font-weight: 700; margin-right: 8px;">د.إ</span>
            <span class="price">${price.toLocaleString()}.00</span>
          </div>
        </div>
        
        <div class="rating-row">
          <div class="rating-container">
            <div class="rating-circle-background"></div>
            <div class="rating-circle-progress"></div>
            <div class="rating-circle-inner">
              <div class="rating-text">${rating}</div>
            </div>
          </div>
          <div class="rating-desc">
            The final project rating is an aggregate score calculated from all the individual parameters assessed by the agent.
          </div>
        </div>
        
        <div class="section-title">Property details</div>
        <div class="details-row">
          <div class="detail-item">
            <div class="detail-value">🏠 Apartment</div>
          </div>
          <div class="detail-item">
            <div class="detail-value">🛏 ${project?.bedrooms || 1}</div>
          </div>
          <div class="detail-item">
            <div class="detail-value">${areaSqFt} ft²</div>
            <div class="detail-sub">Area</div>
          </div>
          <div class="detail-item">
            <div class="detail-value">${pricePerSqFt}</div>
            <div class="detail-sub">Price/ft²</div>
          </div>
        </div>
        
        <div class="exit-strategies-card">
          <div class="exit-tabs">
            <span class="exit-tab active">Exit Strategies</span>
            <span class="exit-tab">Moderate</span>
            <span class="exit-tab">Conservative</span>
            <span class="exit-tab">Optimistic</span>
          </div>
          <div class="strategies-table">
            ${exitStrategiesTable}
          </div>
        </div>
      </div>
      
      <!-- Page 3 -->
      <div class="page">
        <div class="header-gradient">
          <div>
            <div class="header-title">Property report</div>
            <div class="header-sub">generated by Arpit Aryan Gupta on ${currentDate}</div>
          </div>
          <div class="logo-small">
            <div class="logo-circle">L</div>
            <span class="logo-text">LIYANTIS</span>
          </div>
        </div>
        
        <div class="timeline-title">Payment Timeline</div>
        
        <div class="legend-row">
          <div class="legend-item">
            <div class="legend-dot" style="background-color:#8DFF3F;"></div>
            <span class="legend-text">Flip Ready</span>
          </div>
          <div class="legend-item">
            <span class="legend-text">🔑 Handover</span>
          </div>
          <div class="legend-item">
            <span class="legend-text">🏁 Last Installment</span>
          </div>
        </div>
        
        <div class="timeline-header">
          <div class="timeline-header-text" style="flex:2;">Date</div>
          <div class="timeline-header-text" style="flex:2;">Installments%</div>
          <div class="timeline-header-text" style="flex:1; text-align:right;">Amount</div>
        </div>
        
        ${timelineRows}
      </div>
    </body>
    </html>
  `;
};

// Main function
function generateProjectPDF(project, projectDetails) {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('=== PDF SERVICE START ===');
      
      const html = generateHTMLTemplate(project, projectDetails);
      console.log('HTML generated, length:', html.length);
      
      const result = await Print.printToFileAsync({
        html,
        base64: false,
      });
      
      console.log('PDF created:', result.uri);
      
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(result.uri, {
          mimeType: "application/pdf",
          dialogTitle: "Share Property Report",
        });
        console.log('PDF shared successfully');
        resolve(result.uri);
      } else {
        reject(new Error('Sharing not available'));
      }
    } catch (error) {
      console.error('PDF Service Error:', error);
      reject(error);
    }
  });
}

// Export
export { generateProjectPDF };
export default { generateProjectPDF };