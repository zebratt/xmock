import {observable, action, IObservableArray} from 'mobx'
import ApiService from '@src/utils/ApiService'

// types
import {IFile} from '@src/types/IFile'
import {IResponse} from '@src/types/IResponse'

class AppModel {
    @observable current: IFile | null
    @observable files: IObservableArray<IFile>

    constructor(){
        this.files = observable([])
        this.current = null
    }

    @action
    async loadFiles(){
        const res = await ApiService.get<IResponse<Array<IFile>>>('//localhost:4000/api/file/all')

        this.files.replace(res.data.d)
    }
}

export default new AppModel()
