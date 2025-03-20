import UIKit

class CustomButton: UIButton {

    var buttonLabel: String = "" {
        didSet {
            self.setTitle(buttonLabel, for: .normal)
        }
    }

    override init(frame: CGRect) {
        super.init(frame: frame)
        setupButton()
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setupButton()
    }

    private func setupButton() {
        self.backgroundColor = UIColor.darkGray
        self.setTitleColor(.white, for: .normal)
        self.layer.cornerRadius = 8

        self.addTarget(self, action: #selector(doTouchStart), for: .touchDown)
        self.addTarget(self, action: #selector(doTouchEnd), for: [.touchUpInside, .touchDragExit])
    }

    @objc func doTouchStart() {
        self.backgroundColor = UIColor.red
    }

    @objc func doTouchEnd() {
        self.backgroundColor = UIColor.darkGray
    }
}

// Usage Example
class ViewController: UIViewController {
    override func viewDidLoad() {
        super.viewDidLoad()
        
        let button = CustomButton(frame: CGRect(x: 100, y: 200, width: 200, height: 50))
        button.buttonLabel = "Press Me"
        
        self.view.addSubview(button)
    }
}