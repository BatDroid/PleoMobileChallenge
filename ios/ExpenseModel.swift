//
//  ExpenseModel.swift
//  PleoMobileChallenge
//
//  Created by Alireza Ghamkhar on 7/26/1398 AP.
//  Copyright © 1398 Facebook. All rights reserved.
//

import Foundation


struct Amount: Codable {
  let value: String
  let currency: String
}

struct User: Codable {
  let first: String
  let last: String
  let email: String
}

struct Expense: Codable {
  let id: String
  let date: String
  let merchant: String
  let comment: String
  let category: String
  let receipts: [String]
  let user: User
  let amount: Amount
  let index: Int
}

struct ExpenseResponse: Codable {
  let expenses: [Expense]
  let total: Int
}
