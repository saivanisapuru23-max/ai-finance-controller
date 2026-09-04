# 💰 FinanceAI – AI Financial Controller

> **AI-powered financial intelligence platform for smarter business decisions.**

FinanceAI is an AI-powered financial controller that helps businesses analyze their financial performance, monitor cash flow, identify financial risks, and receive intelligent recommendations using **Gemini AI**.

---

## 🚀 Overview

Businesses generate large amounts of financial data through revenue, expenses, transactions, and cash flow. Understanding this data quickly and identifying potential financial risks can be challenging.

**FinanceAI** brings these financial metrics together in one professional dashboard and uses AI to convert financial data into meaningful insights and actionable recommendations.

---

## 🎯 Objectives

* Monitor overall business financial health
* Analyze revenue and expenses
* Calculate net profit and profit margin
* Track cash flow and cash position
* Identify potential financial risks
* Generate AI-powered financial insights
* Provide practical cost-saving recommendations
* Maintain a centralized financial dashboard

---

## ✨ Key Features

### 📊 Financial Dashboard

* Total Revenue
* Total Expenses
* Net Profit
* Cash Balance
* Financial Health Score
* Revenue vs Expenses visualization

### 💵 Revenue Analysis

Analyze business income and revenue performance through financial metrics and visualizations.

### 💸 Expense Analysis

Track expenses and understand spending patterns to identify areas that may require attention.

### 💰 Cash Flow Monitoring

Monitor cash position and understand the current financial condition of the business.

### ⚠️ Financial Risk Detection

Identify potential financial risks and classify the overall financial risk level.

### 🤖 Gemini AI Financial Analysis

FinanceAI uses Gemini AI to analyze financial data and generate:

* Financial summaries
* Key insights
* Risk assessment
* Cost-saving recommendations
* Business improvement suggestions

### 🧾 Transaction Management

* Add transactions
* View recent transactions
* Categorize income and expenses
* Delete transactions
* Automatically update financial metrics

### 📈 Reports & Insights

Generate financial insights and review important business metrics from a centralized dashboard.

---

## 🔄 System Workflow

```text
Financial Data
      ↓
Transaction Processing
      ↓
Revenue & Expense Calculation
      ↓
Financial Metrics
      ↓
Gemini AI Analysis
      ↓
Risk Detection
      ↓
AI Insights & Recommendations
      ↓
FinanceAI Dashboard
```

---

## 🧠 AI Analysis Flow

```text
Business Financial Data
        ↓
React Frontend
        ↓
Node.js + Express Backend
        ↓
Gemini AI
        ↓
Financial Analysis
        ↓
Structured AI Results
        ↓
Dashboard Visualization
```

---

## 🛠️ Tech Stack

| Technology   | Purpose                         |
| ------------ | ------------------------------- |
| React        | Frontend UI                     |
| Vite         | Frontend development/build tool |
| Node.js      | Backend runtime                 |
| Express.js   | REST API                        |
| Gemini AI    | Financial intelligence          |
| Recharts     | Data visualization              |
| Lucide React | UI icons                        |
| LocalStorage | Local data persistence          |
| CSS          | Responsive styling              |

---

## 🏗️ Project Structure

```text
ai-finance-controller/
│
├── src/
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
│
├── server/
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── public/
│
├── package.json
├── .gitignore
└── README.md
```

> **Note:** `server/.env` contains the Gemini API key and is intentionally excluded from GitHub.

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/saivanisapuru23-max/ai-finance-controller.git
cd ai-finance-controller
```

### 2. Install frontend dependencies

```bash
npm install
```

### 3. Install backend dependencies

```bash
cd server
npm install
```

### 4. Configure Gemini API

Create:

```text
server/.env
```

Add:

```env
GEMINI_API_KEY=YOUR_API_KEY
```

Never commit the `.env` file to GitHub.

### 5. Start the backend

Inside the `server` folder:

```bash
node server.js
```

Backend runs on:

```text
http://localhost:5000
```

### 6. Start the frontend

Open another terminal in the main project folder:

```bash
npm run dev
```

Frontend runs on the Vite development URL shown in the terminal.

---

## 🔐 Security

FinanceAI keeps the Gemini API key inside an environment variable instead of exposing it in frontend code.

The following file is excluded from Git tracking:

```text
server/.env
```

API credentials should never be committed to the repository.

---

## 📌 Financial Metrics

FinanceAI calculates important financial indicators including:

* **Net Profit**
* **Profit Margin**
* **Expense Ratio**
* **Cash Position**
* **Financial Health**
* **Financial Risk Level**

These metrics help provide a quick understanding of the business's financial condition.

---

## 🤖 Responsible AI

FinanceAI is designed as a **financial decision-support system**.

AI-generated insights and recommendations should be reviewed by a qualified human before making important financial or business decisions.

The system does not replace professional financial advice.

---

## 🚀 Future Enhancements

* Real-time financial data integration
* Database-backed transaction management
* Advanced financial forecasting
* AI-powered budget planning
* Automated financial reports
* Multi-business support
* User authentication and role-based access
* Cloud deployment
* Advanced anomaly detection
* Predictive cash-flow analysis

---

## 📸 Project Highlights

FinanceAI provides a professional financial command center with:

* Financial health monitoring
* Revenue and expense analytics
* AI-powered financial review
* Risk detection
* Cash-flow monitoring
* Transaction management
* AI recommendations
* Financial reports

---

## 🌟 Why FinanceAI?

FinanceAI combines **financial analytics + AI intelligence** into a single platform.

Instead of only displaying financial numbers, it helps users understand those numbers, identify potential risks, and discover opportunities for improvement.

---

## 👨‍💻 Project

**Project:** FinanceAI – AI Financial Controller
**Repository:** `ai-finance-controller`
**AI Engine:** Gemini AI
**Frontend:** React + Vite
**Backend:** Node.js + Express
