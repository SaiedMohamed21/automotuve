using Microsoft.AspNetCore.SignalR;

namespace StarAutoCenter.Hubs
{
    public class DataSyncHub : Hub
    {
        public async Task BroadcastDataChanged(string category)
        {
            await Clients.All.SendAsync("DataChanged", category);
        }
    }
}
