// Swift Example
// Para apps iOS que consuman la API con código limpio y moderno.

import Foundation

struct Station: Codable {
    let name: String
    let available: Int
}

class MobilityService {
    func fetchStations() {
        print("Fetching mobility data...")
    }
}
