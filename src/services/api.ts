const API_BASE_URL = "http://localhost:5000/api";

export const getAuthToken = () => localStorage.getItem("token");
export const setAuthToken = (token: string) => localStorage.setItem("token", token);
export const removeAuthToken = () => localStorage.removeItem("token");

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getAuthToken();
  const headers: HeadersInit = {
    "Content-Type": "application/json",
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
  getJobOrderById: (id: number) => request<any>(`/job-orders/${id}`),
  getJobOrderByNumber: (number: string) => request<any>(`/job-orders/${number}`),
  createJobOrder: (data: any) => request<any>("/job-orders", { method: "POST", body: JSON.stringify(data) }),
  updateJobOrderStatus: (id: number, status: string) =>
    request<any>(`/job-orders/${id}/status`, { method: "PUT", body: JSON.stringify({ status }) }),

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
  getWarehouseJobs: (search?: string) => request<any[]>(`/warehouse/jobs${search ? `?search=${encodeURIComponent(search)}` : ""}`),
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
  getSettings: () => request<any>("/owner/settings"),
  updateSettings: (data: any) => request<any>("/owner/settings", { method: "PUT", body: JSON.stringify(data) }),
};
