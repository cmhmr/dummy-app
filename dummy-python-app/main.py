import vulnerabilities.sql_injection
import vulnerabilities.broken_auth
import vulnerabilities.sensitive_data_exposure
import vulnerabilities.xxe
import vulnerabilities.broken_access_control
import vulnerabilities.security_misconfiguration
import vulnerabilities.xss
import vulnerabilities.insecure_deserialization
import vulnerabilities.known_vulnerable_component
import vulnerabilities.insufficient_logging

if __name__ == "__main__":
    print("VulnerableApp: OWASP Top 10 Demo (Python)")
    print("This app contains intentional vulnerabilities for SAST demonstration.")
    print("SQL Injection Demo:", vulnerabilities.sql_injection.get_user_by_id("1 OR 1=1"))
    print("Broken Auth Demo:", vulnerabilities.broken_auth.authenticate("admin", "wrongpassword"))
    print("Sensitive Data Exposure Demo:", vulnerabilities.sensitive_data_exposure.get_credit_card_info())
    print("XXE Demo:", vulnerabilities.xxe.parse_xml('<!DOCTYPE foo [<!ENTITY xxe SYSTEM "file:///etc/hosts">]><foo>&xxe;</foo>'))
    print("Broken Access Control Demo:", vulnerabilities.broken_access_control.get_admin_resource("user"))
    print("Security Misconfiguration Demo:", vulnerabilities.security_misconfiguration.get_debug_info())
    print("XSS Demo:", vulnerabilities.xss.render_comment("<script>alert('xss')</script>"))
    print("Insecure Deserialization Demo:", vulnerabilities.insecure_deserialization.deserialize_object(b'gASVJAAAAAAAAAB9lCiMB2hlbGxvlIwBIS4='))
    print("Known Vulnerable Component Demo:", vulnerabilities.known_vulnerable_component.hash_password("password"))
    print("Insufficient Logging Demo:", vulnerabilities.insufficient_logging.login("admin", "1234"))
