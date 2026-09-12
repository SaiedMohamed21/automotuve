function getApiOrigin(): string {
  if (import.meta.env.VITE_API_ORIGIN) {
    return import.meta.env.VITE_API_ORIGIN;
  }
  if (typeof window !== "undefined") {
    if (window.location.hostname === "localhost" && (window.location.port === "8443" || window.location.port === "5173")) {
      return "http://localhost:5000";
    }
    return window.location.origin;
  }
  return "http://localhost:5000";
}

export const API_ORIGIN = getApiOrigin();
export const API_BASE_URL = `${API_ORIGIN}/api`;

export const getAuthToken = () => localStorage.getItem("token");
export const setAuthToken = (token: string) => localStorage.setItem("token", token);
export const removeAuthToken = () => localStorage.removeItem("token");

export interface WorkshopSettings {
  id: number;
  companyName: string;
  address?: string;
  phone?: string;
  email?: string;
  currency: string;
  logoUrl?: string;
  updatedAt?: string;
  updatedBy?: string;
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getAuthToken();
  const isFormData = typeof FormData !== "undefined" && options.body instanceof FormData;
  const headers: HeadersInit = {
    ...(!isFormData ? { "Content-Type": "application/json" } : {}),
    ...(options.headers || {}),
  };

  if (token) {
    (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Request failed with status ${response.status}`);
  }

  if (response.status === 204) {
    return {} as T;
  }

  return response.json();
}

export const api = {
  // Auth
  login: (data: any) => request<any>("/auth/login", { method: "POST", body: JSON.stringify(data) }),
  register: (data: any) => request<any>("/auth/register", { method: "POST", body: JSON.stringify(data) }),
  getMe: () => request<any>("/auth/me"),

  // Engineer - Dashboard
  getEngineerDashboard: () => request<any>("/dashboard"),

  // Engineer - Customers
  getCustomers: (search?: string) => request<any[]>(`/customers${search ? `?search=${encodeURIComponent(search)}` : ""}`),
  getCustomerById: (id: number) => request<any>(`/customers/${id}`),
  createCustomer: (data: any) => request<any>("/customers", { method: "POST", body: JSON.stringify(data) }),
  updateCustomer: (id: number, data: any) => request<any>(`/customers/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteCustomer: (id: number) => request<any>(`/customers/${id}`, { method: "DELETE" }),

  // Engineer - Vehicles
  getVehicles: (search?: string) => request<any[]>(`/vehicles${search ? `?search=${encodeURIComponent(search)}` : ""}`),
  getVehicleById: (id: number) => request<any>(`/vehicles/${id}`),
  createVehicle: (data: any) => request<any>("/vehicles", { method: "POST", body: JSON.stringify(data) }),
  updateVehicle: (id: number, data: any) => request<any>(`/vehicles/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  changeVehicleOwner: (id: number, customerId: number) =>
    request<any>(`/vehicles/${id}/change-owner`, { method: "POST", body: JSON.stringify({ customerId }) }),

  // Engineer - Job Orders
  getJobOrders: (params?: { search?: string; status?: string; sortBy?: string }) => {
    const query = new URLSearchParams();
    if (params?.search) query.append("search", params.search);
    if (params?.status) query.append("status", params.status);
    if (params?.sortBy) query.append("sortBy", params.sortBy);
    const qStr = query.toString();
    return request<any[]>(`/job-orders${qStr ? `?${qStr}` : ""}`);
  },
  getJobOrderById: (id: number) => request<any>(`/job-orders/by-id/${id}`),
  getJobOrderByNumber: (number: string) => request<any>(`/job-orders/${number}`),
  getNextJobOrderNumber: () => request<{ number: string }>("/job-orders/next-number"),
  createJobOrder: (data: any) => request<any>("/job-orders", { method: "POST", body: JSON.stringify(data) }),
  updateJobOrderStatus: (idOrNumber: number | string, status: string) =>
    request<any>(`/job-orders/${idOrNumber}/status`, { method: "PUT", body: JSON.stringify({ status }) }),

  // Warehouse
  getWarehouseDashboard: () => request<any>("/warehouse/dashboard"),
  getParts: (params?: { search?: string; category?: string; status?: string }) => {
    const query = new URLSearchParams();
    if (params?.search) query.append("search", params.search);
    if (params?.category) query.append("category", params.category);
    if (params?.status) query.append("status", params.status);
    const qStr = query.toString();
    return request<any[]>(`/warehouse/parts${qStr ? `?${qStr}` : ""}`);
  },
  getPartById: (id: number) => request<any>(`/warehouse/parts/${id}`),
  createPart: (data: any) => request<any>("/warehouse/parts", { method: "POST", body: JSON.stringify(data) }),
  getWarehouseJobs: (params?: { search?: string; status?: string } | string) => {
    let search = typeof params === "string" ? params : params?.search;
    let status = typeof params === "object" ? params?.status : undefined;
    const query = new URLSearchParams();
    if (search) query.append("search", search);
    if (status && status !== "All") query.append("status", status);
    const qStr = query.toString();
    return request<any[]>(`/warehouse/jobs${qStr ? `?${qStr}` : ""}`);
  },
  getIssuedParts: (joNumber: string) => request<any[]>(`/warehouse/jobs/${joNumber}/parts`),
  issuePartsToJobOrder: (joNumber: string, parts: { partId: number; qty: number }[]) =>
    request<any[]>(`/warehouse/jobs/${joNumber}/parts`, { method: "POST", body: JSON.stringify({ parts }) }),
  removeIssuedPart: (joNumber: string, partId: number) =>
    request<any>(`/warehouse/jobs/${joNumber}/parts/${partId}`, { method: "DELETE" }),
  confirmPartsIssued: (joNumber: string) => request<any>(`/warehouse/jobs/${joNumber}/confirm`, { method: "POST" }),
  getStockMovements: (search?: string) => request<any[]>(`/warehouse/movements${search ? `?search=${encodeURIComponent(search)}` : ""}`),
  updateStockCount: (data: any) => request<any>("/warehouse/stock-count", { method: "POST", body: JSON.stringify(data) }),

  // Owner
  getOwnerDashboard: () => request<any>("/owner/dashboard"),
  getOwnerReports: () => request<any>("/owner/reports"),
  getUsers: () => request<any[]>("/owner/users"),
  createUser: (data: any) => request<any>("/owner/users", { method: "POST", body: JSON.stringify(data) }),
  updateUser: (id: string, data: any) => request<any>(`/owner/users/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  toggleUserStatus: (id: string) => request<any>(`/owner/users/${id}/toggle-status`, { method: "PUT" }),
  changeUserPassword: (id: string, password: string) => request<any>(`/owner/users/${id}/change-password`, { method: "POST", body: JSON.stringify({ password }) }),
  getSettings: () => request<any>("/owner/settings"),
  updateSettings: (data: any) => request<any>("/owner/settings", { method: "PUT", body: JSON.stringify(data) }),

  // Accountant
  getAccountantDashboard: () => request<any>("/accountant/dashboard"),
  getAccountantJobs: (params?: { search?: string; status?: string }) => {
    const query = new URLSearchParams();
    if (params?.search) query.append("search", params.search);
    if (params?.status) query.append("status", params.status);
    const qStr = query.toString();
    return request<any[]>(`/accountant/jobs${qStr ? `?${qStr}` : ""}`);
  },
  getAccountantJobDetails: (joNumber: string) => request<any>(`/accountant/jobs/${joNumber}`),
  saveWorkFound: (joNumber: string, items: { description: string; approved: boolean }[]) =>
    request<any>(`/accountant/jobs/${joNumber}/work-found`, { method: "POST", body: JSON.stringify({ items }) }),
  createInvoice: (joNumber: string, data: { laborAmount: number; additionalExpenses: { description: string; amount: number }[] }) =>
    request<any>(`/accountant/jobs/${joNumber}/invoice`, { method: "POST", body: JSON.stringify(data) }),
  getInvoices: (params?: { search?: string; paymentStatus?: string }) => {
    const query = new URLSearchParams();
    if (params?.search) query.append("search", params.search);
    if (params?.paymentStatus) query.append("paymentStatus", params.paymentStatus);
    const qStr = query.toString();
    return request<any[]>(`/accountant/invoices${qStr ? `?${qStr}` : ""}`);
  },
  getInvoiceDetails: (invoiceNumber: string) => request<any>(`/accountant/invoices/${invoiceNumber}`),
  getPayments: (search?: string) => request<any[]>(`/accountant/payments${search ? `?search=${encodeURIComponent(search)}` : ""}`),
  recordPayment: (data: { invoiceNumber: string; amount: number; method: string; note?: string }) =>
    request<any>("/accountant/payments", { method: "POST", body: JSON.stringify(data) }),
  updatePartPrices: (partId: number, data: { purchasePrice: number; sellingPrice: number }) =>
    request<any>(`/accountant/parts/${partId}/prices`, { method: "PUT", body: JSON.stringify(data) }),

  // Payroll & Technicians
  getTechnicians: () => request<any[]>("/payroll/technicians"),
  getTechnicianById: (id: string) => request<any>(`/payroll/technicians/${id}`),
  createTechnician: (data: any) => request<any>("/payroll/technicians", { method: "POST", body: JSON.stringify(data) }),
  updateTechnician: (id: string, data: any) => request<any>(`/payroll/technicians/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteTechnician: (id: string) => request<any>(`/payroll/technicians/${id}`, { method: "DELETE" }),

  getAttendanceRecords: (params?: { technicianId?: string; startDate?: string; endDate?: string }) => {
    const query = new URLSearchParams();
    if (params?.technicianId) query.append("technicianId", params.technicianId);
    if (params?.startDate) query.append("startDate", params.startDate);
    if (params?.endDate) query.append("endDate", params.endDate);
    const qStr = query.toString();
    return request<any[]>(`/payroll/attendance${qStr ? `?${qStr}` : ""}`);
  },
  markAttendance: (data: { id?: string; technicianId: string; date: string; status: string; dailyRate?: number; notes?: string }) =>
    request<any>("/payroll/attendance", { method: "POST", body: JSON.stringify(data) }),

  getPayrollTransactions: (technicianId?: string) => {
    const query = new URLSearchParams();
    if (technicianId) query.append("technicianId", technicianId);
    const qStr = query.toString();
    return request<any[]>(`/payroll/transactions${qStr ? `?${qStr}` : ""}`);
  },
  recordPayrollTransaction: (data: any) =>
    request<any>("/payroll/transactions", { method: "POST", body: JSON.stringify(data) }),
  deletePayrollTransaction: (id: string) =>
    request<any>(`/payroll/transactions/${id}`, { method: "DELETE" }),

  // Suppliers
  getSuppliers: (params?: { search?: string; filter?: string }) => {
    const query = new URLSearchParams();
    if (params?.search) query.append("search", params.search);
    if (params?.filter) query.append("filter", params.filter);
    const qStr = query.toString();
    return request<any[]>(`/suppliers${qStr ? `?${qStr}` : ""}`);
  },
  getSupplierSummary: () => request<any>("/suppliers/summary"),
  getSupplierById: (id: number) => request<any>(`/suppliers/${id}`),
  createSupplier: (data: any) => request<any>("/suppliers", { method: "POST", body: JSON.stringify(data) }),
  updateSupplier: (id: number, data: any) => request<any>(`/suppliers/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteSupplier: (id: number) => request<any>(`/suppliers/${id}`, { method: "DELETE" }),
  getNextPurchaseNumber: () => request<{ number: string }>("/suppliers/next-purchase-number"),
  getSupplierPurchases: (id: number) => request<any[]>(`/suppliers/${id}/purchases`),
  getSupplierPurchaseById: (purchaseId: number) => request<any>(`/suppliers/purchases/${purchaseId}`),
  createSupplierPurchase: (supplierId: number, data: any) =>
    request<any>(`/suppliers/${supplierId}/purchases`, { method: "POST", body: JSON.stringify(data) }),
  getSupplierPayments: (id: number) => request<any[]>(`/suppliers/${id}/payments`),
  recordSupplierPayment: (supplierId: number, data: any) =>
    request<any>(`/suppliers/${supplierId}/payments`, { method: "POST", body: JSON.stringify(data) }),
  getSupplierStatement: (id: number) => request<any>(`/suppliers/${id}/statement`),

  // Expenses (Operating / General Workshop Expenses)
  getExpenses: (params?: { dateFrom?: string; dateTo?: string; category?: string; paymentMethod?: string; search?: string; includeVoided?: boolean }) => {
    const query = new URLSearchParams();
    if (params?.dateFrom) query.append("dateFrom", params.dateFrom);
    if (params?.dateTo) query.append("dateTo", params.dateTo);
    if (params?.category && params.category !== "All") query.append("category", params.category);
    if (params?.paymentMethod && params.paymentMethod !== "All") query.append("paymentMethod", params.paymentMethod);
    if (params?.search) query.append("search", params.search);
    if (params?.includeVoided) query.append("includeVoided", "true");
    const qStr = query.toString();
    return request<any[]>(`/expenses${qStr ? `?${qStr}` : ""}`);
  },
  getExpensesSummary: (params?: { dateFrom?: string; dateTo?: string }) => {
    const query = new URLSearchParams();
    if (params?.dateFrom) query.append("dateFrom", params.dateFrom);
    if (params?.dateTo) query.append("dateTo", params.dateTo);
    const qStr = query.toString();
    return request<any>(`/expenses/summary${qStr ? `?${qStr}` : ""}`);
  },
  getExpenseById: (id: number) => request<any>(`/expenses/${id}`),
  createExpense: (data: any) => request<any>("/expenses", { method: "POST", body: JSON.stringify(data) }),
  updateExpense: (id: number, data: any) => request<any>(`/expenses/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  voidExpense: (id: number, reason?: string) =>
    request<any>(`/expenses/${id}/void`, { method: "POST", body: JSON.stringify({ reason }) }),
  deleteExpense: (id: number) => request<any>(`/expenses/${id}`, { method: "DELETE" }),

  // Workshop Branding & Settings
  getWorkshopSettings: () => request<WorkshopSettings>("/settings/workshop"),
  updateWorkshopSettings: (data: Partial<WorkshopSettings>) =>
    request<WorkshopSettings>("/settings/workshop", { method: "PUT", body: JSON.stringify(data) }),
  uploadWorkshopLogo: (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    return request<{ logoUrl: string; message: string }>("/settings/workshop/logo", {
      method: "POST",
      body: formData,
    });
  },
  deleteWorkshopLogo: () => request<{ message: string }>("/settings/workshop/logo", { method: "DELETE" }),
};
