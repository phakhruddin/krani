import Foundation

class GoogleSheetsManager {
    
    static let shared = GoogleSheetsManager()
    
    let googleAuthToken: String = "YOUR_ACCESS_TOKEN" // Replace with actual token

    // MARK: - Open Main Window
    func openMainWindow() {
        print("This is child window schedule.js")
    }
    
    // MARK: - Fetch Projects
    func fetchProjects() {
        // Assuming projects are fetched and converted into JSON
        let projectJSON = [
            ["col1": "Project1", "col2": "My First Project", "col3": "12345"],
            ["col1": "Project2", "col2": "My Second Project", "col3": "67890"]
        ]
        
        for project in projectJSON {
            let projectId = project["col1"]
            let projectName = project["col2"]
            let projectSid = project["col3"]
            print("Project ID: \(projectId ?? "") | Name: \(projectName ?? "") | SID: \(projectSid ?? "")")
        }
    }
    
    // MARK: - Edit Cell in Spreadsheet
    func editCell(spreadsheetId: String, row: Int, column: Int, value: String, completion: @escaping (Bool) -> Void) {
        let position = "R\(row)C\(column)"
        let urlString = "https://spreadsheets.google.com/feeds/cells/\(spreadsheetId)/od6/private/full/\(position)"
        
        var request = URLRequest(url: URL(string: urlString)!)
        request.httpMethod = "GET"
        request.addValue("application/atom+xml", forHTTPHeaderField: "Content-Type")
        request.addValue("Bearer \(googleAuthToken)", forHTTPHeaderField: "Authorization")
        
        let task = URLSession.shared.dataTask(with: request) { data, response, error in
            guard let data = data, error == nil else {
                print("Failed to edit cell: \(error?.localizedDescription ?? "Unknown error")")
                completion(false)
                return
            }
            
            if let responseText = String(data: data, encoding: .utf8) {
                print("Response: \(responseText)")
                completion(true)
            } else {
                completion(false)
            }
        }
        task.resume()
    }
    
    // MARK: - Create a New Spreadsheet
    func createSpreadsheet(fileName: String, completion: @escaping (String?) -> Void) {
        let urlString = "https://www.googleapis.com/drive/v2/files"
        let jsonPost = """
        {
            "title": "\(fileName)",
            "mimeType": "application/vnd.google-apps.spreadsheet"
        }
        """
        
        var request = URLRequest(url: URL(string: urlString)!)
        request.httpMethod = "POST"
        request.httpBody = jsonPost.data(using: .utf8)
        request.addValue("application/json", forHTTPHeaderField: "Content-Type")
        request.addValue("Bearer \(googleAuthToken)", forHTTPHeaderField: "Authorization")
        
        let task = URLSession.shared.dataTask(with: request) { data, response, error in
            guard let data = data, error == nil else {
                print("Failed to create spreadsheet: \(error?.localizedDescription ?? "Unknown error")")
                completion(nil)
                return
            }
            
            if let jsonResponse = try? JSONSerialization.jsonObject(with: data, options: []) as? [String: Any],
               let sheetId = jsonResponse["id"] as? String {
                print("Created Spreadsheet ID: \(sheetId)")
                completion(sheetId)
            } else {
                completion(nil)
            }
        }
        task.resume()
    }
    
    // MARK: - Check if File Exists, Then Create a Spreadsheet
    func checkFileExistsThenCreateSpreadsheet(fileName: String) {
        let urlString = "https://www.googleapis.com/drive/v2/files?q=title='\(fileName)' and mimeType='application/vnd.google-apps.spreadsheet' and trashed=false&fields=items(id,mimeType,labels,title)"
        
        var request = URLRequest(url: URL(string: urlString)!)
        request.httpMethod = "GET"
        request.addValue("application/json", forHTTPHeaderField: "Content-Type")
        request.addValue("Bearer \(googleAuthToken)", forHTTPHeaderField: "Authorization")
        
        let task = URLSession.shared.dataTask(with: request) { data, response, error in
            guard let data = data, error == nil else {
                print("Failed to check file existence: \(error?.localizedDescription ?? "Unknown error")")
                return
            }
            
            if let jsonResponse = try? JSONSerialization.jsonObject(with: data, options: []),
               let jsonDict = jsonResponse as? [String: Any],
               let items = jsonDict["items"] as? [[String: Any]] {
                if items.isEmpty {
                    print("File does not exist, creating a new spreadsheet.")
                    self.createSpreadsheet(fileName: fileName) { sheetId in
                        if let sheetId = sheetId {
                            UserDefaults.standard.set(sheetId, forKey: "joblogssid")
                        }
                    }
                } else if let existingSheetId = items.first?["id"] as? String {
                    print("File already exists with ID: \(existingSheetId)")
                    UserDefaults.standard.set(existingSheetId, forKey: "joblogssid")
                }
            }
        }
        task.resume()
    }
    
    // MARK: - Event Listener for Creating Spreadsheet
    func onCreateSpreadsheetButtonClicked() {
        checkFileExistsThenCreateSpreadsheet(fileName: "joblogssid")
    }
}

// Example Usage
let googleSheets = GoogleSheetsManager.shared
googleSheets.fetchProjects()
googleSheets.onCreateSpreadsheetButtonClicked()