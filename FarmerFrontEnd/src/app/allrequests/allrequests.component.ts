import { Component, OnInit, Inject } from '@angular/core';
import { SuperuserService } from '../services/superuser.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-allrequests',
  template: `
    <app-nav-bar [navToken]="token" (logoutEvent)="parentLogOut($event)"></app-nav-bar>
  
    <div class="producttablediv">
    <div class="producttable">
      <table>
      <thead>
          <tr>
              <th>Request </th>
              
           
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let item of requestsLog">
              <td>{{ item }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>


  
  `,
  styleUrls: ['./allrequests.component.css']
})
export class AllrequestsComponent implements OnInit {
  token: string
  requestsLog

  constructor(
    @Inject('AppStore') private appStore,
    private superuserservice: SuperuserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.appStore.getState().token) {
      this.token = this.appStore.getState().token
    } else if (localStorage.getItem('token')) {
      this.token = JSON.parse(localStorage.getItem('token'))
    }

    this.onGetRequests()

  }

  parentLogOut($event) {
    this.appStore.dispatch({
      type: 'LOGOUT'
    })
    this.token = ''
    this.router.navigate([""])
  }

  onGetRequests() {
    this.superuserservice.getRequestsLog()
      .subscribe((response) => {
        console.log('from onGetRequest response: ', response)
        this.requestsLog = response
      })
  }


}
