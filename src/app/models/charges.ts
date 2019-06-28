import {ServiceTypes} from './service-types.enum';

export class Charges {


  CalculateChargeSingleton(amount: number, hrs: number): number {
    return amount * hrs;
  }

  CalculateChargeforAll(stype: ServiceTypes, hrs: number): number {
    let charge = 0;
    switch (stype) {
      case ServiceTypes.clean:
        charge = this.CalculateChargeSingleton(5000, hrs);
        break;
      case ServiceTypes.renovate:

        charge = this.CalculateChargeSingleton(12000, hrs);
        break;
      case ServiceTypes.Cookveg:
        charge = this.CalculateChargeSingleton(6000, hrs);
        break;
      case ServiceTypes.Cooknonveg:
        charge = this.CalculateChargeSingleton(8000, hrs);
        break;
      case ServiceTypes.Catveg:

        charge = this.CalculateChargeSingleton(20000, hrs);
        break;
      case ServiceTypes.Catnonveg:
        charge = this.CalculateChargeSingleton(30000, hrs);
        break;
      case ServiceTypes.dryClean:

        charge = this.CalculateChargeSingleton(3000, hrs);
        break;
      case ServiceTypes.normalWash:
        charge = this.CalculateChargeSingleton(2000, hrs);
        break;

    }
    return charge;
  }

}
