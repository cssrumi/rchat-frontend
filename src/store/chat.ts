import { Subject } from 'rxjs';

const messageApi: String = "http://localhost:8080/v1/message/"

const chatStore = {
    subscribe: (setState: any) => subject.subscribe(setState)
};
