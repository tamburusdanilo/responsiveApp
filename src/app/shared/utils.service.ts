import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {


  constructor(private http: HttpClient, private shared: SharedService, private datePipe: DatePipe) { }



  public getx(request: any): Observable<any> {

    const URL = this.obterBackend() + "/api/subdir/method";

    return this.shared.post(URL, request);



    // return of(informacoesCadastraisMock);

  }





  public getExibicaoSistema(): Observable<any> {

    const URL = this.obterBackend() + "/api/utils/statusFuncionamentoSistema";

    return this.shared.get(URL);



    // return of({ "_X-____": true });

  }







  public dateToYMD(date: { getDate: () => any; getMonth: () => number; getFullYear: () => any; }) {

    let d = date.getDate();

    let m = date.getMonth() + 1;

    let y = date.getFullYear();

    return '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);

  }



  public dateToDMY(date: { getDate: () => any; getMonth: () => number; getFullYear: () => any; }) {

    let d = date.getDate();

    let m = date.getMonth() + 1;

    let y = date.getFullYear();

    return '' + (d <= 9 ? '0' + d : d) + '/' + (m <= 9 ? '0' + m : m) + '/' + y;

  }


  /* subscriptions */

  getDataSubscription: any;

  getHoraSubscription: any;

  getDataComparacaoSubscription: any;


  public errorHandling$ = new Subject<any>();





  /* ------------- */



  cnpjMask = '00.000.000/0000-00';








  public getModalDownloadError(): Observable<any> {

    return this.errorHandling$.asObservable();

  }



  public setModalDownloadError(newError: any) {

    this.errorHandling$.next(newError);

  }



  public validaCNPJ(cnpj: string | null | undefined) {



    if (cnpj === null || cnpj === undefined) {

      return true;

    }



    cnpj = cnpj.replace(/[^\d]+/g, '');



    if (cnpj == '') { return false; }



    if (cnpj.length != 14) {

      return false;

    }



    if (cnpj == "00000000000000" ||

      cnpj == "11111111111111" ||

      cnpj == "22222222222222" ||

      cnpj == "33333333333333" ||

      cnpj == "44444444444444" ||

      cnpj == "55555555555555" ||

      cnpj == "66666666666666" ||

      cnpj == "77777777777777" ||

      cnpj == "88888888888888" ||

      cnpj == "99999999999999") {

      return false;

    }



    let tamanho = cnpj.length - 2

    let numeros: any = cnpj.substring(0, tamanho);

    let digitos: any = cnpj.substring(tamanho);

    let soma = 0;

    let pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {

      soma += numeros.charAt(tamanho - i) * pos--;

      if (pos < 2) {

        pos = 9;

      }

    }

    let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;

    if (resultado != digitos.charAt(0)) { return false; }

    tamanho = tamanho + 1;

    numeros = cnpj.substring(0, tamanho);

    soma = 0;

    pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {

      soma += numeros.charAt(tamanho - i) * pos--;

      if (pos < 2) {

        pos = 9;

      }

    }

    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;

    if (resultado != digitos.charAt(1)) {

      return false;

    } 



    return true;

  }




  public obterBackend() {

    const ambiente = environment.env;



    let href = window.location.href;

    let indexPrimeiroDoisPontos = href.indexOf(":") + 1;

    let textoHttp = href.substring(0, indexPrimeiroDoisPontos);

    let textoURL = href.substring(indexPrimeiroDoisPontos);

    let urlAbsoluta = textoHttp + textoURL.substring(0, textoURL.indexOf(":") + 1);

    let apiUrl = urlAbsoluta + `${environment.portaBackend}`;

    // let apiUrl = 'http://xx.yy.corp:9081';



    // if (ambiente=="local" || ambiente=="dev"){

    //     return apiUrl;            

    // }else{

    //     apiUrl = "";

    // }



    return apiUrl;

  }



  public paintDuplicatedErrorFields(form: { controls: { [x: string]: { setErrors: (arg0: { duplicated: boolean; }) => void; }; }; }, fields: { [x: string]: string | number; }) {

    for (let field in fields) {

      form.controls[fields[field]].setErrors({ 'duplicated': true });

    }

  }



  public testaCNPJ(formControlCNPJ: { value: any; setErrors: (arg0: { incorrectCNPJ: boolean; } | null) => void; }) {



    const valid = this.validaCNPJ(formControlCNPJ.value);



    if (valid === false) {

      formControlCNPJ.setErrors({ 'incorrectCNPJ': true });

    } else {

      formControlCNPJ.setErrors(null);

    }

  }



  /* method that transforms a money mask generated value to a float*/

  public moneyStringToFloat(val: { length: number; replace: (arg0: string, arg1: string) => { (): any; new(): any; replace: { (arg0: RegExp, arg1: string): { (): any; new(): any; replace: { (arg0: string, arg1: string): number; new(): any; }; }; new(): any; }; }; } | null | undefined) {

    let retorno = 0;

    if (val !== null && val !== undefined) {

      if (val.length > 0) {

        retorno = val.replace('R$ ', '').replace(/\./g, '').replace(',', '.');

      }

    }



    return retorno;

  }



  public omitSpecialChar(event: { charCode: any; }) {

    let k;

    k = event.charCode;  //         k = event.keyCode;  (Both can be used)

    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));



  }



  public validarCPF(cpf: string) {

    cpf = cpf.replace(/[^\d]+/g, '');

    if (cpf == '') { return false; }

    // Elimina CPFs invalidos conhecidos    

    if (cpf.length != 11 ||

      cpf == "00000000000" ||

      cpf == "11111111111" ||

      cpf == "22222222222" ||

      cpf == "33333333333" ||

      cpf == "44444444444" ||

      cpf == "55555555555" ||

      cpf == "66666666666" ||

      cpf == "77777777777" ||

      cpf == "88888888888" ||

      cpf == "99999999999") {

      return false;

    }

    // Valida 1o digito 

    let add = 0;

    for (let i = 0; i < 9; i++) {

      add += parseInt(cpf.charAt(i)) * (10 - i);

    }

    let rev = 11 - (add % 11);

    if (rev == 10 || rev == 11) {

      rev = 0;

    }

    if (rev != parseInt(cpf.charAt(9))) {

      return false;

    }

    // Valida 2o digito 

    add = 0;

    for (let i = 0; i < 10; i++) {

      add += parseInt(cpf.charAt(i)) * (11 - i);

    }

    rev = 11 - (add % 11);

    if (rev == 10 || rev == 11) {

      rev = 0;

    }

    if (rev != parseInt(cpf.charAt(10))) {

      return false;

    }

    return true;

  }





  public testaCPF(formControlCPF: { value: any; setErrors: (arg0: { incorrectCNPJ: boolean; } | null) => void; }) {

    let valid = false;

    const cpf = formControlCPF.value;



    valid = this.validarCPF(cpf);



    if (valid === false) {

      formControlCPF.setErrors({ 'incorrectCNPJ': true });

    } else {

      formControlCPF.setErrors(null);

    }



  }




  public getDataAtual() {

    const URL = this.obterBackend() + "/apiAdmin/util/dateNow";

    return this.http.get(URL, { responseType: 'text' });

  }







  public setCursor(event: KeyboardEvent) {

    const elem = <HTMLInputElement>event.target;

    elem.setSelectionRange(0, 0);

    // setSelectionRange(0,0)

  }





  /**

   * 

   * @param operation 

   * @param result 

   */

  private handleError<T>(operation = 'operation', result?: T) {

    return (error: any): Observable<T> => {

      return of(result as T);

    };

  } 




  /**

* 

* 

*/





  // exportXLSXSuccess(response: AjaxResponse) {

  //   const downloadLink = document.createElement('a');

  //   downloadLink.href = window.URL.createObjectURL(response.response);

  //   downloadLink.setAttribute('download', "dados.xlsx");



  //   document.body.appendChild(downloadLink);

  //   downloadLink.click();

  //   document.body.removeChild(downloadLink);

  // }



  // getExportacaoXLSX(request: any) {

  //   const URL = this.obterBackend() + "/apiAdmin/util/download/xlsx";

  //   return this.postXLSX(URL, JSON.stringify(request));

  // }



  // exportarXlsx(data: any, url: string) {

  //   return this.postXLSX(url, JSON.stringify(data));

  // }



  // postXLSX(url: string, obj: any) {

  //   return ajax({

  //     url,

  //     method: 'POST',

  //     responseType: 'blob',

  //     body: obj,

  //     headers: {

  //       'Content-Type': 'application/json',

  //       'Accept': 'application/vnd.ms-excel, */*',

  //       'Cache-Control': 'no-cache',

  //     }

  //   }).pipe(

  //     map(this.exportXLSXSuccess),

  //   );

  // }



  /**

* Formata a saida para moeda do Brasil

* @param valor 

*/

  static getMoedaReal(valor: any): string {

    let formato = { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' };

    let real = valor.toLocaleString('pt-BR', formato);



    return real;

  }



  /**

 * 

 * @param data hora no formato do Brasil dd/MM/yyyy hh:mm

 */

  public dataHoraFormatadaBR(data: any): string {



    let dtFormatada = new

      Date(data).toLocaleDateString('pt-BR', {

        day: '2-digit',

        month: '2-digit',

        year: 'numeric',

        hour: '2-digit',

        minute: '2-digit'

      })



    return dtFormatada;

  }








  /**

* 

* @param date 

*/

  public isWeekday(date: Date): boolean {

    var day = date.getDay();

    return day != 0 && day != 6;

  }



  /**

* 

*/

  public getHoraFormatoBR(): Observable<string> {



    const subject = new Subject<string>();



    this.getDataSubscription = this.getDataAtual().subscribe((data: string | number | Date) => {

      const dataRetorno = new Date(data).toLocaleTimeString('pt-BR', {

        hour: '2-digit',

        minute: '2-digit'

      });



      subject.next(dataRetorno);



    });



    return subject.asObservable();



  }



  /**

   * Compara data com data local em formatos dd/MM/yyyy hh:mm

   * Retorna  1 = maior que data local

   *          -1 = menor que data locaal

   *          0 = igual que data local

   * @param data 

   */

  // public comparaDataHoraLocal(data: string): Observable<number> {



  //   let ret: number = null;

  //   const subject = new Subject<number>();




  //   this.getHoraSubscription = this.getHoraFormatoBR().subscribe(horaFormatada => {

  //     const datahora = data + ' ' + horaFormatada;

  //     const dataHoraEntrada = this.dataHoraFormatadaBR(datahora);



  //     this.getDataComparacaoSubscription = this.getDataAtual().subscribe((data: string | number | Date) => {

  //       const dataLocal = this.dataHoraFormatadaBR(new Date(data));

  //       if (dataHoraEntrada > dataLocal) {

  //         ret = 1;

  //       } else if (dataHoraEntrada < dataLocal) {

  //         ret = -1;

  //       } else {

  //         ret = 0;

  //       }



  //       subject.next(ret);



  //     });



  //   });




  //   return subject.asObservable();

  // }



  public onOpenCalendar(container: { monthSelectHandler: (event: any) => void; _store: { dispatch: (arg0: any) => void; }; _actions: { select: (arg0: any) => any; }; setViewMode: (arg0: string) => void; }) {

    container.monthSelectHandler = (event: any): void => {

      container._store.dispatch(container._actions.select(event.date));

    };

    container.setViewMode('month');

  }



  public onDestroy() {

    this.getDataSubscription.unsubscribe();

    this.getHoraSubscription.unsubscribe();

    this.getDataComparacaoSubscription.unsubscribe();

  }







  public escapeStr(element: string) {

    if (typeof element == 'string') {

      //encodeHtmlElements

      // return element.replace(/<\/?[^>]+(>|$)/g, "");

      // return element.replace(/<\/?[^>]+(>|$)/g, "");

      element = element.replace(/</g, "&lt;");

      element = element.replace(/>/g, "&gt;");

      element = element.replace(/"/g, "&quot;");

      element = element.replace(/'/g, "&#x27;");

      // const retorno = element.replace(/((\<).*(\>))|((\{).*(\}))|((\[).*(\]))|$|(\*)|(\+)/g, "");

      // return /((\<).*(\>))|((\{).*(\}))|((\[).*(\]))|$|(\*)|(\+)/.test(element);            

      // |({|}|\*|\+)

      // Validators.pattern(" "))



    }



    return element;



  }



  public transformDate(date: any) {

    return this.datePipe.transform(date, 'dd/yyyy');

  }



  // onDateChange(date: null, formControl: { [x: string]: boolean; value: string | null | undefined; }, cd: { detectChanges: () => void; } | null) {







  //   if (formControl.value === null || formControl.value === '' || formControl.value === undefined) {

  //     formControl['isFilled'] = false;

  //   }

  //   if (date !== null) {

  //     formControl['isFilled'] = true;

  //   }



  //   if (cd !== null) {

  //     cd.detectChanges();

  //   }



  // }



  onElementFocus(formControl: { [x: string]: boolean; }) {

    formControl['isOnFocus'] = true;



  }




  // onElementBlur(formControl: { [x: string]: boolean; value: null; }) {

  //   setTimeout(() => {

  //     if (formControl.value == null) {

  //       formControl['isFilled'] = false;



  //     }

  //     else {

  //       formControl['isFilled'] = true;

  //     }

  //   }, 200);

  // }



  public focusFunction(formControl: any, type: any) {

    if (type === 'in') {

      formControl['isOnFocus'] = true;

    } else {

      if (type === 'out') {



        formControl['isOnFocus'] = false;



        if (formControl['value'] === '' || formControl['value'] === null || formControl['value'] === undefined) {

          formControl['isFilled'] = false;

        }

        else {

          formControl['isFilled'] = true;



        }

      } else if (type === 'date out') {



        setTimeout(() => {

          formControl['isOnFocus'] = false;

        }, 300);

      }



    }



  }



  public isInvalidDate(formControl: { reset: () => void; }) {

    formControl.reset();

  }



  // public sanitizeJSON(json: string | any[], type: any) {

  //   switch (type) {

  //     case 'array':

  //       for (var i = 0; i < json.length; i++) {

  //         for (var key in json[i]) {

  //           json[i][key] = this.escapeStr(json[i][key]);

  //         }

  //       }

  //       return json;

  //   }

  // }


}
