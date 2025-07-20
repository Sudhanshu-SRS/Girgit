# Generative AI Research Platform

A comprehensive MERN stack research platform for exploring and documenting the applications of Generative AI in Healthcare and Education. This platform serves as a repository for case studies, research data, analytics, and insights into how AI is transforming these critical sectors.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Authentication](#authentication)
- [Contributing](#contributing)
- [License](#license)

## 🌟 Overview

This research platform was developed as part of an MCA 1st Year, Semester II project by **Gargee Purwar** to study and document the impact of Generative AI applications in Healthcare and Education sectors. The platform provides:

- **Healthcare AI Applications**: Case studies on medical diagnosis, drug discovery, patient care, and medical imaging
- **Education AI Applications**: Research on personalized learning, content creation, assessment, and tutoring systems
- **Research Hub**: Comprehensive research papers, methodologies, and findings
- **Analytics Dashboard**: Data visualization and trend analysis
- **User Management**: Role-based access for students, educators, healthcare professionals, and researchers

## ✨ Features

### Core Features

- 🏥 **Healthcare AI Applications Management**
- 🎓 **Education AI Applications Catalog**
- 📊 **Advanced Analytics and Visualization**
- 🔬 **Research Data Repository**
- 🔐 **User Authentication & Authorization**
- 🌙 **Dark/Light Theme Support**
- 📱 **Responsive Design**

### Healthcare Features

- Case study documentation with impact metrics
- AI technology categorization (GPT, CNN, RNN, Transformer, GAN)
- Implementation status tracking (Research, Pilot, Deployed, Widespread)
- Ethical considerations and bias analysis
- Data privacy compliance tracking

### Education Features

- Personalized learning system documentation
- Accessibility features tracking
- Target audience segmentation
- Subject-wise categorization
- Engagement and learning improvement metrics

### Research Features

- Research methodology documentation
- Author and affiliation management
- Publication status tracking
- Ethical considerations documentation
- Future research directions

## 🛠 Tech Stack

### Frontend

- **React.js** (v18.2.0) - UI Framework
- **React Router DOM** (v6.3.0) - Navigation
- **Axios** (v1.4.0) - HTTP Client
- **CSS3** - Styling with custom properties
- **Chart.js** & **React-ChartJS-2** - Data Visualization
- **Material-UI** (v5.10.0) - UI Components

### Backend

- **Node.js** - Runtime Environment
- **Express.js** (v4.18.2) - Web Framework
- **MongoDB** - Database
- **Mongoose** (v7.6.3) - ODM

### Security & Middleware

- **JWT** (v9.0.2) - Authentication
- **bcryptjs** (v2.4.3) - Password Hashing
- **Helmet** (v7.1.0) - Security Headers
- **CORS** (v2.8.5) - Cross-Origin Resource Sharing
- **Morgan** (v1.10.0) - Logging

### Development Tools

- **Nodemon** (v3.0.1) - Development Server
- **Concurrently** (v8.2.2) - Concurrent Scripts
- **dotenv** (v16.3.1) - Environment Variables

## 📁 Project Structure

```
Girgit/
├── client/                 # React Frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   └── Navbar.css
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── Healthcare.js
│   │   │   ├── Education.js
│   │   │   ├── Research.js
│   │   │   ├── Analytics.js
│   │   │   └── Auth.js
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
├── server/                 # Node.js Backend
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   ├── HealthcareData.js
│   │   ├── EducationData.js
│   │   └── ResearchData.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── healthcare.js
│   │   ├── education.js
│   │   └── research.js
│   ├── seedData.js
│   ├── server.js
│   └── package.json
├── package.json            # Root package.json
├── .gitignore
└── README.md
```

## 🚀 Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

### Clone Repository

```bash
git clone https://github.com/your-username/generative-ai-research-platform.git
cd generative-ai-research-platform
```

### Install Dependencies

```bash
# Install root dependencies
npm install

# Install all dependencies (client + server)
npm run install-deps
```

### Alternative Individual Installation

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

## ⚙ Configuration

### Environment Variables

Create a `.env` file in the [`server`](server) directory:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/generative-ai-app

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key

# Server Configuration
PORT=5000
NODE_ENV=development

# Client URL (for CORS)
CLIENT_URL=http://localhost:3000
```

### MongoDB Setup

1. **Local MongoDB**: Start your local MongoDB service
2. **MongoDB Atlas**: Use your cloud connection string
3. **Docker**: Run MongoDB in a container

```bash
# Docker MongoDB (optional)
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

## 🎯 Usage

### Development Mode

```bash
# Start both client and server concurrently
npm run dev

# Or start individually:
npm run server  # Starts backend on http://localhost:5000
npm run client  # Starts frontend on http://localhost:3000
```

### Seed Database

```bash
# Populate database with sample data
cd server
npm run seed
```

This creates:

- **Admin User**: `gargee.purwar@example.com` / `password123`
- **Sample Healthcare Data**: 2 case studies
- **Sample Education Data**: 2 applications
- **Sample Research Data**: 1 research paper

### Production Build

```bash
# Build client for production
npm run build

# Start production server
cd server
npm start
```

## 📡 API Documentation

### Authentication Endpoints

#### Register User

```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "student",
  "profile": {
    "institution": "University Name",
    "specialization": "Computer Science",
    "yearsOfExperience": 2,
    "researchInterests": ["AI", "Machine Learning"]
  }
}
```

#### Login User

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Current User

```http
GET /api/auth/me
Authorization: Bearer <jwt-token>
```

### Healthcare Endpoints

#### Get Healthcare Data

```http
GET /api/healthcare?category=diagnosis&technology=CNN&status=deployed&page=1&limit=10
```

#### Get Healthcare Analytics

```http
GET /api/healthcare/analytics/overview
```

#### Create Healthcare Data (Protected)

```http
POST /api/healthcare
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "title": "AI-Powered Diagnosis System",
  "category": "diagnosis",
  "description": "Advanced AI system for medical diagnosis",
  "aiTechnology": "CNN",
  "implementationStatus": "deployed"
}
```

### Education Endpoints

#### Get Education Data

```http
GET /api/education?category=personalized_learning&audience=higher_education
```

#### Get Education Analytics

```http
GET /api/education/analytics/overview
```

### Research Endpoints

#### Get Research Data

```http
GET /api/research?methodology=mixed_methods&status=published
```

#### Get Research Analytics

```http
GET /api/research/analytics/overview
```

## 🗃 Database Schema

### User Model

```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  role: Enum ['student', 'educator', 'healthcare_professional', 'researcher', 'admin'],
  profile: {
    institution: String,
    specialization: String,
    yearsOfExperience: Number,
    researchInterests: [String]
  },
  preferences: {
    theme: Enum ['light', 'dark'],
    notifications: Boolean
  },
  timestamps: true
}
```

### Healthcare Data Model

```javascript
{
  title: String (required),
  category: Enum ['diagnosis', 'drug_discovery', 'medical_imaging', 'patient_care', 'research'],
  description: String (required),
  aiTechnology: Enum ['GPT', 'CNN', 'RNN', 'Transformer', 'GAN', 'Other'],
  caseStudy: {
    hospitalName: String,
    location: String,
    patientsImpacted: Number,
    accuracyImprovement: Number,
    timeReduction: Number,
    costSavings: Number
  },
  benefits: [String],
  challenges: [String],
  ethicalConcerns: [String],
  implementationStatus: Enum ['research', 'pilot', 'deployed', 'widespread'],
  dataPrivacyMeasures: [String],
  biasConsiderations: String,
  futureProspects: String,
  references: [String],
  tags: [String],
  createdBy: ObjectId (ref: User),
  timestamps: true
}
```

### Education Data Model

```javascript
{
  title: String (required),
  category: Enum ['personalized_learning', 'content_creation', 'assessment', 'tutoring', 'accessibility'],
  description: String (required),
  aiTechnology: Enum ['NLP', 'ML', 'Deep_Learning', 'Computer_Vision', 'Recommendation_Systems', 'Other'],
  caseStudy: {
    institutionName: String,
    location: String,
    studentsImpacted: Number,
    learningImprovement: Number,
    engagementIncrease: Number,
    teacherWorkloadReduction: Number
  },
  targetAudience: Enum ['primary', 'secondary', 'higher_education', 'professional', 'all'],
  subjects: [String],
  accessibilityFeatures: [String],
  personalizationLevel: Enum ['basic', 'intermediate', 'advanced'],
  implementationStatus: Enum ['research', 'pilot', 'deployed', 'widespread'],
  createdBy: ObjectId (ref: User),
  timestamps: true
}
```

### Research Data Model

```javascript
{
  title: String (required),
  abstract: String (required),
  authors: [{
    name: String,
    affiliation: String,
    email: String
  }],
  keywords: [String],
  methodology: Enum ['qualitative', 'quantitative', 'mixed_methods', 'systematic_review', 'meta_analysis'],
  findings: {
    keyResults: [String],
    statisticalSignificance: Boolean,
    limitations: [String],
    implications: [String]
  },
  ethicalConsiderations: {
    dataPrivacy: String,
    biasMitigation: String,
    transparency: String,
    accountability: String
  },
  status: Enum ['draft', 'under_review', 'published', 'rejected'],
  publicationDate: Date,
  journal: String,
  doi: String,
  createdBy: ObjectId (ref: User),
  timestamps: true
}
```

## 🔐 Authentication

The platform uses **JWT (JSON Web Tokens)** for authentication:

### Token Structure

- **Payload**: `{ userId, email, role }`
- **Expiration**: 7 days
- **Storage**: localStorage (client-side)

### Protected Routes

- `POST /api/healthcare` - Create healthcare data
- `PUT /api/healthcare/:id` - Update healthcare data
- `DELETE /api/healthcare/:id` - Delete healthcare data
- `POST /api/education` - Create education data
- `PUT /api/education/:id` - Update education data
- `DELETE /api/education/:id` - Delete education data
- `POST /api/research` - Create research data
- `PUT /api/research/:id` - Update research data
- `DELETE /api/research/:id` - Delete research data

### Authorization Levels

- **Admin**: Full access to all data
- **User**: Can create, update, and delete their own data
- **Guest**: Read-only access to public data

## 🎨 UI Features

### Theme Support

- **Light Mode**: Default clean interface
- **Dark Mode**: Eye-friendly dark theme
- **Persistent**: Theme preference saved in localStorage

### Responsive Design

- **Mobile-First**: Optimized for mobile devices
- **Tablet Support**: Adapted layouts for tablets
- **Desktop**: Full-featured desktop experience

### Interactive Elements

- **Hover Effects**: Smooth transitions and animations
- **Loading States**: User feedback during API calls
- **Error Handling**: User-friendly error messages
- **Form Validation**: Real-time input validation

## 📊 Analytics Features

### Healthcare Analytics

- Total healthcare AI cases
- Applications by category (diagnosis, drug discovery, etc.)
- Technology distribution (CNN, Transformer, etc.)
- Implementation status breakdown
- Impact metrics visualization

### Education Analytics

- Total education AI applications
- Category distribution (personalized learning, assessment, etc.)
- Target audience analysis
- Technology adoption trends
- Learning improvement metrics

### Research Analytics

- Research paper count by methodology
- Publication status distribution
- Keyword frequency analysis
- Author collaboration networks
- Citation impact analysis

## 🔧 Development

### Code Standards

- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting (if configured)
- **Modular Architecture**: Separated concerns and reusable components

### Testing

```bash
# Run client tests
cd client
npm test

# Run server tests (when implemented)
cd server
npm test
```

### Build Process

```bash
# Production build
npm run build

# Serves built files
npm start
```

## 🚀 Deployment

### Environment Setup

1. **Production MongoDB**: Set up MongoDB Atlas or dedicated server
2. **Environment Variables**: Configure production `.env`
3. **Build Process**: Run `npm run build`
4. **Server Deployment**: Deploy to Heroku, Digital Ocean, AWS, etc.

### Deployment Platforms

- **Frontend**: Netlify, Vercel, GitHub Pages
- **Backend**: Heroku, Railway, Digital Ocean
- **Database**: MongoDB Atlas, AWS DocumentDB

### Sample Deployment Commands

```bash
# Heroku deployment
heroku create your-app-name
git push heroku main

# Netlify (client build)
npm run build
# Upload build folder to Netlify
```

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Contribution Guidelines

- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass

## 📄 License

This project is licensed under the **MIT License** - see the LICENSE file for details.

## 👨‍💻 Author

**Gargee Purwar**  
MCA 1st Year, Semester II  
Research Focus: Generative AI Applications in Healthcare and Education

---

## 📞 Support

For support and questions:

- **Email**: gargee.purwar@example.com
- **GitHub Issues**: [Create an issue](../../issues)
- **Documentation**: See inline code comments

---

## 🙏 Acknowledgments

- Healthcare professionals who provided case study data
- Educational institutions for collaboration
- Open source community for tools and libraries
- Research community for methodological guidance

---

**Happy Coding! 🚀**
