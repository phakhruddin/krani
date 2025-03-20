import SwiftUI

struct CustomButton: View {
    var label: String = ""

    @State private var backgroundColor: Color = Color.gray

    var body: some View {
        Text(label)
            .padding()
            .background(backgroundColor)
            .foregroundColor(.white)
            .cornerRadius(8)
            .onTouchGesture(
                onStart: { self.backgroundColor = Color.red },
                onEnd: { self.backgroundColor = Color.gray }
            )
    }
}

// MARK: - Touch Gesture Extension for SwiftUI
extension View {
    func onTouchGesture(onStart: @escaping () -> Void, onEnd: @escaping () -> Void) -> some View {
        self
            .simultaneousGesture(
                DragGesture(minimumDistance: 0)
                    .onChanged { _ in onStart() }
                    .onEnded { _ in onEnd() }
            )
    }
}

// Usage Example
struct ContentView: View {
    var body: some View {
        CustomButton(label: "Press Me")
    }
}