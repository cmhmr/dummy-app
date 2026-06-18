# VulnerableApp: OWASP Top 10 Vulnerabilities Demo (Python)

This project demonstrates the most relevant vulnerabilities from the OWASP Top 10 in a simple, executable Python application. Each vulnerability is implemented with a minimal example and has a corresponding unit test. This is intended for SAST (Static Application Security Testing) scanner demonstrations and educational purposes only.

## Structure
- `main.py`: Main entry point and vulnerable endpoints.
- `vulnerabilities/`: Contains modules for each vulnerability.
- `tests/`: Unit tests for each vulnerability.

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

## How to Build, Run, and Visualize

### Prerequisites
- Python 3.8 or later

### Install dependencies
```sh
pip install -r requirements.txt
```

### Run the App
```sh
python main.py
```

You will see output in the terminal demonstrating each vulnerability.

### Run Unit Tests
```sh
python -m unittest discover tests
```

Test results will be displayed in the terminal.

### Visualize the App
This is a console application. All output is shown in the terminal window. For best results, use VS Code or any terminal that supports Python.

---
*This project was created with the assistance of GitHub Copilot for code and documentation generation.*

# Github action added for sast