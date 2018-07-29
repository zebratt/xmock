import {observable, IObservableArray, action} from 'mobx'

// types
import { IRequest } from '@src/types/Network/IRequest'

export class NetworkModelClass {
    readonly requests: IObservableArray<IRequest>
    constructor(){
        this.requests = observable<IRequest>([])
    }
    async loadRequests(){
    }
    @action
    loadRequestsAction(){

    }
}

export const NetworkModel = new NetworkModelClass()