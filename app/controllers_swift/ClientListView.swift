import SwiftUI
import Combine

class ClientViewModel: ObservableObject {
    @Published var isLoading = false
    @Published var clientList: [Client] = []

    func fetchClients() {
        isLoading = true
        // Simulated network request
        DispatchQueue.global().asyncAfter(deadline: .now() + 1.5) {
            DispatchQueue.main.async {
                self.clientList = [
                    Client(id: "1", title: "Client A"),
                    Client(id: "2", title: "Client B")
                ]
                self.isLoading = false
            }
        }
    }
    
    func openClientDetail(client: Client) {
        print("Opening details for \(client.title)")
    }
    
    func deleteClient(client: Client) {
        print("Deleting client: \(client.title)")
        clientList.removeAll { $0.id == client.id }
    }
}

struct Client: Identifiable {
    let id: String
    let title: String
}

struct ClientListView: View {
    @StateObject private var viewModel = ClientViewModel()

    var body: some View {
        NavigationView {
            List {
                if viewModel.isLoading {
                    ProgressView("Loading...")
                } else {
                    ForEach(viewModel.clientList) { client in
                        Button(action: {
                            viewModel.openClientDetail(client: client)
                        }) {
                            Text(client.title)
                        }
                    }
                    .onDelete(perform: { indexSet in
                        if let index = indexSet.first {
                            viewModel.deleteClient(client: viewModel.clientList[index])
                        }
                    })
                }
            }
            .navigationTitle("Clients")
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button("Refresh") {
                        viewModel.fetchClients()
                    }
                }
            }
            .onAppear {
                viewModel.fetchClients()
            }
        }
    }
}

// Preview for SwiftUI
struct ClientListView_Previews: PreviewProvider {
    static var previews: some View {
        ClientListView()
    }
}