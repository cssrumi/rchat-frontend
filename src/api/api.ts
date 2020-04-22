import { Observable, Subscriber } from "rxjs";

const API_HOST = process.env.REACT_APP_API_HOST != undefined ? process.env.REACT_APP_API_HOST : "http://localhost:8080";
const DEFAULT_OPTIONS = {
    method: "GET",
    headers: {
        'Content-Type': 'application/json'
    }
}

function apiCall<T>(uri: string, options: RequestInit = {}): Promise<T> {
    return fetch(API_HOST + uri, {...DEFAULT_OPTIONS, ...options})
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText)
            }

            return response.json();
        })
}

function createObserver<T>(uri: string): Observable<T> {
    return Observable.create((subscriber: Subscriber<T>) => {
        const eventSource = new EventSource(uri);
        eventSource.onmessage = x => subscriber.next(x.data);
        eventSource.onerror = x => subscriber.error(x);

        return () => {
            eventSource.close();
        };
    })
}

export default apiCall;
export {createObserver};
