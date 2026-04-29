
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useEffect } from 'react';
import type { RegisterModalProps } from '../../types/authTypes';
import { useNavigate } from 'react-router-dom';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper', 
  border: '5px solid #168600f3',
  p: 4,
  borderRadius: 3,
  transition: "all 0.3s ease-in-out",
};

export default function RegisterModal({open, setOpen, username}: RegisterModalProps) {
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ color: "#168600", fontWeight: "bold" }}>
            ¡Tu registro se ha completado correctamente!
          </Typography>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <strong>RECUERDA</strong> tu username es: {username}
          </Typography>

          <div className="d-flex justify-content-center mt-4">
            <button
              className="btn btn-success px-4 py-2"
              style={{
                borderRadius: "10px",
                fontWeight: "bold",
                boxShadow: "0 0 10px rgba(22, 134, 0, 0.4)",
                transition: "0.2s",
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
              onClick={() => navigate("/stocks")}
            >
              De acuerdo, quiero ver acciones
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
