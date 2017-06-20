import { Component } from '@angular/core';
import { LoadingController, NavController, AlertController, NavParams, Platform } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { ActionSheetController, ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { LocalStorageService } from 'angular-2-local-storage';
import { DealerService } from '../../service/dealer.service';
import { Toast } from '@ionic-native/toast';

@Component({
  selector: 'page-sales-approval',
  templateUrl: 'sales_approval.html'
})
export class SalesApprovalPage {
  dealers: any;
  selectedProduct: any;
  quantity: any;
  date: any;
  attachedImage: any;
  purchaseData: any = {};
  multiSelect: boolean = false;
  selectedItemCount: number = 0
  selectedDealer: number[];
  constructor(public navCtrl: NavController,
              private navParams: NavParams,
              private actionSheetCtrl: ActionSheetController,
              private camera: Camera,
              public platform: Platform,
              private toast: Toast,
              private toastCtrl: ToastController,
              private dealerService: DealerService,
              private loadingCtrl: LoadingController,
              private localStorageService: LocalStorageService,
              private alertCtrl: AlertController) {
    this.dealers = [{id: 1, name: "Brojendra Nath Das", mobile: 9002293496, email: 'brojendra.das@mjunction.in', purchaseData: '2017-06-20', purchaseQty: 20},
                    {id: 2, name: "Brojendra Nath Das", mobile: 9002293496, email: 'brojendra.das@mjunction.in', purchaseData: '2017-06-20', purchaseQty: 20},
                    {id: 3, name: "Brojendra Nath Das", mobile: 9002293496, email: 'brojendra.das@mjunction.in', purchaseData: '2017-06-20', purchaseQty: 20}];
    this.selectedDealer = [];
  }

  enableMultiselect(){
    this.multiSelect = true;
    this.selectedDealer = [];
    this.selectedItemCount = 0;
  }

  approveDealer(dealer: any){
    this.selectedDealer=[dealer.id];
  }

  selectDealer(dealer: any){
    if(dealer){
      let index = this.selectedDealer.indexOf(dealer.id);
      if(index > -1){
         this.selectedDealer.splice(index, 1);
         this.selectedItemCount --;
      } else{
        this.selectedDealer.push(dealer.id);
        this.selectedItemCount ++;
      }
    }
    if(this.selectedItemCount == 0){
      this.multiSelect = false;
    }
    console.log(this.selectedDealer);
  }

  getLoadingDialog() {
    return this.loadingCtrl.create({
      spinner: 'hide',
      content: `
        <div class="loading-box">
          <img src="assets/loading.png"><br>
          Loading, please wait...
        </div>`
    });
  }

  getErrorAlert(title: string, message: string) {
    return this.alertCtrl.create({
      title: title,
      message: message,
      buttons: [{
        text: 'Dismiss',
        handler: () => {
          //this.navCtrl.pop();
        }
      }]
    });
  }
  getToken() {
    return this.localStorageService.get('token');
  }

  openImageDialog() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Modify your album',
      buttons: [
        {
          text: 'Select from gallery',
          handler: () => {
            this.getPicture(0);
          }
        },{
          text: 'Take photo',
          handler: () => {
            this.getPicture(1);
          }
        },{
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  getPicture(type) {
    let options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      saveToPhotoAlbum: true,
      sourceType: type,
    }

    let self = this;

    this.camera.getPicture(options).then((imageData) => {
      self.purchaseData.invoice = imageData;
    }, (err) => {
      console.log(err);
      this.toastCtrl.create({
        message: err,
        duration: 3000
      }).present();
    });
  }

  removeAttachedImage() {
    this.purchaseData.invoice = undefined;
  }
}
