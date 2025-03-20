import Foundation
import Combine

class ClientDetailViewModel: ObservableObject {
    @Published var customerID: String = ""
    @Published var firstName: String = ""
    @Published var lastName: String = ""
    @Published var fullName: String = ""
    @Published var company: String = ""
    @Published var phone: String = ""
    @Published var email: String = ""
    @Published var address: String = ""
    @Published var city: String = ""
    @Published var state: String = ""
    @Published var country: String = ""
    @Published var cityState: String = ""
    @Published var invoice: String = ""
    @Published var project: String = ""
    @Published var proposal: String = ""
    @Published var idTag: String = ""
    @Published var editHref: String = ""
    @Published var selfHref: String = ""

    init(data: String) {
        parseData(data: data)
    }
    
    private func parseData(data: String) {
        let dataArray = data.split(separator: ":").map { String($0) }
        
        guard dataArray.count >= 14 else {
            print("Invalid data format")
            return
        }
        
        customerID = dataArray[0]
        firstName = dataArray[1]
        lastName = dataArray[2]
        fullName = "\(firstName) \(lastName)"
        company = dataArray[3]
        phone = formatPhoneNumber(dataArray[4])
        email = dataArray[5]
        address = dataArray[6]
        city = dataArray[7]
        state = dataArray[8]
        country = dataArray[9]
        cityState = "\(city). \(state), \(country)"
        invoice = dataArray[10]
        project = dataArray[11]
        proposal = dataArray[12]
        
        let extraData = dataArray[13].replacingOccurrences(of: "xCoLoNx", with: ",").split(separator: ",")
        idTag = extraData.indices.contains(0) ? extraData[0].replacingOccurrences(of: "yCoLoNy", with: ":") : "none"
        selfHref = extraData.indices.contains(1) ? extraData[1].replacingOccurrences(of: "yCoLoNy", with: ":") : "none"
        editHref = extraData.indices.contains(2) ? extraData[2].replacingOccurrences(of: "yCoLoNy", with: ":") : "none"
        
        print("ClientDetailViewModel:: Parsed ID: \(idTag), EditHref: \(editHref), SelfHref: \(selfHref)")
    }

    private func formatPhoneNumber(_ number: String) -> String {
        let regex = try? NSRegularExpression(pattern: "^(...)(...)")
        return regex?.stringByReplacingMatches(in: number, options: [], range: NSRange(location: 0, length: number.count), withTemplate: "($1) $2-") ?? number
    }
}