# 🚀 Advanced Code Review Agent

An enterprise-grade AI-powered code review system that provides comprehensive analysis including security scanning, complexity metrics, and intelligent fix suggestions.

![Version](https://img.shields.io/badge/version-2.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Python](https://img.shields.io/badge/python-3.8+-blue)

## ✨ Features

### 🔍 **Comprehensive Analysis**
- **Multi-Language Support**: Python, JavaScript, TypeScript, Go, Rust, Java, C++, Ruby, PHP, Bash
- **Security Scanning**: Detects vulnerabilities using industry-standard tools (Bandit, npm audit, gosec)
- **Complexity Analysis**: Cyclomatic complexity and maintainability index calculation
- **Code Quality**: Linting with language-specific tools (pylint, flake8, ESLint, etc.)
- **Execution Testing**: Automatic code execution with error detection

### 🤖 **AI-Powered Intelligence**
- **Smart Fix Suggestions**: AI-generated solutions for critical and high-severity issues
- **Severity Classification**: Automatic issue categorization (CRITICAL, HIGH, MEDIUM, LOW)
- **Pattern Recognition**: Identifies security vulnerabilities and code smells
- **Contextual Analysis**: Understands code intent and suggests best practices

### 📊 **Rich Reporting**
- **Interactive Dashboard**: Real-time metrics with severity distribution charts
- **Structured Reports**: Comprehensive Markdown reports with executive summaries
- **Search & Filter**: Find specific issues quickly by severity or keyword
- **Export Options**: Download as Markdown, JSON, or copy to clipboard

### ⚡ **Real-Time Experience**
- **Live Progress Streaming**: Server-Sent Events (SSE) for instant updates
- **Step-by-Step Tracking**: See every analysis phase in real-time
- **Isolated Execution**: Daytona sandbox ensures safe code execution
- **Concurrent Analysis**: Fast parallel processing of multiple files

---

## 🏗️ Architecture

```
┌─────────────────┐         ┌──────────────────┐         ┌─────────────────┐
│   Frontend      │  HTTP   │   FastAPI        │  SDK    │   Daytona       │
│   (HTML/JS)     │────────▶│   Backend        │────────▶│   Sandbox       │
│                 │  SSE    │                  │         │                 │
│  - Dashboard    │◀────────│  - LangChain     │         │  - Git Clone    │
│  - Chart.js     │         │  - Agent         │         │  - Execution    │
│  - Filtering    │         │  - Tools         │         │  - Analysis     │
└─────────────────┘         └──────────────────┘         └─────────────────┘
                                     │
                                     ▼
                            ┌──────────────────┐
                            │  Google Gemini   │
                            │  (LLM)           │
                            │                  │
                            │  - Fix Suggestions│
                            │  - Pattern Analysis│
                            └──────────────────┘
```

---

## 📦 Installation

### Prerequisites
- Python 3.8 or higher
- Node.js 16+ (for JavaScript/TypeScript analysis)
- Git

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Sandbox
   ```

2. **Install Python dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Set up environment variables**
   Create a `.env` file in the `Sandbox` directory:
   ```env
   DAYTONA_API_KEY=your_daytona_api_key_here
   GOOGLE_API_KEY=your_google_gemini_api_key_here
   ```

   **Where to get API keys:**
   - **Daytona API Key**: Sign up at [daytona.io](https://daytona.io) and generate an API key
   - **Google API Key**: Get a Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

4. **Verify installation**
   ```bash
   python -c "import daytona, langchain, fastapi; print('✓ All dependencies installed')"
   ```

---

## 🚀 Usage

### Starting the Backend

1. **Navigate to the Sandbox directory**
   ```bash
   cd Sandbox
   ```

2. **Start the FastAPI server**
   ```bash
   uvicorn api:app --reload --port 8001
   ```

   You should see:
   ```
   INFO:     Uvicorn running on http://127.0.0.1:8001
   INFO:     Application startup complete.
   ```

3. **Verify the API is running**
   Visit http://localhost:8001/health in your browser or:
   ```bash
   curl http://localhost:8001/health
   ```

### Opening the Frontend

1. **Open the HTML file**
   Simply open `index.html` in your browser:
   ```bash
   # Windows
   start index.html
   
   # macOS
   open index.html
   
   # Linux
   xdg-open index.html
   ```

   **Or** use a local server for better performance:
   ```bash
   # Python 3
   python -m http.server 3000
   
   # Then open http://localhost:3000/index.html
   ```

### Running a Code Review

1. **Enter a GitHub repository URL** in the input field, for example:
   ```
   https://github.com/pallets/flask
   https://github.com/django/django
   https://github.com/expressjs/express
   ```

2. **Click "Start Review"**

3. **Watch the live progress** as the agent:
   - Clones the repository
   - Discovers source files
   - Analyzes each file (execution, linting, security, complexity)
   - Generates AI-powered fix suggestions
   - Creates a comprehensive report

4. **Review the results** in the interactive dashboard:
   - View severity metrics and charts
   - Filter by severity level (Critical, High, Medium, Low)
   - Search for specific issues
   - Download or copy the report

---

## 📊 Report Structure

The generated report includes:

### Executive Summary
- Overall code quality score (A-F)
- Security risk level
- Total issues by severity
- Top 3 key findings
- Recommended priority actions

### Detailed File Analysis
For each file:
- **Language & Size**: File metadata
- **Execution Results**: Success/failure with output
- **Linting Report**: Code quality issues
- **Security Scan**: Vulnerability detection
- **Complexity Metrics**: Cyclomatic complexity, maintainability index
- **AI Fix Suggestions**: Intelligent recommendations for critical/high issues
- **Severity Classification**: Issues categorized by impact

### Overall Recommendations
- Critical priority actions
- High priority improvements
- Maintenance & best practices

### Metrics Summary
- Total lines of code
- Language distribution
- Average complexity
- Security issue count
- Overall quality score

---

## 🔧 Configuration

### Supported Languages

| Language   | Execution | Linting        | Security    | Complexity |
|------------|-----------|----------------|-------------|------------|
| Python     | ✅        | pylint, flake8 | bandit      | radon      |
| JavaScript | ✅        | ESLint         | npm audit   | ❌         |
| TypeScript | ✅        | ESLint         | npm audit   | ❌         |
| Go         | ✅        | golint, go vet | gosec       | ❌         |
| Rust       | ✅        | clippy         | cargo audit | ❌         |
| Java       | ✅        | checkstyle     | spotbugs    | ❌         |
| C++        | ✅        | cppcheck       | ❌          | ❌         |
| Ruby       | ✅        | rubocop        | brakeman    | ❌         |
| PHP        | ✅        | phpcs          | psalm       | ❌         |
| Bash       | ✅        | shellcheck     | ❌          | ❌         |

### Severity Classification

Issues are automatically classified based on pattern recognition:

- **CRITICAL**: SQL injection, command injection, hardcoded secrets, RCE
- **HIGH**: XSS, CSRF, authentication bypass, memory issues
- **MEDIUM**: Missing error handling, code smells, high complexity
- **LOW**: Style issues, formatting, naming conventions

---

## 🎯 Example Output

```markdown
# 🔍 Advanced Code Review Report

**Repository:** https://github.com/example/repo
**Date:** 2026-02-16 12:00 UTC
**Files Analyzed:** 15

## 📊 Executive Summary

**Overall Code Quality:** B
**Security Risk Level:** Medium
**Total Issues Found:** 23
- 🔴 Critical: 2
- 🟠 High: 5
- 🟡 Medium: 11
- 🟢 Low: 5

**Key Findings:**
- SQL injection vulnerability in auth.py
- High cyclomatic complexity in data_processor.py
- Missing error handling in 8 files

## 📁 Detailed File Analysis

### `src/auth.py` [CRITICAL]

**Language:** python
**Size:** 156 lines
**Complexity:** C (Avg: 15.2)

#### 🔒 Security
[CRITICAL] Line 45: Possible SQL injection vector
[HIGH] Line 78: Hardcoded database password

#### 🔧 Suggested Fixes
1. **Issue**: SQL injection in login query
   **Fix**: Use parameterized queries: `cursor.execute("SELECT * FROM users WHERE id=?", (user_id,))`
   **Impact**: Eliminates CRITICAL security risk

...
```

---

## 🛠️ API Endpoints

### `POST /review`
Start a new code review job.

**Request:**
```json
{
  "repo_url": "https://github.com/owner/repo"
}
```

**Response:**
```json
{
  "job_id": "550e8400-e29b-41d4-a716-446655440000",
  "stream_url": "/review/550e8400-e29b-41d4-a716-446655440000"
}
```

### `GET /review/{job_id}`
Stream live progress via Server-Sent Events (SSE).

**Event Types:**
- `step`: General progress update
- `file`: File-specific action
- `execute`: Code execution result
- `lint`: Linting result
- `security`: Security scan result
- `analyze`: Complexity analysis
- `fix`: Fix suggestion generation
- `report`: Final report (contains full Markdown)
- `done`: Review complete
- `error`: Error occurred

### `GET /health`
Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "version": "2.0.0",
  "features": ["security_scanning", "complexity_analysis", "multi_language", "ai_suggestions"]
}
```

---

## 🐛 Troubleshooting

### Common Issues

1. **"DAYTONA_API_KEY not configured"**
   - Ensure your `.env` file exists and contains a valid Daytona API key
   - Restart the server after adding the key

2. **"Connection to server lost"**
   - Check that the backend is running on port 8001
   - Verify firewall settings allow localhost connections

3. **"Review timed out"**
   - Large repositories may take longer to analyze
   - Current timeout is 10 minutes; consider splitting large repos

4. **Chart not displaying**
   - Ensure you have internet connection (Chart.js loads from CDN)
   - Check browser console for JavaScript errors

5. **"No linters configured"**
   - Some languages require additional setup in the sandbox
   - Tools are auto-installed during the review process

---

## 📚 Advanced Usage

### Running with Custom Configuration

Edit `api.py` to customize:

```python
# Change model
MODEL = "gemini-2.0-flash-exp"  # or "gemini-1.5-pro"

# Adjust timeout
result = sb.process.exec(cmd, timeout=60)  # increase for large files

# Add custom severity patterns
SEVERITY_PATTERNS["CRITICAL"].append(r"your_pattern_here")
```

### Batch Processing

Use the API directly for batch processing:

```python
import requests

repos = [
    "https://github.com/org/repo1",
    "https://github.com/org/repo2",
    "https://github.com/org/repo3",
]

for repo in repos:
    response = requests.post(
        "http://localhost:8001/review",
        json={"repo_url": repo}
    )
    print(f"Started review: {response.json()['job_id']}")
```

---

## 🤝 Contributing

Contributions are welcome! To add support for a new language:

1. Update `LANGUAGE_CONFIG` in `api.py`:
   ```python
   ".ext": {
       "name": "language_name",
       "runner": "command {file}",
       "linters": ["linter1", "linter2"],
       "security": "security_tool",
   }
   ```

2. Test with sample repositories
3. Update documentation
4. Submit a pull request

---

## 📄 License

MIT License - feel free to use this in your projects!

---

## 🙏 Acknowledgments

- **Daytona** for isolated sandbox execution
- **LangChain** for AI agent orchestration
- **Google Gemini** for intelligent analysis
- **Chart.js** for beautiful visualizations

---

## 📞 Support

For issues or questions:
- Open a GitHub issue
- Check the troubleshooting section
- Review API documentation at http://localhost:8001/docs

---

**Built with ❤️ for developers who care about code quality**
