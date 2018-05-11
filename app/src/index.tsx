import '@src/style/common.pcss'
import React from 'react'
import ReactDOM from 'react-dom'
import App from '@src/container/App/App'
import { Provider } from 'mobx-react'
import stores from '@src/store/store'

ReactDOM.render(
    <Provider {...stores}>
        <App />
    </Provider>,
    document.getElementById('root')
)
