import fs from 'fs';
import path from 'path';

const BACKEND_URL = 'http://localhost:5000';

async function login(email, password) {
  const res = await fetch(`${BACKEND_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  if (!res.ok) {
    throw new Error(`Login failed for ${email}: ${res.status} ${await res.text()}`);
  }
  return await res.json();
}

async function runTests() {
  console.log('=== STARTING WORKSHOP BRANDING TESTS ===\n');

  // 1. Auth Logins
  console.log('--- 1. Authenticating Accounts ---');
  const ownerAuth = await login('saied@owner.com', '12345');
  console.log('✓ Owner login successful. Role:', ownerAuth.role);

  const acctAuth = await login('saied@accountant.com', '12345');
  console.log('✓ Accountant login successful. Role:', acctAuth.role);

  const engAuth = await login('saied@engineer.com', '12345');
  console.log('✓ Engineer login successful. Role:', engAuth.role);

  const whAuth = await login('saied@warehouse.com', '12345');
  console.log('✓ Warehouse login successful. Role:', whAuth.role);

  // 2. GET Settings as Owner & Other Roles
  console.log('\n--- 2. Testing GET /api/settings/workshop Permissions ---');
  const getAsOwner = await fetch(`${BACKEND_URL}/api/settings/workshop`, {
    headers: { 'Authorization': `Bearer ${ownerAuth.token}` }
  });
  console.log('Owner GET status:', getAsOwner.status);
  const ownerSettings = await getAsOwner.json();
  console.log('Current Settings:', JSON.stringify(ownerSettings, null, 2));

  const getAsAcct = await fetch(`${BACKEND_URL}/api/settings/workshop`, {
    headers: { 'Authorization': `Bearer ${acctAuth.token}` }
  });
  console.log('Accountant GET status:', getAsAcct.status, '(Must be 200 OK)');
  if (getAsAcct.status !== 200) throw new Error('Accountant cannot read branding!');

  const getAsEng = await fetch(`${BACKEND_URL}/api/settings/workshop`, {
    headers: { 'Authorization': `Bearer ${engAuth.token}` }
  });
  console.log('Engineer GET status:', getAsEng.status, '(Must be 200 OK)');
  if (getAsEng.status !== 200) throw new Error('Engineer cannot read branding!');

  const getAsWh = await fetch(`${BACKEND_URL}/api/settings/workshop`, {
    headers: { 'Authorization': `Bearer ${whAuth.token}` }
  });
  console.log('Warehouse GET status:', getAsWh.status, '(Must be 200 OK)');
  if (getAsWh.status !== 200) throw new Error('Warehouse cannot read branding!');

  // 3. Security: Non-Owner Cannot Edit Settings
  console.log('\n--- 3. Testing Role Authorization: Non-Owner Cannot Edit ---');
  const acctPut = await fetch(`${BACKEND_URL}/api/settings/workshop`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${acctAuth.token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ companyName: 'Hacked By Accountant' })
  });
  console.log('Accountant PUT status:', acctPut.status, '(Must be 403 Forbidden)');
  if (acctPut.status !== 403) throw new Error('Security flaw: Accountant was able to call PUT settings!');

  const engPut = await fetch(`${BACKEND_URL}/api/settings/workshop`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${engAuth.token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ companyName: 'Hacked By Engineer' })
  });
  console.log('Engineer PUT status:', engPut.status, '(Must be 403 Forbidden)');
  if (engPut.status !== 403) throw new Error('Security flaw: Engineer was able to call PUT settings!');

  const whPut = await fetch(`${BACKEND_URL}/api/settings/workshop`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${whAuth.token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ companyName: 'Hacked By Warehouse' })
  });
  console.log('Warehouse PUT status:', whPut.status, '(Must be 403 Forbidden)');
  if (whPut.status !== 403) throw new Error('Security flaw: Warehouse was able to call PUT settings!');

  // 4. Logo static file serving test
  console.log('\n--- 4. Testing Logo Static File Serving ---');
  const logoUrlToTest = '/uploads/branding/sos_logo.jpeg';
  const logoRes = await fetch(`${BACKEND_URL}${logoUrlToTest}`);
  console.log(`GET ${logoUrlToTest} status:`, logoRes.status, 'Content-Type:', logoRes.headers.get('content-type'));
  if (logoRes.status !== 200) throw new Error('Logo file failed to serve over HTTP!');
  const logoBuffer = await logoRes.arrayBuffer();
  console.log('✓ Logo downloaded successfully. Bytes:', logoBuffer.byteLength);

  // 5. Test Owner Update Persistence
  console.log('\n--- 5. Testing Settings Update Persistence Lifecycle ---');
  const updatePayload = {
    companyName: 'Star Auto Center Temporary Test',
    phone: '+20 111 222 3333',
    address: 'Cairo, Egypt Test Street',
    email: 'test@starautocenter.com',
    currency: 'EGP'
  };

  const updateRes = await fetch(`${BACKEND_URL}/api/settings/workshop`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${ownerAuth.token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatePayload)
  });
  console.log('Owner PUT status:', updateRes.status);
  const updatedData = await updateRes.json();
  console.log('Updated data:', updatedData);

  // Re-fetch via GET to verify persistence
  const verifyGet = await fetch(`${BACKEND_URL}/api/settings/workshop`, {
    headers: { 'Authorization': `Bearer ${ownerAuth.token}` }
  });
  const reloadedData = await verifyGet.json();
  console.log('Reloaded data via GET:', reloadedData.companyName, reloadedData.phone);
  if (reloadedData.companyName !== updatePayload.companyName) {
    throw new Error('Persistence verification failed: updated name did not match!');
  }

  // Restore canonical settings as requested by User
  console.log('\n--- 6. Restoring Canonical Settings as Required ---');
  const canonicalPayload = {
    companyName: 'SOS Motor Works',
    phone: '+20 100 933 4747',
    address: 'شارع شنزو آبي، الحي العاشر، مدينة نصر، القاهرة، بجوار سنتر شبانة',
    email: 'info@sosmotorworks.com',
    currency: 'EGP'
  };
  const restoreRes = await fetch(`${BACKEND_URL}/api/settings/workshop`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${ownerAuth.token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(canonicalPayload)
  });
  console.log('Restore PUT status:', restoreRes.status);
  const finalSettings = await restoreRes.json();
  // 7. Testing Logo Security & Upload/Delete Operations
  console.log('\n--- 7. Testing Logo Security & Upload/Delete Endpoints ---');
  // Non-owner cannot upload logo
  const fakeFormData = new FormData();
  fakeFormData.append('file', new Blob(['test image data'], { type: 'image/png' }), 'test.png');
  const acctLogoRes = await fetch(`${BACKEND_URL}/api/settings/workshop/logo`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${acctAuth.token}` },
    body: fakeFormData
  });
  console.log('Accountant Logo Upload status:', acctLogoRes.status, '(Must be 403 Forbidden)');
  if (acctLogoRes.status !== 403) throw new Error('Security flaw: Accountant was able to upload logo!');

  const acctLogoDel = await fetch(`${BACKEND_URL}/api/settings/workshop/logo`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${acctAuth.token}` }
  });
  console.log('Accountant Logo Delete status:', acctLogoDel.status, '(Must be 403 Forbidden)');
  if (acctLogoDel.status !== 403) throw new Error('Security flaw: Accountant was able to delete logo!');

  // Owner upload logo
  const testLogoData = fs.readFileSync('sos_logo.jpeg');
  const ownerFormData = new FormData();
  ownerFormData.append('file', new Blob([testLogoData], { type: 'image/jpeg' }), 'uploaded_logo.jpeg');
  const ownerUploadRes = await fetch(`${BACKEND_URL}/api/settings/workshop/logo`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${ownerAuth.token}` },
    body: ownerFormData
  });
  console.log('Owner Logo Upload status:', ownerUploadRes.status);
  const uploadResult = await ownerUploadRes.json();
  console.log('Uploaded Logo URL:', uploadResult.logoUrl);
  if (!uploadResult.logoUrl) throw new Error('Upload logo did not return a valid logoUrl!');

  // Verify uploaded logo file actually exists on disk
  const uploadedPathOnDisk = path.join('wwwroot', uploadResult.logoUrl.replace('/uploads/branding/', 'uploads/branding/'));
  if (!fs.existsSync(uploadedPathOnDisk)) {
    throw new Error(`Uploaded file not found on disk at ${uploadedPathOnDisk}`);
  }
  console.log('✓ Uploaded logo verified to exist on disk at:', uploadedPathOnDisk);

  // Restore canonical logo reference in DB
  const restoreLogoRes = await fetch(`${BACKEND_URL}/api/settings/workshop`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${ownerAuth.token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      companyName: 'SOS Motor Works',
      phone: '+20 100 933 4747',
      address: 'شارع شنزو آبي، الحي العاشر، مدينة نصر، القاهرة، بجوار سنتر شبانة',
      email: 'info@sosmotorworks.com',
      currency: 'EGP',
      logoUrl: '/uploads/branding/sos_logo.jpeg'
    })
  });
  console.log('Restore Logo status:', restoreLogoRes.status);
  const finalCheck = await (await fetch(`${BACKEND_URL}/api/settings/workshop`, {
    headers: { 'Authorization': `Bearer ${ownerAuth.token}` }
  })).json();
  console.log('Final canonical settings check:', finalCheck);
  if (finalCheck.logoUrl !== '/uploads/branding/sos_logo.jpeg') {
    throw new Error('LogoUrl was not restored correctly!');
  }
  // Also clean up the temporary uploaded test file
  if (fs.existsSync(uploadedPathOnDisk) && !uploadedPathOnDisk.endsWith('sos_logo.jpeg')) {
    fs.unlinkSync(uploadedPathOnDisk);
  }

  console.log('\n=== ALL WORKSHOP BRANDING API TESTS PASSED SUCCESSFULLY! ===');
}

runTests().catch(err => {
  console.error('\n❌ TEST FAILED:', err);
  process.exit(1);
});
