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
  let segmentItems = ["All", "EUR", "GBP", "DKK"]
  var segmentedControl: UISegmentedControl!

  let cellID = "cell"
  var expenses: [Expense] = [] // expenses fetched from server
  var filteredExpenses: [Expense] = [] // expenses after being filtered (by default no filter!)
  var isLoadingMore = true
  var totalExpenses = 0
  
  override func loadView() {
    super.loadView()
    setupViews()
  }
  
  func setupViews() {
    self.title = "Expenses"
    view.backgroundColor = .white
    safeArea = view.layoutMarginsGuide
    segmentedControl = UISegmentedControl(items: segmentItems)
    view.addSubview(tableView)
    view.addSubview(segmentedControl)
    setupSegmentControl()
    setupTableView()
  }
  
  func setupSegmentControl() {
    segmentedControl.translatesAutoresizingMaskIntoConstraints = false
    segmentedControl.selectedSegmentIndex = 0
    segmentedControl.addTarget(self, action: #selector(onSegmentChanged), for: .valueChanged)
    segmentedControl.topAnchor.constraint(equalTo: safeArea.topAnchor).isActive = true
    segmentedControl.leftAnchor.constraint(equalTo: view.leftAnchor).isActive = true
    segmentedControl.rightAnchor.constraint(equalTo: view.rightAnchor).isActive = true
  }
  
  func setupTableView() {
    tableView.translatesAutoresizingMaskIntoConstraints = false
    tableView.topAnchor.constraint(equalTo: segmentedControl.bottomAnchor).isActive = true
    tableView.leftAnchor.constraint(equalTo: view.leftAnchor).isActive = true
    tableView.rightAnchor.constraint(equalTo: view.rightAnchor).isActive = true
    tableView.bottomAnchor.constraint(equalTo: safeArea.bottomAnchor).isActive = true
    tableView.tableFooterView = UIView()
    tableView.register(UITableViewCell.self, forCellReuseIdentifier: cellID)
    tableView.dataSource = self
    tableView.delegate = self
  }
  
  @objc func onSegmentChanged(_ sender: UISegmentedControl) {
    self.tableView.reloadData()
  }
  
  override func viewDidLoad() {
    super.viewDidLoad();
    getExpenses(from: 0);
  }
  
  func getExpenses(from offset: Int) {
    fetchExpenses(from: offset) {
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
    let segmentIndex = segmentedControl.selectedSegmentIndex
    if segmentIndex == 0 {
      self.filteredExpenses = self.expenses
    } else {
      self.filteredExpenses = expenses.filter {
        $0.amount.currency.lowercased() == segmentItems[segmentIndex].lowercased()
      }
    }
    return self.filteredExpenses.count
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
    tableView.deselectRow(at: indexPath, animated: true)
    
    do {
      let jsonData = try JSONEncoder().encode(filteredExpenses[indexPath.row])
      let jsonString = String(data: jsonData, encoding: .utf8)!
      self.navigationController?.pushViewController(
        ReactNativeViewController(moduleName: "PleoMobileChallenge", andInitialProperties:["expense": jsonString]),
        animated: true
      )
    } catch {
      print("Couldn't encode the object")
    }
  }
  
  func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
    let cell = UITableViewCell(style: .subtitle, reuseIdentifier: cellID)
    let expense = self.filteredExpenses[indexPath.row]
    cell.textLabel?.text = expense.merchant
    cell.detailTextLabel?.text = "\(expense.amount.value) \(expense.amount.currency)"
    cell.accessoryType = .disclosureIndicator
    
    return cell
  }
  
}
