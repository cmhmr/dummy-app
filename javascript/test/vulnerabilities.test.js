const { expect } = require('chai');
const sqlInjection = require('../vulnerabilities/sqlInjection');
const brokenAuth = require('../vulnerabilities/brokenAuth');
const sensitiveDataExposure = require('../vulnerabilities/sensitiveDataExposure');
const xxe = require('../vulnerabilities/xxe');
const brokenAccessControl = require('../vulnerabilities/brokenAccessControl');
const securityMisconfiguration = require('../vulnerabilities/securityMisconfiguration');
const xss = require('../vulnerabilities/xss');
const insecureDeserialization = require('../vulnerabilities/insecureDeserialization');
const knownVulnerableComponent = require('../vulnerabilities/knownVulnerableComponent');
const insufficientLogging = require('../vulnerabilities/insufficientLogging');

describe('VulnerableApp OWASP Top 10', function() {
  it('SQL Injection', async function() {
    const result = await sqlInjection.getUserById("1 OR 1=1");
    expect(result === 'admin' || result === 'Not found').to.be.true;
  });
  it('Broken Authentication', function() {
    expect(brokenAuth.authenticate('admin', '1234')).to.equal('Authenticated as admin');
    expect(brokenAuth.authenticate('admin', 'wrong')).to.equal('Authentication failed');
  });
  it('Sensitive Data Exposure', function() {
    expect(sensitiveDataExposure.getCreditCardInfo()).to.include('4111-1111-1111-1111');
  });
  it('XXE', function() {
    expect(xxe.parseXml('<!DOCTYPE foo [<!ENTITY xxe SYSTEM "file:///etc/hosts">]><foo>&xxe;</foo>')).to.include('XXE');
  });
  it('Broken Access Control', function() {
    expect(brokenAccessControl.getAdminResource('user')).to.include('Sensitive admin data');
  });
  it('Security Misconfiguration', function() {
    expect(securityMisconfiguration.getDebugInfo()).to.include('DEBUG');
  });
  it('XSS', function() {
    const input = "<script>alert('xss')</script>";
    expect(xss.renderComment(input)).to.include(input);
  });
  it('Insecure Deserialization', function() {
    expect(insecureDeserialization.deserializeObject('eyJrZXkiOiJoZWxsbyEifQ==')).to.include('hello');
  });
  it('Known Vulnerable Component', function() {
    expect(knownVulnerableComponent.hashPassword('password')).to.have.length.greaterThan(0);
  });
  it('Insufficient Logging', function() {
    expect(insufficientLogging.login('admin', '1234')).to.equal('Login successful');
    expect(insufficientLogging.login('admin', 'wrong')).to.equal('Login failed');
  });
});
