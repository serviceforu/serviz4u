import { Injectable } from '@angular/core';
import { AlertController, LoadingController, Loading } from 'ionic-angular'
@Injectable()

export class ErrorHandlingService {
  loading: Loading;


  public constructor(public alertCtrl: AlertController,
    public loadingCtrl: LoadingController
  ) {

    this.init();

  }

  init() {
    this.loading = this.loadingCtrl.create({ content: 'Please wait...' });
  }

  public ShowLoading() {
    // if(this.IsLoaderUndefined())
    //   this.init();

    this.loading = this.loadingCtrl.create({ content: 'Please wait...' });
    this.loading.present();
  }

  public HideLoading() {
    this.loading.dismiss();

  }

  public ShowError(errorMessage: string, isSuccess = true) {
    let alert = this.alertCtrl.create({
      title: isSuccess ? 'Success' : 'Fail',
      subTitle: errorMessage,
      buttons: ['OK']
    });
    alert.present(prompt);

    this.HideLoading();
  }

  IsLoaderUndefined(): boolean {
    //debugger;
    return (this.loading == null || this.loading == undefined);
  }
}