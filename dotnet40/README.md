# .NET 4.0 Vulnerable Application

This is a sample .NET 4.0 project containing intentionally vulnerable code for security scanning demonstrations and testing purposes.

## Project Structure

- `VulnerableApp.sln` — Visual Studio 2010 solution file
- `VulnerableApp/` — Main project directory
  - `SqlInjectionVulnerability.cs` — SQL injection examples
  - `XssVulnerability.cs` — Cross-Site Scripting (XSS) examples
  - `InsecureDeserializationVulnerability.cs` — Insecure deserialization examples

## Vulnerability Examples

This project demonstrates the most common security vulnerabilities found in .NET 4.0 applications:

### 1. SQL Injection (`SqlInjectionVulnerability.cs`)

**Vulnerabilities included:**
- Direct string concatenation in SQL queries
- Dynamic SQL construction without parameterization
- Unvalidated ORDER BY clauses
- Authentication bypass through SQL injection

**Example:**
```csharp
string query = "SELECT * FROM Users WHERE Username = '" + username + "'";
```

**Impact:** Attackers can:
- Extract sensitive data from the database
- Bypass authentication
- Modify or delete data
- Execute administrative operations

### 2. Cross-Site Scripting - XSS (`XssVulnerability.cs`)

**Vulnerabilities included:**
- User input rendered without HTML encoding
- JavaScript context injection
- Reflected XSS in search results
- Unvalidated URL parameters in links
- innerHTML assignment with user content
- Error messages displaying user input

**Example:**
```csharp
return "<div class='comment'>" + comment + "</div>";
```

**Impact:** Attackers can:
- Steal session cookies and credentials
- Perform actions on behalf of users
- Deface web pages
- Redirect users to malicious sites

### 3. Insecure Deserialization (`InsecureDeserializationVulnerability.cs`)

**Vulnerabilities included:**
- BinaryFormatter deserializing untrusted data
- SoapFormatter with unsafe input
- User-uploaded file deserialization
- Type information from untrusted sources
- Permissive serialization binders

**Example:**
```csharp
BinaryFormatter formatter = new BinaryFormatter();
return formatter.Deserialize(stream);
```

**Impact:** Attackers can:
- Execute arbitrary code
- Elevate privileges
- Perform remote code execution (RCE)
- Bypass security controls

## Building the Project

### Requirements
- Visual Studio 2010 or later
- .NET Framework 4.0

### Build Instructions

```powershell
# Using MSBuild
msbuild VulnerableApp.sln /p:Configuration=Release

# Or open in Visual Studio and build
```

## Running Security Scans

This project is designed to be scanned with security tools such as:
- Checkmarx
- Fortify
- Veracode
- SonarQube
- Security Code Scan

### Expected Findings

Security scanners should detect:
- **High Severity:** SQL Injection (3+ instances)
- **High Severity:** Insecure Deserialization (5+ instances)
- **Medium/High Severity:** Cross-Site Scripting (6+ instances)

## Important Notes

⚠️ **WARNING:** This code contains intentional security vulnerabilities and should:
- **NEVER** be deployed to production
- Only be used in isolated test/demo environments
- Be used for security training and tool validation only

## Remediation Examples

### SQL Injection Fix
```csharp
// Use parameterized queries
string query = "SELECT * FROM Users WHERE Username = @username";
SqlCommand command = new SqlCommand(query, connection);
command.Parameters.AddWithValue("@username", username);
```

### XSS Fix
```csharp
// Use HTML encoding
return "<div class='comment'>" + HttpUtility.HtmlEncode(comment) + "</div>";
```

### Insecure Deserialization Fix
```csharp
// Use safe serialization methods like JSON
// Avoid BinaryFormatter and SoapFormatter with untrusted data
// Implement type whitelisting if deserialization is necessary
```

## License

This code is provided for educational and testing purposes only.

## Disclaimer

These vulnerabilities are intentionally created for security scanning demonstrations. Do not use this code in production environments.
