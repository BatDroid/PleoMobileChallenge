//
//  ExpensesViewController.swift
//  PleoMobileChallenge
//
//  Created by Alireza Ghamkhar on 7/25/1398 AP.
//  Copyright © 1398 Facebook. All rights reserved.
//

import Foundation
import UIKit
import Alamofire

@objc class ExpensesViewController: UIViewController {

  let tableView = UITableView()
  var safeArea: UILayoutGuide!

  let cellID = "cell"
  var expenses: [Expense] = []
  var isLoadingMore = true
  var totalExpenses = 0
  
  override func loadView() {
    super.loadView()
    setupViews()
  }
  
  func setupViews() {
    view.backgroundColor = .white
    safeArea = view.layoutMarginsGuide
    setupTableView()
  }
  
  func setupTableView() {
    view.addSubview(tableView)
    tableView.translatesAutoresizingMaskIntoConstraints = false
    tableView.topAnchor.constraint(equalTo: view.topAnchor).isActive = true
    tableView.leftAnchor.constraint(equalTo: view.leftAnchor).isActive = true
    tableView.rightAnchor.constraint(equalTo: view.rightAnchor).isActive = true
    tableView.bottomAnchor.constraint(equalTo: safeArea.bottomAnchor).isActive = true
    tableView.tableFooterView = UIView()
    tableView.register(UITableViewCell.self, forCellReuseIdentifier: cellID)
    tableView.dataSource = self
    tableView.delegate = self
  }
  
  override func viewDidLoad() {
    super.viewDidLoad();
    getExpenses(from: 0);
  }
  
  func getExpenses(from offset: Int) {
    fetchExpenses(from: 0) {
      response in
      guard let result = response else { print ("there is no data"); return }
      self.expenses.append(contentsOf: result.expenses);
      self.tableView.reloadData()
      self.isLoadingMore = false
      self.totalExpenses = result.total
    }
  }
  
  func fetchExpenses(from offset: Int, completion: @escaping (ExpenseResponse?) -> Void) {
    Alamofire.request(URLS.getExpensesURL(offset: offset, length: 25)).responseJSON {
      (response) in
      guard let data = response.data else { completion(nil); return }
      do {
        let result = try JSONDecoder().decode(ExpenseResponse.self, from: data)
        completion(result)
      } catch {
        print("Error occured")
        completion(nil)
      }
    }
  }
}

extension ExpensesViewController: UITableViewDataSource, UITableViewDelegate {
  
  func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
    return expenses.count
  }
  
  func tableView(_ tableView: UITableView, willDisplay cell: UITableViewCell, forRowAt indexPath: IndexPath) {
    if indexPath.row == expenses.count - 1 {
      if !isLoadingMore && expenses.count < totalExpenses {
        isLoadingMore = true
        getExpenses(from: (self.expenses.last?.index ?? 0) + 1)
      }
    }
  }
  
  func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
    print(expenses[indexPath.row].merchant)
    tableView.deselectRow(at: indexPath, animated: true)
  }
  
  func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
    let cell = UITableViewCell(style: .subtitle, reuseIdentifier: cellID)
    let expense = expenses[indexPath.row]
    cell.textLabel?.text = expense.merchant
    cell.detailTextLabel?.text = "\(expense.amount.value) \(expense.amount.currency)"
    cell.accessoryType = .disclosureIndicator
    
    return cell
  }
  
}
