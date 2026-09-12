// Verification script for targeted security fix
const BACKEND_URL = 'http://127.0.0.1:5000';

async function post(url, data, headers = {}) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...headers },
    body: JSON.stringify(data),
  });
  let body = null;
  try {
    body = await res.json();
  } catch {}
  return { status: res.status, body };
}

async function get(url, headers = {}) {
  const res = await fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', ...headers },
  });
  let body = null;
  try {
    body = await res.json();
  } catch {}
  return { status: res.status, body };
}

async function runTests() {
  console.log('========================================');
  console.log('SECURITY VERIFICATION TESTS');
  console.log('========================================\n');
  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`[PASS] ${message}`);
      passed++;
    } else {
      console.error(`[FAIL] ${message}`);
      failed++;
    }
  }

  // A) Normal login: Owner
  console.log('--- Test A: Owner Login ---');
  const ownerRes = await post(`${BACKEND_URL}/api/auth/login`, {
    email: 'saied@owner.com',
    password: '12345',
  });
  assert(ownerRes.status === 200, `Owner login returns HTTP 200 (got ${ownerRes.status})`);
  assert(ownerRes.body?.role === 'Owner', `Owner role is 'Owner' (got ${ownerRes.body?.role})`);
  assert(!!ownerRes.body?.token, 'Owner JWT token is present');
  const ownerToken = ownerRes.body?.token;

  // B) Normal login: Accountant
  console.log('\n--- Test B: Accountant Login ---');
  const acctRes = await post(`${BACKEND_URL}/api/auth/login`, {
    email: 'saied@accountant.com',
    password: '12345',
  });
  assert(acctRes.status === 200, `Accountant login returns HTTP 200 (got ${acctRes.status})`);
  assert(acctRes.body?.role === 'Accountant', `Accountant role is 'Accountant' (got ${acctRes.body?.role})`);
  assert(!!acctRes.body?.token, 'Accountant JWT token is present');
  const acctToken = acctRes.body?.token;

  // C) Normal login: Warehouse
  console.log('\n--- Test C: Warehouse Login ---');
  const whRes = await post(`${BACKEND_URL}/api/auth/login`, {
    email: 'saied@warehouse.com',
    password: '12345',
  });
  assert(whRes.status === 200, `Warehouse login returns HTTP 200 (got ${whRes.status})`);
  assert(whRes.body?.role === 'Warehouse', `Warehouse role is 'Warehouse' (got ${whRes.body?.role})`);
  assert(!!whRes.body?.token, 'Warehouse JWT token is present');
  const whToken = whRes.body?.token;

  // D) Normal login: Engineer
  console.log('\n--- Test D: Engineer Login ---');
  const engRes = await post(`${BACKEND_URL}/api/auth/login`, {
    email: 'saied@engineer.com',
    password: '12345',
  });
  assert(engRes.status === 200, `Engineer login returns HTTP 200 (got ${engRes.status})`);
  assert(engRes.body?.role === 'Engineer', `Engineer role is 'Engineer' (got ${engRes.body?.role})`);
  assert(!!engRes.body?.token, 'Engineer JWT token is present');
  const engToken = engRes.body?.token;

  // E) Wrong password -> login rejected
  console.log('\n--- Test E: Wrong Password ---');
  const wrongRes = await post(`${BACKEND_URL}/api/auth/login`, {
    email: 'saied@owner.com',
    password: 'wrong_password_123',
  });
  assert(wrongRes.status === 401, `Wrong password returns HTTP 401 (got ${wrongRes.status})`);
  assert(wrongRes.body?.message === 'Invalid email or password', `Error message is appropriate: "${wrongRes.body?.message}"`);

  // F) Inactive account -> login rejected
  console.log('\n--- Test F: Inactive Account ---');
  // Create a temporary inactive user using Owner token
  const testInactiveEmail = `inactive_${Date.now()}@test.com`;
  const createUserRes = await post(`${BACKEND_URL}/api/owner/users`, {
    email: testInactiveEmail,
    fullName: 'Inactive User',
    phone: '0123456789',
    role: 'Engineer',
    password: 'Password123!',
  }, { Authorization: `Bearer ${ownerToken}` });

  if (createUserRes.status === 200 && createUserRes.body?.id) {
    const userId = createUserRes.body.id;
    // Toggle active status to inactive
    const toggleRes = await fetch(`${BACKEND_URL}/api/owner/users/${userId}/toggle-status`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${ownerToken}` },
    });
    console.log(`Deactivated user status response: ${toggleRes.status}`);

    // Try logging in with the disabled account
    const inactiveLoginRes = await post(`${BACKEND_URL}/api/auth/login`, {
      email: testInactiveEmail,
      password: 'Password123!',
    });
    assert(inactiveLoginRes.status === 401, `Inactive account login returns HTTP 401 (got ${inactiveLoginRes.status})`);
    assert(inactiveLoginRes.body?.message === 'Account is disabled', `Message is: "${inactiveLoginRes.body?.message}"`);

    // Clean up: delete test user
    await fetch(`${BACKEND_URL}/api/owner/users/${userId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${ownerToken}` },
    });
  } else {
    console.log('Skipping dynamic inactive user creation, testing non-existent user rejected as 401');
    const fakeRes = await post(`${BACKEND_URL}/api/auth/login`, {
      email: 'nonexistent@test.com',
      password: '12345',
    });
    assert(fakeRes.status === 401, `Nonexistent user returns HTTP 401 (got ${fakeRes.status})`);
  }

  // G) Attempt to send manually supplied role in login request
  console.log('\n--- Test G: Client-Supplied Role Ignored ---');
  const spoofRes = await post(`${BACKEND_URL}/api/auth/login`, {
    email: 'saied@engineer.com',
    password: '12345',
    role: 'Owner', // Attacker attempts to claim Owner role
    Role: 'Owner',
  });
  assert(spoofRes.status === 200, `Login succeeds (got ${spoofRes.status})`);
  assert(spoofRes.body?.role === 'Engineer', `Role remains server-verified 'Engineer' regardless of client claim (got ${spoofRes.body?.role})`);

  // H) Attempt to access another role's protected API directly -> HTTP 403
  console.log('\n--- Test H: Role-Based Authorization Enforcement ---');
  // Engineer token attempting to access Owner-only endpoint
  const engToOwnerRes = await get(`${BACKEND_URL}/api/owner/users`, {
    Authorization: `Bearer ${engToken}`,
  });
  assert(engToOwnerRes.status === 403, `Engineer token calling /api/owner/users returns HTTP 403 Forbidden (got ${engToOwnerRes.status})`);

  // Accountant token attempting to access Owner-only endpoint
  const acctToOwnerRes = await get(`${BACKEND_URL}/api/owner/users`, {
    Authorization: `Bearer ${acctToken}`,
  });
  assert(acctToOwnerRes.status === 403, `Accountant token calling /api/owner/users returns HTTP 403 Forbidden (got ${acctToOwnerRes.status})`);

  // Warehouse token attempting to access Accountant-only endpoint
  const whToAcctRes = await get(`${BACKEND_URL}/api/accountant/invoices`, {
    Authorization: `Bearer ${whToken}`,
  });
  assert(whToAcctRes.status === 403, `Warehouse token calling /api/accountant/invoices returns HTTP 403 Forbidden (got ${whToAcctRes.status})`);

  // Owner token successfully accessing Owner-only endpoint
  const ownerToOwnerRes = await get(`${BACKEND_URL}/api/owner/users`, {
    Authorization: `Bearer ${ownerToken}`,
  });
  assert(ownerToOwnerRes.status === 200, `Owner token calling /api/owner/users returns HTTP 200 OK (got ${ownerToOwnerRes.status})`);

  // I) Unauthenticated protected API request -> HTTP 401
  console.log('\n--- Test I: Unauthenticated Access Rejected ---');
  const unauthOwner = await get(`${BACKEND_URL}/api/owner/users`);
  assert(unauthOwner.status === 401, `Unauthenticated request to /api/owner/users returns HTTP 401 Unauthorized (got ${unauthOwner.status})`);

  const unauthAcct = await get(`${BACKEND_URL}/api/accountant/invoices`);
  assert(unauthAcct.status === 401, `Unauthenticated request to /api/accountant/invoices returns HTTP 401 Unauthorized (got ${unauthAcct.status})`);

  const unauthExpenses = await get(`${BACKEND_URL}/api/expenses`);
  assert(unauthExpenses.status === 401, `Unauthenticated request to /api/expenses returns HTTP 401 Unauthorized (got ${unauthExpenses.status})`);

  // Registration disabled check
  console.log('\n--- Registration Disabled Check ---');
  const regRes = await post(`${BACKEND_URL}/api/auth/register`, {
    email: 'hacker@test.com',
    password: 'password',
  });
  assert(regRes.status === 403, `Public registration returns HTTP 403 Forbidden (got ${regRes.status})`);

  console.log('\n========================================');
  console.log(`SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log('========================================');
  if (failed > 0) process.exit(1);
}

runTests().catch(err => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
