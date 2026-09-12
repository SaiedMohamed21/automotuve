const API_URL = 'http://127.0.0.1:5000/api';

async function runAudit() {
  console.log('==================================================');
  console.log('      STAR AUTO CENTER — OWNER MODULE AUDIT       ');
  console.log('==================================================\n');

  let passedTests = 0;
  let totalTests = 0;

  function assert(condition, description) {
    totalTests++;
    if (condition) {
      console.log(`✓ PASS: ${description}`);
      passedTests++;
    } else {
      console.error(`✗ FAIL: ${description}`);
    }
  }

  // ── 1. SECURITY & AUTHORIZATION AUDIT ──
  console.log('--- 1. Security & Role Authorization ---');
  
  // Unauthenticated request
  const unauthRes = await fetch(`${API_URL}/owner/dashboard`);
  assert(unauthRes.status === 401, 'Unauthenticated request to /owner/dashboard returns 401');

  // Authenticate as non-Owner (Engineer)
  const engLoginRes = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'saied@engineer.com', password: '12345' }),
  });
  const engData = await engLoginRes.json();
  const engToken = engData.token;
  assert(!!engToken, 'Engineer login succeeded');

  const engForbiddenRes = await fetch(`${API_URL}/owner/dashboard`, {
    headers: { Authorization: `Bearer ${engToken}` },
  });
  assert(engForbiddenRes.status === 403, 'Non-Owner access to /owner/dashboard returns 403 Forbidden');

  const engForbiddenUsersRes = await fetch(`${API_URL}/owner/users`, {
    headers: { Authorization: `Bearer ${engToken}` },
  });
  assert(engForbiddenUsersRes.status === 403, 'Non-Owner access to /owner/users returns 403 Forbidden');

  // Authenticate as Owner
  const ownerLoginRes = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'saied@owner.com', password: '12345' }),
  });
  const ownerData = await ownerLoginRes.json();
  const ownerToken = ownerData.token;
  assert(!!ownerToken, 'Owner login succeeded');

  const ownerDashRes = await fetch(`${API_URL}/owner/dashboard`, {
    headers: { Authorization: `Bearer ${ownerToken}` },
  });
  assert(ownerDashRes.status === 200, 'Owner access to /owner/dashboard returns 200 OK');
  const dashData = await ownerDashRes.json();

  // ── 2. OWNER DASHBOARD REAL FINANCIAL KPIs AUDIT ──
  console.log('\n--- 2. Owner Dashboard Real KPIs ---');
  assert(typeof dashData.totalJobOrders === 'number', `Total Job Orders: ${dashData.totalJobOrders}`);
  assert(typeof dashData.totalRevenue === 'number', `Total Revenue: ${dashData.totalRevenue} EGP`);
  assert(typeof dashData.totalExpenses === 'number', `Total Expenses: ${dashData.totalExpenses} EGP`);
  assert(typeof dashData.unpaidInvoicesAmount === 'number', `Unpaid Invoices Amount: ${dashData.unpaidInvoicesAmount} EGP`);
  assert(typeof dashData.supplierOutstandingBalance === 'number', `Supplier Outstanding Balance: ${dashData.supplierOutstandingBalance} EGP`);
  assert(typeof dashData.technicianSalaryBalance === 'number', `Technician Salary Balance: ${dashData.technicianSalaryBalance} EGP`);

  // ── 3. WORKSHOP SETTINGS & BRANDING PERSISTENCE AUDIT ──
  console.log('\n--- 3. Workshop Settings & Branding Persistence ---');
  
  const getSettingsRes = await fetch(`${API_URL}/settings/workshop`, {
    headers: { Authorization: `Bearer ${ownerToken}` },
  });
  assert(getSettingsRes.status === 200, 'GET /settings/workshop returns 200 OK');
  const settingsBefore = await getSettingsRes.json();

  const testCompanyName = 'SOS Motor Works';
  const testPhone = '+20 100 933 4747';
  const testAddress = 'شارع شنزو آبي، الحي العاشر، مدينة نصر، القاهرة، بجوار سنتر شبانة';
  
  const updateSettingsRes = await fetch(`${API_URL}/settings/workshop`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${ownerToken}`,
    },
    body: JSON.stringify({
      companyName: testCompanyName,
      phone: testPhone,
      address: testAddress,
      currency: 'EGP',
      email: settingsBefore.email, // preserve DB email
    }),
  });
  assert(updateSettingsRes.status === 200, 'PUT /settings/workshop returns 200 OK');

  const getSettingsAfterRes = await fetch(`${API_URL}/settings/workshop`, {
    headers: { Authorization: `Bearer ${ownerToken}` },
  });
  const settingsAfter = await getSettingsAfterRes.json();
  assert(settingsAfter.companyName === testCompanyName, `Company Name updated to '${settingsAfter.companyName}'`);
  assert(settingsAfter.phone === testPhone, `Phone updated to '${settingsAfter.phone}'`);
  assert(settingsAfter.address === testAddress, `Address updated to '${settingsAfter.address}'`);

  // ── 4. USER MANAGEMENT AUDIT (CRUD, PASSWORDS, ACTIVATION) ──
  console.log('\n--- 4. Owner User Management ---');

  const testUserEmail = `audit_${Date.now()}@starauto.com`;
  const initialPassword = 'InitialPass123!';
  const newPassword = 'NewSecretPass123!';

  // Create User
  const createUserRes = await fetch(`${API_URL}/owner/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${ownerToken}`,
    },
    body: JSON.stringify({
      name: 'Audit Test User',
      phone: '01099998888',
      email: testUserEmail,
      role: 'Engineer',
      password: initialPassword,
    }),
  });
  assert(createUserRes.status === 200, `Created new user ${testUserEmail}`);
  const createdUser = await createUserRes.json();

  // Test login with created user credentials
  const testUserLogin1 = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: testUserEmail, password: initialPassword }),
  });
  assert(testUserLogin1.status === 200, 'New user can log in with initial password');

  // Update User profile
  const updateUserRes = await fetch(`${API_URL}/owner/users/${createdUser.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${ownerToken}`,
    },
    body: JSON.stringify({
      name: 'Audit Test User Updated',
      phone: '01011112222',
      email: testUserEmail,
      role: 'Accountant',
    }),
  });
  assert(updateUserRes.status === 200, 'Owner updated user profile and role');

  // Change Password
  const changePassRes = await fetch(`${API_URL}/owner/users/${createdUser.id}/change-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${ownerToken}`,
    },
    body: JSON.stringify({ password: newPassword }),
  });
  assert(changePassRes.status === 200, 'Owner changed user password');

  // Verify old password fails
  const oldPassLogin = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: testUserEmail, password: initialPassword }),
  });
  assert(oldPassLogin.status === 400 || oldPassLogin.status === 401, 'Old password login is rejected');

  // Verify new password succeeds
  const newPassLogin = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: testUserEmail, password: newPassword }),
  });
  assert(newPassLogin.status === 200, 'New password login succeeds');

  // Deactivate User
  const deactivateRes = await fetch(`${API_URL}/owner/users/${createdUser.id}/toggle-status`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${ownerToken}` },
  });
  assert(deactivateRes.status === 200, 'Deactivated user');

  // Verify deactivated login fails
  const deactLogin = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: testUserEmail, password: newPassword }),
  });
  assert(deactLogin.status === 400 || deactLogin.status === 401, 'Deactivated user login is rejected');

  // Reactivate User
  const reactivateRes = await fetch(`${API_URL}/owner/users/${createdUser.id}/toggle-status`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${ownerToken}` },
  });
  assert(reactivateRes.status === 200, 'Reactivated user');

  // Verify reactivated user login works
  const reactLogin = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: testUserEmail, password: newPassword }),
  });
  assert(reactLogin.status === 200, 'Reactivated user login succeeds');

  console.log('\n==================================================');
  console.log(`AUDIT RESULTS: ${passedTests} / ${totalTests} TESTS PASSED`);
  console.log('==================================================');

  if (passedTests === totalTests) {
    process.exit(0);
  } else {
    process.exit(1);
  }
}

runAudit().catch((err) => {
  console.error('Audit script error:', err);
  process.exit(1);
});
