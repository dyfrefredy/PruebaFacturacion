import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantService {
  public RESPONSE_OK: string = 'OK';
  public RESPONSE_WARNING: string = 'WARNING';

  public CLIENTE_URL: string = '/cliente';
  public PRODUCTO_URL: string = '/producto';
  public VENTA_URL: string = '/venta';
  
  // Session storage
  public SESSION_STORAGE_ROL = "currentUserRol";
  public SESSION_STORAGE_USER = "currentUser";

  public SESSION_STORAGE_LANGUAJE = "language";

  //Languaje
  public LANGUAGE: Array<{ name: string, value: string }> = [
    {
      name: "module.language.spanish", value: "es"
    },
    {
      name: "module.language.english", value: "en"
    }
  ];
}
