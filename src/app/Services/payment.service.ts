import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Payment } from '../Modals/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }

  private url = "http://localhost:5204/api/Payment";
  
  addPayment(Payment : any){
  return this.http.post<Payment>(this.url + "/AddPayment", Payment);
  }

  getAllPayments()
  {
    return this.http.get<Payment[]>(this.url + "/GetAllPayments");
  }

  getPaymentByEnroll(id : number)
  {
    return this.http.get<Payment>(this.url + "/GetPaymentByEnrollId/" + id);
  }

  getDuePayment(){
    return this.http.get("http://localhost:5204/api/Payment/duePaymentsCount");
  }

  getTotalPaidAmount(){
    return this.http.get("http://localhost:5204/api/Payment/getTotalPaidAmount");
  }

  getMonthlyPayments() {
    return this.http.get<any[]>('http://localhost:5204/api/Payment/MonthlyPayments');
  }
  
}
