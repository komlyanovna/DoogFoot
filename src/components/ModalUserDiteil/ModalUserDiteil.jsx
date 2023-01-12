import { createPortal } from 'react-dom'
import StyleModal from './style.module.scss'

export function Modal({ isOpen, children }) {
  if (!isOpen) return null

  return createPortal(
    <div className={StyleModal.conteinerRoot}>
      {children}
    </div>,
    document.getElementById('modal-root'),
  )
}
