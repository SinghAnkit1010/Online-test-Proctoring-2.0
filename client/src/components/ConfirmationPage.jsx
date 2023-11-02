import { Modal, Button } from 'antd';

const ConfirmationModal = ({ visible, onConfirm, onCancel }) => {
  return (
    <Modal
      title="Confirmation"
      open={visible}
      onCancel={onCancel}
      centered
      footer={[
        <Button className='hover:bg-gray-700' key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button className='hover:bg-gray-700' key="confirm" onClick={onConfirm}>
          Confirm
        </Button>,
      ]}
    >
      <p>Are you sure you want to logout?</p>
    </Modal>
  );
};

export default ConfirmationModal;