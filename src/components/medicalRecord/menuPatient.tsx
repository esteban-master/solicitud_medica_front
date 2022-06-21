import { Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material"
import NiceModal, { useModal } from '@ebay/nice-modal-react'
import { useShedule } from "../../state/context/SheduleContext";
import ArticleIcon from '@mui/icons-material/Article';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';

const MenuPatient = NiceModal.create(({ patientId }) => {
  const { state ,changeState } = useShedule()
  const modal = useModal()

  return <Menu
    id="menu"
    anchorEl={state.anchorEl}
    open={modal.visible}
    onClose={() => {
      modal.remove()
      changeState({ anchorEl: null })
    }}
    MenuListProps={{
      'aria-labelledby': 'basic-button',
    }}
  >
    <MenuItem onClick={() => {
      modal.resolve({patientId, action: 'viewMedicalRecord'})
      modal.remove()
    }}>
      <ListItemIcon>
        <ArticleIcon />
      </ListItemIcon>
      <ListItemText>
        Ver ficha
      </ListItemText>
    </MenuItem>
    <MenuItem onClick={() => {
      modal.resolve({ patientId, action: 'newMedicalRecord'})
      modal.remove()
    }}>
    <ListItemIcon>
        <DriveFileRenameOutlineIcon />
      </ListItemIcon>
      <ListItemText>
        Agregar evaluación
      </ListItemText>
    </MenuItem>
    </Menu>
})


export default MenuPatient