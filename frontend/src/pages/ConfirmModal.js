import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default function ConfirmModal(message, click) {
    confirmAlert({
        title: message,
        buttons: [
          {
            label: "Fechar",
            onClick: () => click
          },
        ],
        closeOnEscape: false,
        closeOnClickOutside: false
      });
}