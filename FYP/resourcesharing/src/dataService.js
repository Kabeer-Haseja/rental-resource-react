import { Subject } from 'rxjs';

const subject = new Subject();

 const dataService = {
    setData: d => subject.next({ value: d }),
    clearData: () => subject.next(),
    getData: () => subject.asObservable()
};
export default dataService;