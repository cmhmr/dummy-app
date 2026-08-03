import unittest
import vulnerabilities.sql_injection as sql_injection
import vulnerabilities.broken_auth as broken_auth
import vulnerabilities.sensitive_data_exposure as sensitive_data_exposure
import vulnerabilities.xxe as xxe
import vulnerabilities.broken_access_control as broken_access_control
import vulnerabilities.security_misconfiguration as security_misconfiguration
import vulnerabilities.xss as xss
import vulnerabilities.insecure_deserialization as insecure_deserialization
import vulnerabilities.known_vulnerable_component as known_vulnerable_component
import vulnerabilities.insufficient_logging as insufficient_logging

class TestSqlInjection(unittest.TestCase):
    def test_sql_injection(self):
        result = sql_injection.get_user_by_id("1 OR 1=1")
        self.assertTrue(result == 'admin' or result == 'Not found')

class TestBrokenAuth(unittest.TestCase):
    def test_broken_auth(self):
        self.assertEqual(broken_auth.authenticate('admin', '1234'), 'Authenticated as admin')
        self.assertEqual(broken_auth.authenticate('admin', 'wrong'), 'Authentication failed')

class TestSensitiveDataExposure(unittest.TestCase):
    def test_sensitive_data_exposure(self):
        data = sensitive_data_exposure.get_credit_card_info()
        self.assertIn('4111-1111-1111-1111', data)

class TestXXE(unittest.TestCase):
    def test_xxe(self):
        xml = '<!DOCTYPE foo [<!ENTITY xxe SYSTEM "file:///etc/hosts">]><foo>&xxe;</foo>'
        result = xxe.parse_xml(xml)
        self.assertTrue(result is not None)

class TestBrokenAccessControl(unittest.TestCase):
    def test_broken_access_control(self):
        self.assertIn('Sensitive admin data', broken_access_control.get_admin_resource('user'))

class TestSecurityMisconfiguration(unittest.TestCase):
    def test_security_misconfiguration(self):
        self.assertIn('DEBUG', security_misconfiguration.get_debug_info())

class TestXSS(unittest.TestCase):
    def test_xss(self):
        input = "<script>alert('xss')</script>"
        output = xss.render_comment(input)
        self.assertIn(input, output)

class TestInsecureDeserialization(unittest.TestCase):
    def test_insecure_deserialization(self):
        # b'\x80\x04\x95$\x00\x00\x00\x00\x00\x00\x00}\x94\x8c\x07hello\x94\x8c\x01!\x94s.'
        data = b'gASVJAAAAAAAAAB9lCiMB2hlbGxvlIwBIS4='
        result = insecure_deserialization.deserialize_object(data)
        self.assertIn('hello', result)

class TestKnownVulnerableComponent(unittest.TestCase):
    def test_known_vulnerable_component(self):
        hash = known_vulnerable_component.hash_password('password')
        self.assertTrue(len(hash) > 0)

class TestInsufficientLogging(unittest.TestCase):
    def test_insufficient_logging(self):
        self.assertEqual(insufficient_logging.login('admin', '1234'), 'Login successful')
        self.assertEqual(insufficient_logging.login('admin', 'wrong'), 'Login failed')

if __name__ == '__main__':
    unittest.main()
