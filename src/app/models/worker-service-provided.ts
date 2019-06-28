export class WorkerServiceProvided {
  _id: string;
  ServiceName: string;
  UserId: string;
  serviceDueOn: string;
  BookedOn: string;
  userServiceId: string;
  accepted:true;
status:string;


  mapper(data: WorkerServiceProvided[]): WorkerServiceProvided[] {
    for (const element of data) {
      element.BookedOn = new Date(element.BookedOn).toDateString();
      element.serviceDueOn = new Date(element.serviceDueOn).toDateString();
      if (element.accepted) {
        element.status = 'Accepted';
      } else {
        element.status = 'Rejected';
      }
    }
    return data;
  }
}
