import Div from '../ui/Div/Div'
import Item from '../Item/Item'
import Items from '../Items/Items'
import Header from '../Header/Header'

import styles from './ListEditor.module.css'
import Modal from '../Modal/Modal'
import ConfirmDelete from '../ConfirmDelete/ConfirmDelete'

export default class ListEditorUI {
  get app() {
    const app = new Div({ classes: [styles.app, 'wrapper'] }).element
    const confirmDelete = new ConfirmDelete(styles.modal).element
    const modal = new Modal(styles.modal).element
    const header = new Header(styles.header).element
    const items = new Items(styles.items).element

    app.append(confirmDelete, modal, header, items)

    return app
  }

  getItem(item) {
    return new Item({ ...item, classes: styles.item }).element
  }
}
