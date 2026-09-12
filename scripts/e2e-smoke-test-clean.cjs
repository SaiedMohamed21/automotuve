const fs = require('fs');
const path = require('path');
const http = require('http');

const API_BASE = 'http://127.0.0.1:5000';

async function request(endpoint, options = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(endpoint, API_BASE);
    const reqOptions = {
      method: options.method || 'GET',
      headers: options.headers || {},
    };

    const req = http.request(url, reqOptions, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        let json = null;
        try {
          json = JSON.parse(data);
        } catch (e) {
          json = data;
        }
        resolve({ status: res.statusCode, headers: res.headers, data: json });
      });
    });

    req.on('error', (err) => reject(err));

    if (options.body) {
      req.write(typeof options.body === 'string' ? options.body : JSON.stringify(options.body));
    }
    req.end();
  });
}

async function login(email, password) {
  const res = await request('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: { email, password },
  });
  if (res.status === 200 && res.data.token) {
    return res.data.token;
  }
  throw new Error(`Login failed for ${email}: ${res.status} ${JSON.stringify(res.data)}`);
}

async function runSmokeTest() {
  console.log('==================================================');
  console.log('STARTING SINGLE CLEAN E2E SMOKE TEST PASS');
  console.log('==================================================\n');

  const evidence = {};
  const testMatrix = [];

  try {
    // 1. OWNER INITIAL CHECK
    console.log('--- 1. OWNER INITIAL CHECK ---');
    const ownerToken = await login('saied@owner.com', '12345');
    const settingsRes = await request('/api/settings/workshop', {
      headers: { 'Authorization': `Bearer ${ownerToken}` }
    });
    console.log('Workshop Branding:', settingsRes.data);
    
    const ownerDash1 = await request('/api/owner/dashboard', {
      headers: { 'Authorization': `Bearer ${ownerToken}` }
    });
    console.log('Owner Dashboard Initial:', ownerDash1.data);
    
    testMatrix.push({
      test: '1. Owner Dashboard & Branding Load',
      result: settingsRes.status === 200 && ownerDash1.status === 200 ? 'PASS' : 'FAIL',
      evidence: `Company: ${settingsRes.data.companyName}, TotalCollected: ${ownerDash1.data.totalCollected}`
    });

    // 2. CUSTOMER + VEHICLE CREATION
    console.log('\n--- 2. CUSTOMER & VEHICLE CREATION ---');
    const engToken = await login('saied@engineer.com', '12345');
    
    const custRes = await request('/api/customers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${engToken}`
      },
      body: {
        name: 'SmokeTest Customer',
        phone: '01099998888',
        email: 'smoke@customer.com',
        notes: 'Temporary E2E Smoke Test Customer'
      }
    });
    console.log(`Customer Creation status: ${custRes.status}`, custRes.data);
    const customerId = custRes.data.id;
    evidence.customerId = customerId;

    const vehRes = await request('/api/vehicles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${engToken}`
      },
      body: {
        customerId: customerId,
        make: 'Toyota',
        model: 'Corolla 2023',
        plate: 'SMK-9999',
        year: '2023',
        vin: 'VIN-SMOKE-9999',
        km: '15000'
      }
    });
    console.log(`Vehicle Creation status: ${vehRes.status}`, vehRes.data);
    const vehicleId = vehRes.data.id;
    evidence.vehicleId = vehicleId;

    testMatrix.push({
      test: '2. Customer & Vehicle Creation',
      result: custRes.status === 201 && vehRes.status === 201 ? 'PASS' : 'FAIL',
      evidence: `CustID: ${customerId}, VehID: ${vehicleId}, Plate: SMK-9999`
    });

    // 3. ENGINEER JOB ORDER CREATION
    console.log('\n--- 3. ENGINEER CREATES JOB ORDER ---');
    const joRes = await request('/api/job-orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${engToken}`
      },
      body: {
        customerId: customerId,
        vehicleId: vehicleId,
        type: 'General Maintenance',
        requiredWork: 'Oil & Filter Replacement + Brake Inspection',
        engineer: 'Saied Engineer',
        km: '15000',
        notes: 'Smoke Test Job Order'
      }
    });
    console.log(`Job Order Creation status: ${joRes.status}`, joRes.data);
    const joId = joRes.data.id;
    const joNumber = joRes.data.number;
    evidence.joId = joId;
    evidence.joNumber = joNumber;

    const joDetails = await request(`/api/job-orders/${joNumber}`, {
      headers: { 'Authorization': `Bearer ${engToken}` }
    });
    console.log('Reopened JO Details status:', joDetails.status, 'Status field:', joDetails.data.status);

    testMatrix.push({
      test: '3. Engineer Job Order Creation & Retrieval',
      result: joRes.status === 201 && joDetails.status === 200 ? 'PASS' : 'FAIL',
      evidence: `JONumber: ${joNumber}, Status: ${joDetails.data.status}`
    });

    // 4. WAREHOUSE ISSUES PRODUCTION PART
    console.log('\n--- 4. WAREHOUSE PART ISSUANCE ---');
    const whToken = await login('saied@warehouse.com', '12345');
    
    // Check Part 4 stock before
    const partsListBefore = await request('/api/warehouse/parts', {
      headers: { 'Authorization': `Bearer ${whToken}` }
    });
    const part4Before = (partsListBefore.data || []).find(p => p.id === 4);
    const qtyBefore = part4Before ? part4Before.currentQty : 0;
    evidence.partId = 4;
    evidence.qtyBefore = qtyBefore;
    console.log(`Part 4 (Oil Filter) Qty BEFORE: ${qtyBefore}`);

    // Issue 1 unit of Part 4 to JO
    const issueRes = await request(`/api/warehouse/jobs/${joNumber}/parts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${whToken}`
      },
      body: {
        parts: [
          { partId: 4, qty: 1 }
        ]
      }
    });
    console.log(`Issue Part status: ${issueRes.status}`, issueRes.data);

    // Confirm issue to deduct stock
    const confirmRes = await request(`/api/warehouse/jobs/${joNumber}/confirm`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${whToken}` }
    });
    console.log(`Confirm Issue status: ${confirmRes.status}`, confirmRes.data);

    // Check Part 4 stock after
    const partsListAfter = await request('/api/warehouse/parts', {
      headers: { 'Authorization': `Bearer ${whToken}` }
    });
    const part4After = (partsListAfter.data || []).find(p => p.id === 4);
    const qtyAfter = part4After ? part4After.currentQty : 0;
    evidence.qtyAfter = qtyAfter;
    console.log(`Part 4 (Oil Filter) Qty AFTER: ${qtyAfter} (Expected: ${qtyBefore - 1})`);

    testMatrix.push({
      test: '4. Warehouse Part Issuance & Inventory Decrease',
      result: (issueRes.status === 200 || confirmRes.status === 200) && qtyAfter === (qtyBefore - 1) ? 'PASS' : 'FAIL',
      evidence: `Part 4 Qty: ${qtyBefore} -> ${qtyAfter} (-1 unit)`
    });

    // 5. ACCOUNTANT INVOICE CREATION
    console.log('\n--- 5. ACCOUNTANT INVOICE CREATION ---');
    const acctToken = await login('saied@accountant.com', '12345');
    
    const createInvRes = await request(`/api/accountant/jobs/${joNumber}/invoice`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${acctToken}`
      },
      body: {
        laborAmount: 300,
        additionalExpenses: [
          { description: 'Disposal Fee', amount: 50 }
        ]
      }
    });
    console.log(`Create Invoice status: ${createInvRes.status}`, createInvRes.data);
    const invNumber = createInvRes.data.invoiceNumber;
    const grandTotal = createInvRes.data.grandTotal;
    evidence.invNumber = invNumber;
    evidence.grandTotal = grandTotal;

    testMatrix.push({
      test: '5. Accountant Invoice Generation & Total Calculation',
      result: createInvRes.status === 200 && grandTotal > 0 ? 'PASS' : 'FAIL',
      evidence: `InvNumber: ${invNumber}, GrandTotal: ${grandTotal} EGP`
    });

    // 6. PAYMENTS ADDITION (PARTIAL & FULL)
    console.log('\n--- 6. ACCOUNTANT PAYMENTS ADDITION ---');
    const p1Amount = 100;
    const pay1Res = await request('/api/accountant/payments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${acctToken}`
      },
      body: {
        invoiceNumber: invNumber,
        amount: p1Amount,
        method: 'Cash',
        note: 'First partial payment'
      }
    });
    console.log(`Payment 1 status: ${pay1Res.status}`, pay1Res.data);

    const invDetails1 = await request(`/api/accountant/invoices/${invNumber}`, {
      headers: { 'Authorization': `Bearer ${acctToken}` }
    });
    console.log(`Post-P1 PaymentStatus: ${invDetails1.data.paymentStatus}, Remaining: ${invDetails1.data.remainingAmount}`);

    const p2Amount = invDetails1.data.remainingAmount;
    const pay2Res = await request('/api/accountant/payments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${acctToken}`
      },
      body: {
        invoiceNumber: invNumber,
        amount: p2Amount,
        method: 'Cash',
        note: 'Final settlement payment'
      }
    });
    console.log(`Payment 2 status: ${pay2Res.status}`, pay2Res.data);

    const invDetails2 = await request(`/api/accountant/invoices/${invNumber}`, {
      headers: { 'Authorization': `Bearer ${acctToken}` }
    });
    console.log(`Post-P2 PaymentStatus: ${invDetails2.data.paymentStatus}, PaidAmount: ${invDetails2.data.paidAmount}, Payments Count: ${invDetails2.data.payments.length}`);

    testMatrix.push({
      test: '6. Multi-Payment Processing & Status Update',
      result: pay1Res.status === 200 && pay2Res.status === 200 && invDetails2.data.paymentStatus === 'Paid' && invDetails2.data.payments.length === 2 ? 'PASS' : 'FAIL',
      evidence: `P1: ${p1Amount}, P2: ${p2Amount}, Status: ${invDetails2.data.paymentStatus}, Payments Count: ${invDetails2.data.payments.length}`
    });

    // 7. INVOICE PRINT DETAILS & LINK VERIFICATION
    console.log('\n--- 7. INVOICE DETAILS & PRINT CHECK ---');
    testMatrix.push({
      test: '8. Invoice Details & Job Order Link Verification',
      result: invDetails2.data.jobOrderNumber === joNumber && invDetails2.data.invoiceNumber === invNumber ? 'PASS' : 'FAIL',
      evidence: `InvNumber: ${invDetails2.data.invoiceNumber}, Linked JONumber: ${invDetails2.data.jobOrderNumber}`
    });

    // 8. OWNER DASHBOARD RECONCILIATION
    console.log('\n--- 8. OWNER DASHBOARD RECONCILIATION ---');
    const ownerDash2 = await request('/api/owner/dashboard', {
      headers: { 'Authorization': `Bearer ${ownerToken}` }
    });
    console.log('Owner Dashboard Smoke Test:', ownerDash2.data);
    const expectedCollected = p1Amount + p2Amount;
    const dashMatch = ownerDash2.data.totalCollected === expectedCollected &&
                      ownerDash2.data.operatingExpenses === 0 &&
                      ownerDash2.data.supplierPurchasesTotal === 0 &&
                      ownerDash2.data.totalOutflow === 0;

    testMatrix.push({
      test: '9. Owner Dashboard Financial Reconciliation',
      result: dashMatch ? 'PASS' : 'FAIL',
      evidence: `TotalCollected: ${ownerDash2.data.totalCollected} EGP (Expected ${expectedCollected}), OpEx: ${ownerDash2.data.operatingExpenses}, Outflow: ${ownerDash2.data.totalOutflow}`
    });

    console.log('\n==================================================');
    console.log('SMOKE TEST VERIFICATION MATRIX SUMMARY');
    console.log('==================================================');
    console.table(testMatrix);

    console.log('\nEvidence Summary:', evidence);

  } catch (err) {
    console.error('Smoke test error:', err);
  }
}

runSmokeTest().catch(console.error);
