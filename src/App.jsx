import { useMemo, useState } from "react";
import {
  LayoutDashboard,
  TrendingUp,
  TrendingDown,
  Wallet,
  ShieldAlert,
  Sparkles,
  FileText,
  Settings,
  Plus,
  Search,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  BrainCircuit,
  CircleDollarSign,
  RefreshCw,
  Trash2,
  X,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";
import "./App.css";

const initialTransactions = [
  {
    id: 1,
    title: "Client Payment",
    category: "Revenue",
    type: "income",
    amount: 125000,
    date: "02 Sep 2026",
  },
  {
    id: 2,
    title: "Office Rent",
    category: "Operations",
    type: "expense",
    amount: 45000,
    date: "01 Sep 2026",
  },
  {
    id: 3,
    title: "Software Subscription",
    category: "Technology",
    type: "expense",
    amount: 18000,
    date: "30 Aug 2026",
  },
  {
    id: 4,
    title: "Product Sales",
    category: "Revenue",
    type: "income",
    amount: 98000,
    date: "29 Aug 2026",
  },
  {
    id: 5,
    title: "Marketing Campaign",
    category: "Marketing",
    type: "expense",
    amount: 22000,
    date: "27 Aug 2026",
  },
  {
    id: 6,
    title: "Service Revenue",
    category: "Revenue",
    type: "income",
    amount: 87000,
    date: "25 Aug 2026",
  },
  {
    id: 7,
    title: "Employee Salaries",
    category: "Payroll",
    type: "expense",
    amount: 92000,
    date: "24 Aug 2026",
  },
  {
    id: 8,
    title: "Consulting Income",
    category: "Revenue",
    type: "income",
    amount: 81000,
    date: "21 Aug 2026",
  },
  {
    id: 9,
    title: "Cloud Infrastructure",
    category: "Technology",
    type: "expense",
    amount: 36000,
    date: "19 Aug 2026",
  },
  {
    id: 10,
    title: "Business Utilities",
    category: "Operations",
    type: "expense",
    amount: 50000,
    date: "16 Aug 2026",
  },
];

const BASE_REVENUE_ADJUSTMENT = 80000;
const BASE_CASH = 186400;

const navItems = [
  { id: "dashboard", label: "Command Center", icon: LayoutDashboard },
  { id: "revenue", label: "Revenue", icon: TrendingUp },
  { id: "expenses", label: "Expenses", icon: TrendingDown },
  { id: "cashflow", label: "Cash Flow", icon: Wallet },
  { id: "risks", label: "Financial Risks", icon: ShieldAlert },
  { id: "insights", label: "AI Insights", icon: Sparkles },
  { id: "reports", label: "Reports", icon: FileText },
  { id: "settings", label: "Settings", icon: Settings },
];

function formatCurrency(value) {
  return `₹${Number(value).toLocaleString("en-IN")}`;
}

function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const [transactions, setTransactions] = useState(initialTransactions);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const [aiError, setAiError] = useState("");

  const metrics = useMemo(() => {
    const income = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + Number(t.amount), 0);

    const expenses = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + Number(t.amount), 0);

    const revenue = income + BASE_REVENUE_ADJUSTMENT;
    const profit = revenue - expenses;

    const initialNetChange = 471000 - 263000;
    const currentNetChange = revenue - expenses;

    const cashBalance = BASE_CASH + (currentNetChange - initialNetChange);

    const profitMargin = revenue
      ? (profit / revenue) * 100
      : 0;

    const expenseRatio = revenue
      ? (expenses / revenue) * 100
      : 0;

    const health = Math.max(
      0,
      Math.min(
        100,
        Math.round(
          84 +
            (profitMargin - 44.16) * 0.5 -
            (expenseRatio - 55.84) * 0.2
        )
      )
    );

    return {
      revenue,
      expenses,
      profit,
      cashBalance,
      profitMargin,
      expenseRatio,
      health,
    };
  }, [transactions]);

  const chartData = [
    { month: "Jan", revenue: 41000, expenses: 24000 },
    { month: "Feb", revenue: 52000, expenses: 31000 },
    { month: "Mar", revenue: 58000, expenses: 33000 },
    { month: "Apr", revenue: 61000, expenses: 35000 },
    { month: "May", revenue: 67000, expenses: 39000 },
    { month: "Jun", revenue: 59000, expenses: 34000 },
    { month: "Jul", revenue: 63000, expenses: 36000 },
    { month: "Aug", revenue: 70000, expenses: 41000 },
  ];

  const expenseData = [
    { name: "Payroll", value: 92000 },
    { name: "Operations", value: 95000 },
    { name: "Technology", value: 54000 },
    { name: "Marketing", value: 22000 },
  ];

  const filteredTransactions = transactions.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  async function runAIAnalysis() {
    setAiLoading(true);
    setAiError("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/analyze-finance",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            revenue: metrics.revenue,
            expenses: metrics.expenses,
            cashBalance: metrics.cashBalance,
            transactions,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "AI analysis failed");
      }

      setAiResult(data.analysis);
    } catch (error) {
      setAiError(
        "Unable to connect with Gemini. Make sure the backend is running on port 5000."
      );
    } finally {
      setAiLoading(false);
    }
  }

  function deleteTransaction(id) {
    setTransactions((current) =>
      current.filter((item) => item.id !== id)
    );
  }

  function addTransaction(event) {
    event.preventDefault();

    const form = new FormData(event.currentTarget);

    const newTransaction = {
      id: Date.now(),
      title: form.get("title"),
      category: form.get("category"),
      type: form.get("type"),
      amount: Number(form.get("amount")),
      date: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    };

    setTransactions((current) => [newTransaction, ...current]);
    setShowModal(false);
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">
            <BrainCircuit size={23} />
          </div>

          <div>
            <h1>FinanceAI</h1>
            <span>Financial Intelligence</span>
          </div>
        </div>

        <div className="workspace">
          <span>WORKSPACE</span>
          <strong>Acme Corporation</strong>
        </div>

        <nav>
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                className={`nav-item ${
                  activePage === item.id ? "active" : ""
                }`}
                onClick={() => setActivePage(item.id)}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="sidebar-bottom">
          <div className="engine-status">
            <div className="status-dot" />
            <div>
              <strong>AI Engine Online</strong>
              <span>Gemini analysis active</span>
            </div>
          </div>

          <div className="profile">
            <div className="avatar">FA</div>
            <div>
              <strong>Finance Admin</strong>
              <span>Administrator</span>
            </div>
          </div>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <span className="eyebrow">FINANCIAL COMMAND CENTER</span>
            <h2>
              {activePage === "dashboard"
                ? "Good evening, Finance Admin"
                : navItems.find((item) => item.id === activePage)?.label}
            </h2>
          </div>

          <div className="top-actions">
            <div className="live-status">
              <span />
              LIVE DATA
            </div>

            <button
              className="add-button"
              onClick={() => setShowModal(true)}
            >
              <Plus size={17} />
              Add Transaction
            </button>
          </div>
        </header>

        {activePage === "dashboard" && (
          <Dashboard
            metrics={metrics}
            chartData={chartData}
            transactions={filteredTransactions}
            search={search}
            setSearch={setSearch}
            deleteTransaction={deleteTransaction}
            aiResult={aiResult}
            aiLoading={aiLoading}
            aiError={aiError}
            runAIAnalysis={runAIAnalysis}
          />
        )}

        {activePage === "revenue" && (
          <RevenuePage
            metrics={metrics}
            chartData={chartData}
            transactions={transactions}
          />
        )}

        {activePage === "expenses" && (
          <ExpensePage
            metrics={metrics}
            expenseData={expenseData}
          />
        )}

        {activePage === "cashflow" && (
          <CashFlowPage metrics={metrics} />
        )}

        {activePage === "risks" && (
          <RiskPage metrics={metrics} />
        )}

        {activePage === "insights" && (
          <InsightsPage
            aiResult={aiResult}
            aiLoading={aiLoading}
            runAIAnalysis={runAIAnalysis}
            aiError={aiError}
          />
        )}

        {activePage === "reports" && (
          <ReportsPage metrics={metrics} transactions={transactions} />
        )}

        {activePage === "settings" && <SettingsPage />}
      </main>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <div>
                <span className="eyebrow">FINANCE DATA</span>
                <h3>Add Transaction</h3>
              </div>

              <button
                className="icon-button"
                onClick={() => setShowModal(false)}
              >
                <X size={19} />
              </button>
            </div>

            <form onSubmit={addTransaction}>
              <label>
                Transaction Name
                <input
                  name="title"
                  placeholder="e.g. Client Payment"
                  required
                />
              </label>

              <label>
                Category
                <select name="category" defaultValue="Revenue">
                  <option>Revenue</option>
                  <option>Operations</option>
                  <option>Technology</option>
                  <option>Marketing</option>
                  <option>Payroll</option>
                  <option>Other</option>
                </select>
              </label>

              <label>
                Transaction Type
                <select name="type" defaultValue="income">
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </label>

              <label>
                Amount
                <input
                  name="amount"
                  type="number"
                  min="1"
                  placeholder="₹ 0"
                  required
                />
              </label>

              <button className="modal-submit" type="submit">
                <CheckCircle2 size={17} />
                Add Transaction
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function Dashboard({
  metrics,
  chartData,
  transactions,
  search,
  setSearch,
  deleteTransaction,
  aiResult,
  aiLoading,
  aiError,
  runAIAnalysis,
}) {
  return (
    <section className="page">
      <div className="hero-row">
        <div>
          <span className="eyebrow">OVERVIEW / SEPTEMBER 2026</span>
          <h1>Know your numbers.<br />Move with confidence.</h1>
          <p>
            AI-powered financial intelligence for smarter business decisions.
          </p>
        </div>

        <div className="health-ring">
          <div>
            <strong>{metrics.health}</strong>
            <span>/100</span>
          </div>
          <small>Financial Health</small>
        </div>
      </div>

      <div className="metric-grid">
        <MetricCard
          label="Total Revenue"
          value={formatCurrency(metrics.revenue)}
          change="+12.8%"
          icon={TrendingUp}
          positive
        />

        <MetricCard
          label="Total Expenses"
          value={formatCurrency(metrics.expenses)}
          change="+4.2%"
          icon={TrendingDown}
        />

        <MetricCard
          label="Net Profit"
          value={formatCurrency(metrics.profit)}
          change="+18.4%"
          icon={CircleDollarSign}
          positive
        />

        <MetricCard
          label="Cash Balance"
          value={formatCurrency(metrics.cashBalance)}
          change="Healthy"
          icon={Wallet}
          positive
        />
      </div>

      <div className="dashboard-grid">
        <div className="panel chart-panel">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">PERFORMANCE</span>
              <h3>Revenue vs Expenses</h3>
            </div>

            <div className="legend">
              <span><i className="revenue-dot" /> Revenue</span>
              <span><i className="expense-dot" /> Expenses</span>
            </div>
          </div>

          <div className="chart">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopOpacity={0.25} />
                    <stop offset="100%" stopOpacity={0} />
                  </linearGradient>

                  <linearGradient id="expenseFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopOpacity={0.18} />
                    <stop offset="100%" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="4 4" vertical={false} />

                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) => `₹${value / 1000}k`}
                />

                <Tooltip
                  formatter={(value) =>
                    formatCurrency(value)
                  }
                />

                <Area
                  type="monotone"
                  dataKey="revenue"
                  strokeWidth={3}
                  fill="url(#revenueFill)"
                />

                <Area
                  type="monotone"
                  dataKey="expenses"
                  strokeWidth={2}
                  fill="url(#expenseFill)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="ai-copilot">
          <div className="ai-top">
            <div className="ai-icon">
              <Sparkles size={20} />
            </div>

            <div>
              <span>FINANCEAI COPILOT</span>
              <h3>AI Financial Review</h3>
            </div>
          </div>

          {!aiResult ? (
            <>
              <div className="ai-empty">
                <BrainCircuit size={35} />
                <h4>Turn your numbers into insights.</h4>
                <p>
                  Gemini will analyze profitability, expenses,
                  cash position and financial risks.
                </p>
              </div>

              <button
                className="ai-button"
                onClick={runAIAnalysis}
                disabled={aiLoading}
              >
                {aiLoading ? (
                  <RefreshCw className="spin" size={17} />
                ) : (
                  <Sparkles size={17} />
                )}

                {aiLoading ? "Analyzing..." : "Run AI Analysis"}
              </button>

              {aiError && <div className="ai-error">{aiError}</div>}
            </>
          ) : (
            <div className="ai-result">
              <div className="ai-score-row">
                <div>
                  <span>AI RISK LEVEL</span>
                  <strong>{aiResult.riskLevel}</strong>
                </div>

                <div className="ai-mini-score">
                  {aiResult.profitMargin}%
                  <small>margin</small>
                </div>
              </div>

              <p className="ai-summary">{aiResult.summary}</p>

              <div className="insight-list">
                {(aiResult.insights || []).slice(0, 3).map((item, index) => (
                  <div key={index}>
                    <Sparkles size={14} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <button
                className="ai-button"
                onClick={runAIAnalysis}
                disabled={aiLoading}
              >
                <RefreshCw size={16} />
                Refresh Analysis
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="lower-grid">
        <div className="panel transactions-panel">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">ACTIVITY</span>
              <h3>Recent Transactions</h3>
            </div>

            <div className="search-box">
              <Search size={16} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
              />
            </div>
          </div>

          <div className="transaction-list">
            {transactions.slice(0, 7).map((item) => (
              <div className="transaction" key={item.id}>
                <div className="transaction-icon">
                  {item.type === "income" ? (
                    <ArrowDownRight size={17} />
                  ) : (
                    <ArrowUpRight size={17} />
                  )}
                </div>

                <div className="transaction-info">
                  <strong>{item.title}</strong>
                  <span>{item.category} · {item.date}</span>
                </div>

                <strong
                  className={
                    item.type === "income"
                      ? "income"
                      : "expense"
                  }
                >
                  {item.type === "income" ? "+" : "-"}
                  {formatCurrency(item.amount)}
                </strong>

                <button
                  className="delete-button"
                  onClick={() => deleteTransaction(item.id)}
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="panel health-panel">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">ANALYTICS</span>
              <h3>Financial Health</h3>
            </div>

            <Activity size={19} />
          </div>

          <div className="health-score">
            <strong>{metrics.health}</strong>
            <span>/100</span>
          </div>

          <div className="progress">
            <span style={{ width: `${metrics.health}%` }} />
          </div>

          <div className="health-status">
            <CheckCircle2 size={18} />
            <div>
              <strong>Healthy position</strong>
              <span>Your financial indicators are stable.</span>
            </div>
          </div>

          <div className="health-stats">
            <div>
              <span>Profit Margin</span>
              <strong>{metrics.profitMargin.toFixed(2)}%</strong>
            </div>

            <div>
              <span>Expense Ratio</span>
              <strong>{metrics.expenseRatio.toFixed(2)}%</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MetricCard({
  label,
  value,
  change,
  icon: Icon,
  positive,
}) {
  return (
    <div className="metric-card">
      <div className="metric-top">
        <span>{label}</span>

        <div className="metric-icon">
          <Icon size={18} />
        </div>
      </div>

      <strong>{value}</strong>

      <div className={positive ? "metric-change positive" : "metric-change"}>
        {positive ? <ArrowUpRight size={14} /> : <Activity size={14} />}
        {change}
        <span>vs last period</span>
      </div>
    </div>
  );
}

function RevenuePage({ metrics, chartData, transactions }) {
  const revenueTransactions = transactions.filter(
    (item) => item.type === "income"
  );

  return (
    <section className="page">
      <PageIntro
        eyebrow="REVENUE INTELLIGENCE"
        title="Revenue performance"
        description="Understand where your business income is coming from and how it is trending."
      />

      <div className="metric-grid three">
        <MetricCard
          label="Revenue"
          value={formatCurrency(metrics.revenue)}
          change="+12.8%"
          icon={TrendingUp}
          positive
        />

        <MetricCard
          label="Profit"
          value={formatCurrency(metrics.profit)}
          change="+18.4%"
          icon={CircleDollarSign}
          positive
        />

        <MetricCard
          label="Profit Margin"
          value={`${metrics.profitMargin.toFixed(2)}%`}
          change="Strong"
          icon={Activity}
          positive
        />
      </div>

      <div className="panel large-panel">
        <div className="panel-heading">
          <div>
            <span className="eyebrow">REVENUE TREND</span>
            <h3>Monthly revenue growth</h3>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={360}>
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="4 4" vertical={false} />
            <XAxis dataKey="month" axisLine={false} tickLine={false} />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `₹${value / 1000}k`}
            />
            <Tooltip formatter={(value) => formatCurrency(value)} />
            <Area
              type="monotone"
              dataKey="revenue"
              strokeWidth={3}
              fill="url(#revenueFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="panel">
        <div className="panel-heading">
          <div>
            <span className="eyebrow">SOURCES</span>
            <h3>Revenue transactions</h3>
          </div>
        </div>

        <div className="transaction-list">
          {revenueTransactions.map((item) => (
            <div className="transaction" key={item.id}>
              <div className="transaction-icon">
                <TrendingUp size={17} />
              </div>

              <div className="transaction-info">
                <strong>{item.title}</strong>
                <span>{item.category} · {item.date}</span>
              </div>

              <strong className="income">
                +{formatCurrency(item.amount)}
              </strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExpensePage({ metrics, expenseData }) {
  return (
    <section className="page">
      <PageIntro
        eyebrow="EXPENSE INTELLIGENCE"
        title="Control your spending"
        description="Identify major cost centers and improve operational efficiency."
      />

      <div className="metric-grid three">
        <MetricCard
          label="Total Expenses"
          value={formatCurrency(metrics.expenses)}
          change="+4.2%"
          icon={TrendingDown}
        />

        <MetricCard
          label="Expense Ratio"
          value={`${metrics.expenseRatio.toFixed(2)}%`}
          change="Monitored"
          icon={Activity}
        />

        <MetricCard
          label="Cost Efficiency"
          value="88%"
          change="+6.1%"
          icon={CheckCircle2}
          positive
        />
      </div>

      <div className="panel large-panel">
        <div className="panel-heading">
          <div>
            <span className="eyebrow">COST STRUCTURE</span>
            <h3>Expense categories</h3>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={340}>
          <BarChart data={expenseData}>
            <CartesianGrid strokeDasharray="4 4" vertical={false} />
            <XAxis dataKey="name" axisLine={false} tickLine={false} />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `₹${value / 1000}k`}
            />
            <Tooltip formatter={(value) => formatCurrency(value)} />
            <Bar dataKey="value" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

function CashFlowPage({ metrics }) {
  return (
    <section className="page">
      <PageIntro
        eyebrow="LIQUIDITY MONITOR"
        title="Cash flow control"
        description="Monitor liquidity and make sure your business has enough operating runway."
      />

      <div className="metric-grid three">
        <MetricCard
          label="Available Cash"
          value={formatCurrency(metrics.cashBalance)}
          change="Healthy"
          icon={Wallet}
          positive
        />

        <MetricCard
          label="Monthly Inflow"
          value={formatCurrency(metrics.revenue)}
          change="+12.8%"
          icon={ArrowDownRight}
          positive
        />

        <MetricCard
          label="Monthly Outflow"
          value={formatCurrency(metrics.expenses)}
          change="+4.2%"
          icon={ArrowUpRight}
        />
      </div>

      <div className="cash-visual">
        <div className="cash-number">
          <span>AVAILABLE CASH</span>
          <strong>{formatCurrency(metrics.cashBalance)}</strong>
          <small>Current estimated operating balance</small>
        </div>

        <div className="cash-bars">
          <div style={{ height: "76%" }} />
          <div style={{ height: "55%" }} />
          <div style={{ height: "82%" }} />
          <div style={{ height: "62%" }} />
          <div style={{ height: "91%" }} />
          <div style={{ height: "74%" }} />
          <div style={{ height: "95%" }} />
        </div>
      </div>
    </section>
  );
}

function RiskPage({ metrics }) {
  const risks = [
    {
      title: "Cash Flow Risk",
      score: metrics.cashBalance < 100000 ? 72 : 24,
      level: metrics.cashBalance < 100000 ? "Medium" : "Low",
    },
    {
      title: "Expense Risk",
      score: metrics.expenseRatio > 70 ? 74 : 31,
      level: metrics.expenseRatio > 70 ? "Medium" : "Low",
    },
    {
      title: "Profitability Risk",
      score: metrics.profitMargin < 20 ? 78 : 18,
      level: metrics.profitMargin < 20 ? "High" : "Low",
    },
    {
      title: "Liquidity Risk",
      score: metrics.cashBalance < 75000 ? 82 : 16,
      level: metrics.cashBalance < 75000 ? "High" : "Low",
    },
  ];

  return (
    <section className="page">
      <PageIntro
        eyebrow="RISK INTELLIGENCE"
        title="Financial risk radar"
        description="AI-assisted monitoring of the areas that could impact financial stability."
      />

      <div className="risk-summary">
        <ShieldAlert size={34} />
        <div>
          <span>OVERALL FINANCIAL RISK</span>
          <strong>Low Risk</strong>
          <p>
            Current indicators show a stable financial position.
          </p>
        </div>
      </div>

      <div className="risk-grid">
        {risks.map((risk) => (
          <div className="risk-card" key={risk.title}>
            <div className="risk-card-top">
              <div>
                <span>{risk.title}</span>
                <strong>{risk.level}</strong>
              </div>

              {risk.level === "Low" ? (
                <CheckCircle2 size={21} />
              ) : (
                <AlertTriangle size={21} />
              )}
            </div>

            <div className="risk-score">
              {risk.score}
              <span>/100</span>
            </div>

            <div className="progress">
              <span style={{ width: `${risk.score}%` }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function InsightsPage({
  aiResult,
  aiLoading,
  runAIAnalysis,
  aiError,
}) {
  return (
    <section className="page">
      <PageIntro
        eyebrow="GEMINI INTELLIGENCE"
        title="AI financial insights"
        description="Use Gemini to turn financial data into actionable business intelligence."
      />

      {!aiResult ? (
        <div className="big-ai-card">
          <div className="big-ai-icon">
            <Sparkles size={38} />
          </div>

          <h3>Ask FinanceAI to review your business.</h3>

          <p>
            Gemini analyzes profitability, spending, liquidity,
            risk and improvement opportunities.
          </p>

          <button
            className="ai-button large"
            onClick={runAIAnalysis}
            disabled={aiLoading}
          >
            {aiLoading ? (
              <RefreshCw className="spin" />
            ) : (
              <Sparkles />
            )}

            {aiLoading ? "Analyzing..." : "Start AI Financial Review"}
          </button>

          {aiError && <div className="ai-error">{aiError}</div>}
        </div>
      ) : (
        <div className="ai-full-result">
          <div className="ai-result-header">
            <div>
              <span className="eyebrow">AI ANALYSIS COMPLETE</span>
              <h3>Financial intelligence report</h3>
            </div>

            <div className="risk-pill">
              {aiResult.riskLevel}
            </div>
          </div>

          <p>{aiResult.summary}</p>

          <div className="ai-columns">
            <div>
              <span>NET PROFIT</span>
              <strong>
                {formatCurrency(aiResult.netProfit)}
              </strong>
            </div>

            <div>
              <span>PROFIT MARGIN</span>
              <strong>{aiResult.profitMargin}%</strong>
            </div>

            <div>
              <span>EXPENSE RATIO</span>
              <strong>{aiResult.expenseRatio}%</strong>
            </div>
          </div>

          <div className="recommendation-grid">
            <div>
              <h4>Key Insights</h4>

              {(aiResult.insights || []).map((item, index) => (
                <div className="recommendation" key={index}>
                  <Sparkles size={16} />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div>
              <h4>Recommendations</h4>

              {(aiResult.recommendations || []).map(
                (item, index) => (
                  <div className="recommendation" key={index}>
                    <CheckCircle2 size={16} />
                    <span>{item}</span>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="human-review">
            AI-generated financial decision support. Human review is
            recommended before taking material financial actions.
          </div>
        </div>
      )}
    </section>
  );
}

function ReportsPage({ metrics, transactions }) {
  return (
    <section className="page">
      <PageIntro
        eyebrow="REPORT CENTER"
        title="Financial reports"
        description="Generate a quick overview of your current business financial position."
      />

      <div className="report-card">
        <div>
          <span>FINANCIAL SUMMARY</span>
          <h3>September 2026</h3>
        </div>

        <div className="report-values">
          <div>
            <span>Revenue</span>
            <strong>{formatCurrency(metrics.revenue)}</strong>
          </div>

          <div>
            <span>Expenses</span>
            <strong>{formatCurrency(metrics.expenses)}</strong>
          </div>

          <div>
            <span>Net Profit</span>
            <strong>{formatCurrency(metrics.profit)}</strong>
          </div>

          <div>
            <span>Transactions</span>
            <strong>{transactions.length}</strong>
          </div>
        </div>

        <button
          className="add-button"
          onClick={() => {
            const report = `
FinanceAI Financial Report

Revenue: ${formatCurrency(metrics.revenue)}
Expenses: ${formatCurrency(metrics.expenses)}
Net Profit: ${formatCurrency(metrics.profit)}
Cash Balance: ${formatCurrency(metrics.cashBalance)}
Financial Health: ${metrics.health}/100
Profit Margin: ${metrics.profitMargin.toFixed(2)}%
Expense Ratio: ${metrics.expenseRatio.toFixed(2)}%
            `.trim();

            const blob = new Blob([report], {
              type: "text/plain",
            });

            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = "financeai-report.txt";
            link.click();
            URL.revokeObjectURL(url);
          }}
        >
          <FileText size={17} />
          Export Report
        </button>
      </div>
    </section>
  );
}

function SettingsPage() {
  return (
    <section className="page">
      <PageIntro
        eyebrow="SYSTEM CONFIGURATION"
        title="FinanceAI settings"
        description="Manage your workspace and AI analysis preferences."
      />

      <div className="settings-grid">
        <div className="setting-card">
          <div className="setting-icon">
            <BrainCircuit size={21} />
          </div>

          <div>
            <h3>Gemini AI Engine</h3>
            <p>
              AI financial analysis is connected through the
              secure backend.
            </p>
          </div>

          <span className="setting-status">ONLINE</span>
        </div>

        <div className="setting-card">
          <div className="setting-icon">
            <Wallet size={21} />
          </div>

          <div>
            <h3>Financial Workspace</h3>
            <p>Acme Corporation Business Account</p>
          </div>

          <span className="setting-status">ACTIVE</span>
        </div>

        <div className="setting-card">
          <div className="setting-icon">
            <ShieldAlert size={21} />
          </div>

          <div>
            <h3>Responsible AI</h3>
            <p>
              AI outputs are decision-support recommendations and
              require human review.
            </p>
          </div>

          <span className="setting-status">ENABLED</span>
        </div>
      </div>
    </section>
  );
}

function PageIntro({ eyebrow, title, description }) {
  return (
    <div className="page-intro">
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}

export default App;