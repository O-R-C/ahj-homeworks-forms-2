import Div from '../ui/Div/Div'

import styles from './ListEditor.module.css'

export default class ListEditorUI {
  get app() {
    const app = new Div({ classes: styles.app }).element

    app.append()

    return app
  }
}
