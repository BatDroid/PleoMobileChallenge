//
//  CameraManager.swift
//  PleoMobileChallenge
//
//  Created by Alireza Ghamkhar on 7/28/1398 AP.
//  Copyright © 1398 Facebook. All rights reserved.
//

import Foundation
import UIKit

@objc(CameraManager)
class CameraManager: RCTEventEmitter, UINavigationControllerDelegate, UIImagePickerControllerDelegate {
  var imagePicker: UIImagePickerController!
  
  @objc func takeImage() {
    if UIImagePickerController.isSourceTypeAvailable(.camera) {
      DispatchQueue.main.async {
        let appDelegate = UIApplication.shared.delegate
        self.imagePicker = UIImagePickerController()
        self.imagePicker.delegate = self
        self.imagePicker.sourceType = .camera
        if let window = appDelegate!.window {
          window?.rootViewController?.present(self.imagePicker, animated: true, completion: nil)
        }
      }
    }
  }
  
  func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [UIImagePickerController.InfoKey : Any]) {
    let fileManager = FileManager.default
    let documentsPath = fileManager.urls(for: .documentDirectory, in: .userDomainMask).first
    let imagePath = documentsPath?.appendingPathComponent("\(Date().timeIntervalSince1970).jpg")
    
    // extract image from the picker and save it
    if let pickedImage = info[UIImagePickerController.InfoKey.originalImage] as? UIImage {
      
      let imageData = pickedImage.jpegData(compressionQuality: 0.75)
      try! imageData?.write(to: imagePath!)
      sendEvent(withName: "onImagePicked", body: ["image": imagePath?.absoluteString])
      imagePicker.dismiss(animated: true, completion: nil)
    }
  }
  
  override func supportedEvents() -> [String]! {
    return ["onImagePicked"]
  }
  
}
