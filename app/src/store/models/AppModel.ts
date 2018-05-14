import {observable, IObservableArray} from 'mobx'
import ApiService from '@src/utils/ApiService'

// types
import {IFile} from '@src/types/IFile'
import {IResponse} from '@src/types/IResponse'

class AppModel {
    @observable files: IObservableArray<IFile>

    constructor(){
        this.files = observable([])
    }

    async loadFiles(){
        const res = await ApiService.get<IResponse<Array<IFile>>>('/api/files/get')

        this.files.replace(res.data.d)
    }
}

export default new AppModel()
