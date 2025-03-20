import SwiftUI

struct ClientDetailView: View {
    @StateObject var viewModel: ClientDetailViewModel

    var body: some View {
        VStack(alignment: .leading, spacing: 10) {
            Text("Client Details").font(.title).bold()
            Text("Full Name: \(viewModel.fullName)")
            Text("Company: \(viewModel.company)")
            Text("Phone: \(viewModel.phone)")
            Text("Email: \(viewModel.email)")
            Text("Address: \(viewModel.address)")
            Text("City/State: \(viewModel.cityState)")
            Text("Invoice: \(viewModel.invoice)")
            Text("Project: \(viewModel.project)")
            Text("Proposal: \(viewModel.proposal)")
            
            Button(action: editAction) {
                Text("Edit Client")
                    .padding()
                    .background(Color.blue)
                    .foregroundColor(.white)
                    .cornerRadius(8)
            }
        }
        .padding()
    }
    
    private func editAction() {
        print("Editing client: \(viewModel.fullName)")
        let editView = EnterClientView(viewModel: viewModel)
        if let windowScene = UIApplication.shared.connectedScenes.first as? UIWindowScene {
            let window = UIWindow(windowScene: windowScene)
            window.rootViewController = UIHostingController(rootView: editView)
            window.makeKeyAndVisible()
        }
    }
}