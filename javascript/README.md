# VulnerableApp: OWASP Top 10 Vulnerabilities Demo (JavaScript)

This project demonstrates the most relevant vulnerabilities from the OWASP Top 10 in a simple, executable JavaScript (Node.js) application. Each vulnerability is implemented with a minimal example and has a corresponding unit test. This is intended for SAST (Static Application Security Testing) scanner demonstrations and educational purposes only.

## Structure
- `main.js`: Main entry point and vulnerable endpoints.
- `vulnerabilities/`: Contains modules for each vulnerability.
- `test/`: Unit tests for each vulnerability.

## Included Vulnerabilities
1. **Injection** (SQL Injection)
2. **Broken Authentication**
3. **Sensitive Data Exposure**
4. **XML External Entities (XXE)**
5. **Broken Access Control**
6. **Security Misconfiguration**
7. **Cross-Site Scripting (XSS)**
8. **Insecure Deserialization**
9. **Using Components with Known Vulnerabilities**
10. **Insufficient Logging & Monitoring**
 asd
## How to Build, Run, and Visualize

### Prerequisites
- Node.js 16 or later

### Install dependencies
```sh
npm install
```

### Run the App
```sh
npm start
```

You will see output in the terminal demonstrating each vulnerability.

### Run Unit Tests
```sh
npm test
```

Test results will be displayed in the terminal.

### Visualize the App
This is a console application. All output is shown in the terminal window. For best results, use VS Code or any terminal that supports Node.js.

---
*This project was created with the assistance of GitHub Copilot for code and documentation generation.*
