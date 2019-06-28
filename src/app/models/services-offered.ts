import {ServiceTypes} from './service-types.enum';

export class ServicesOffered {
  _id: string;
  ServiceName: string;
  BookingDate: string;
  DateOfService: string;
  UserId: string;
  serviceType: ServiceTypes;
  isCompleted: Boolean;
  status: string;
  charges: Number;

  serviceTypes = ServiceTypes;

  mapper(data: ServicesOffered[]): ServicesOffered[] {
    for (const element of data) {
      element.DateOfService = new Date(element.DateOfService).toDateString();
      element.BookingDate = new Date(element.BookingDate).toDateString();
      if (element.isCompleted) {
        element.status = 'Completed/Cancelled';
      } else {
        element.status = 'Pending';
      }
    }
    return data;
  }

  mapService(serve: string): ServiceTypes {
    // tslint:disable-next-line:prefer-const
    let keys = Object.keys(this.serviceTypes);
    serve = serve.trim();
    console.log(keys)
    let toRet = ServiceTypes.normalWash;
    switch (serve) {

      case 'clean' :
        toRet = ServiceTypes.clean;
        break;
      case 'renovate' :
        toRet = ServiceTypes.renovate;
        break;
      case 'Cookveg':
        toRet = ServiceTypes.Cookveg;
        break;
      case 'Cooknonveg':
        toRet = ServiceTypes.Cooknonveg;
        break;
      case 'Catveg':
        toRet = ServiceTypes.Catveg;
        break;
      case 'Catnonveg':
        toRet = ServiceTypes.Catnonveg;
        break;
      case  'dryClean':
        toRet = ServiceTypes.dryClean;
        break;
      case  'normalWash':
        toRet = ServiceTypes.normalWash;
        break;

      default:
        toRet = ServiceTypes.normalWash;
    }
    return toRet;
  }
}
