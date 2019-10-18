//
//  URLS.swift
//  PleoMobileChallenge
//
//  Created by Alireza Ghamkhar on 7/26/1398 AP.
//  Copyright © 1398 Facebook. All rights reserved.
//

import Foundation

class URLS {
  static let ROOT = "http://localhost:3000"
  static func getExpensesURL(offset: Int, length: Int) -> String {
    return "\(ROOT)/expenses?offset=\(offset)&limit=\(length)"
  }
}
