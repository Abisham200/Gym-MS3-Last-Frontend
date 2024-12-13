import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Payment } from '../Modals/payment';
import { Observable } from 'rxjs';

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

 getTotalPaymentAmount(): Observable<number> {
  return this.http.get<number>(this.url + "/GetAllPaymentAmount");
}

getMonthlyPayments(): Observable<{ month: string; amount: number }[]> {
  return this.http.get<{ month: string; amount: number }[]>(this.url + "/GetMonthlyPayments");
}

}

