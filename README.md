# Goa Police Evidence Analysis System

A professional, modern police-style web application built for the Goa Police Hackathon. This system provides comprehensive evidence analysis tools with AI-powered features for CCTV analysis, forensic media analysis, and automated report generation.

## Features

### 🔐 Authentication & Case Management
- Secure login with Case ID and Investigator Name
- Session management with localStorage
- Professional police-themed UI

### 📊 Dashboard
- Real-time case overview with statistics
- Quick access to all analysis tools
- Recent activity tracking
- System status monitoring

### 🤖 AI Evidence Analysis Tools
- **Face Detection**: Analyze faces in video footage and images
- **Number Plate Detection**: Extract vehicle information from traffic cameras
- File upload with progress tracking
- Results display with confidence scores and alerts
- Interactive timeline visualization

### 🔍 Forensic Media Analysis
- Upload and analyze photos/videos
- Comprehensive metadata extraction
- Tamper detection and authenticity verification
- GPS location tracking
- Device information analysis
- Search and filter capabilities

### 📋 Reports Generation
- Automated report generation
- Comprehensive evidence summaries
- Timeline reconstruction
- Integrity verification with SHA256 hashing
- Export to JSON and PDF formats
- Tamper-proof report validation

## Technology Stack

- **Frontend**: React 19, React Router
- **Styling**: Tailwind CSS with custom police theme
- **Icons**: Lucide React
- **Build Tool**: Vite
- **UI Components**: Custom shadcn/ui inspired components

## Design Features

- **Professional Police Theme**: Navy blue and gray color scheme
- **Dark Mode**: Optimized for low-light environments
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Accessibility**: Keyboard navigation and screen reader support
- **Modern UI**: Clean, minimal design with smooth animations

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Access the Application**
   - Open your browser to `http://localhost:5173`
   - Enter any Case ID and Investigator Name to start
   - Explore the different analysis tools

## Usage

### Starting a Case
1. Enter a Case ID (e.g., "CASE-2024-001")
2. Enter your name as the Investigator
3. Click "Start Case" to begin

### AI Analysis
1. Navigate to "CCTV Analysis"
2. Select Face Detection or Number Plate Detection
3. Upload your video/image file
4. Click "Start Analysis" to process
5. Review results in the table and timeline

### Forensic Analysis
1. Go to "Forensic Media Analysis"
2. Upload multiple media files
3. Review metadata and tamper detection results
4. Use search and filters to organize evidence

### Generating Reports
1. Visit the "Reports" page
2. Click "Generate Report" to create a comprehensive summary
3. Download in JSON or PDF format
4. Verify report integrity using the provided hash

## Security Features

- **Session Management**: Secure case data storage
- **Integrity Verification**: SHA256 hashing for all evidence
- **Tamper Detection**: Automated analysis of file authenticity
- **Professional UI**: Designed for official police use

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Development

The application is built with modern React patterns and is fully responsive. All components are modular and reusable, making it easy to extend with additional features.

## License

This project is developed for the Goa Police Hackathon and is intended for official police use.