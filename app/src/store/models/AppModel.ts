import { observable, action, IObservableArray, IObservableValue } from 'mobx'
import ApiService from '@src/utils/ApiService'

// types
import { IFile } from '@src/types/IFile'
import { IResponse } from '@src/types/IResponse'

class AppModel {
    currentFileId: IObservableValue<number>
    files: IObservableArray<IFile>

    constructor() {
        this.files = observable([])
        this.currentFileId = observable.box<number>(0)
    }

    @action
    async loadFiles() {
        const res = await ApiService.get<IResponse<Array<IFile>>>('//localhost:4000/api/file/all')

        this.files.replace(res.data.d)
    }
}

export default new AppModel()
