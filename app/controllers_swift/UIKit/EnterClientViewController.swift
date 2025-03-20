struct EnterClientView: View {
    @ObservedObject var viewModel: ClientDetailViewModel
    
    var body: some View {
        Form {
            Section(header: Text("Client Information")) {
                TextField("First Name", text: $viewModel.firstName)
                TextField("Last Name", text: $viewModel.lastName)
                TextField("Company", text: $viewModel.company)
                TextField("Phone", text: $viewModel.phone)
                TextField("Email", text: $viewModel.email)
            }
            
            Section {
                Button(action: saveChanges) {
                    Text("Save Changes")
                        .frame(maxWidth: .infinity)
                        .padding()
                        .background(Color.green)
                        .foregroundColor(.white)
                        .cornerRadius(8)
                }
            }
        }
        .navigationTitle("Edit Client")
    }
    
    private func saveChanges() {
        print("Saving changes for: \(viewModel.fullName)")
    }
}