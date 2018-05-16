import { observable, action, IObservableArray, IObservableValue } from 'mobx'
import ApiService from '@src/utils/ApiService'
import find from 'lodash/find'

// types
import { IFile } from '@src/types/IFile'
import { IResponse } from '@src/types/IResponse'

class AppModel {
    currentFileId: IObservableValue<number>
    files: IObservableArray<IFile>

    constructor() {
        this.files = observable([])
        this.currentFileId = observable.box<number>(1)
    }

    async loadFiles() {
        const res = await ApiService.get<IResponse<Array<IFile>>>('//localhost:4000/api/file/all')

        this.loadFilesAction(res.data.d)
    }

    @action
    loadFilesAction(data: Array<IFile>){
        this.files.replace(data)
    }

    @action
    updateCurrentFileIdAction(nextId: number){
        this.currentFileId.set(nextId)
    }

    @action
    updateCurrentFileContentAction(id: number, nContent: string){
        const currentFile = find(this.files, ['id', id])

        if(currentFile){
            currentFile.content = nContent
        }
    }
}

export default new AppModel()
