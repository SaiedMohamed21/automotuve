using StarAutoCenter.DTOs.Suppliers;

namespace StarAutoCenter.Services.Suppliers
{
    public interface ISupplierService
    {
        Task<SupplierDashboardSummaryDto> GetSummaryAsync();
        Task<List<SupplierDto>> GetSuppliersAsync(string? search = null, string? filter = null);
        Task<SupplierDto?> GetSupplierByIdAsync(int id);
        Task<SupplierDto> CreateSupplierAsync(CreateSupplierDto dto);
        Task<SupplierDto?> UpdateSupplierAsync(int id, UpdateSupplierDto dto);
        Task<bool> DeleteSupplierAsync(int id);

        Task<string> GetNextPurchaseNumberAsync();
        Task<List<SupplierPurchaseDto>> GetPurchasesAsync(int supplierId);
        Task<SupplierPurchaseDto?> GetPurchaseByIdAsync(int purchaseId);
        Task<SupplierPurchaseDto> CreatePurchaseAsync(int supplierId, CreateSupplierPurchaseDto dto);

        Task<List<SupplierPaymentDto>> GetPaymentsAsync(int supplierId);
        Task<SupplierPaymentDto> CreatePaymentAsync(int supplierId, CreateSupplierPaymentDto dto, string? createdBy = null);

        Task<SupplierStatementDto> GetStatementAsync(int supplierId);
    }
}
