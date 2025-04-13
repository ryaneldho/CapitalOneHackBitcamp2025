import requests
import json

customerId = '67f9ec319683f20dd5194d2c'
defaultAcc = '67fb4a069683f20dd51955e3'
defaultIkeaMerc = '66ef43749683f20dd518a511'

url = "http://api.nessieisreal.com/"
api_key_extension = "?key=aa28cdb8b75a206af983b242bed387cc"


def main():
    while True:
      make_acc = input("Do you wanna make an account? (y/n): ")
      if make_acc.strip().lower() == "y":
        new_acc = input("Enter preferred 16 digit acc#: ")
        if len(new_acc) != 16:
          print("not 16 back to start")
          continue
        else:
          reqUrl = url+"customers/"+customerId+"/accounts"+api_key_extension
          # print(reqUrl)
          payload = {
            "type": "Savings",
            "nickname": "test",
            "rewards": 0,
            "balance": 0,	
            "account_number":new_acc
          }
          response = requests.post( 
            reqUrl, 
            data=json.dumps(payload),
            headers={'content-type':'application/json'},
          )
          print(response.json().get("objectCreated").get("customer_id"))
          continue

      get_acc = input("Do you wanna get account #s (y/n): ")
      if get_acc.strip().lower() == "y":
        resp = requests.get(url + "accounts" + api_key_extension)
        for entry in resp.json():
          print(entry.get("_id"))
          continue
      acc_num = input("Do you have a specific acc # you wanna use: (y/n): ")
      if acc_num.strip().lower() == "y":
        acc_num = input("Enter accE: ")
      else:
        acc_num = defaultAcc 
      
      means = input("Enter action: deposit, purchase, transfer, withdrawal, or exit: ").strip().lower()
      if means not in ['deposit', 'purchase', 'transfer', 'withdrawal']:
        break
      

      amt = input("How much $xx.xx: ")
      amt = float(amt)
      
      payload = None
      reqUrl = ""
      print(reqUrl)
      if means == "deposit":
        date = input("Enter date in xxxx-mm-yy: ");
        payload = {
          "medium": "balance",
          "transaction_date":date,
          "status": "completed",
          "amount": amt
        }
        reqUrl = url+"accounts/"+acc_num+ "/deposits"+api_key_extension
        print(reqUrl)
      elif means == "loan":
        payload = {
          "type": "home",
          "status": "approved",
          "credit_score":584,
          "monthly_payment": 0, 
          "amount": amt
        }
      elif means == "purchase":
        date = input("Enter date in xxxx-mm-yy: ");
        payload ={
          "merchant_id": defaultIkeaMerc,
          "medium": "balance",
          "purchase_date": date,
          "amount": amt,
        }
        reqUrl = url+"accounts/"+acc_num+ "/purchases"+api_key_extension
      elif means == "transfer":
        date = input("Enter date in xxxx-mm-yy: ");
        payload={
          "medium": "balance",
          "payee_id": defaultAcc,
          "amount": amt,
          "transaction_date": date,
        }
        reqUrl = url+"accounts/"+acc_num+ "/transfers"+api_key_extension
      elif means == "withdrawal":
        date = input("Enter date in xxxx-mm-yy: ");
        payload={
          "medium": "balance",
          "transaction_date": date,
          "amount": amt
        }
        reqUrl = url+"accounts/"+acc_num+ "/withdrawals"+api_key_extension
      elif means == "bill":
        pass
      
      print(payload)
      response = requests.post( 
        reqUrl, 
        data=json.dumps(payload),
        headers={'content-type':'application/json'},
      )
      print(response.status_code)

if __name__ == "__main__":
  main()