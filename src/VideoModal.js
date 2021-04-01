import { Button, Modal, ModalBody, ModalFooter} from 'reactstrap'

const VideoModal = ({modal, toggleModal, videoId}) => {
  
    return (
      <div>
        <Modal isOpen={modal} toggle={toggleModal} size="lg" contentClassName="custom-modal-style">
          <ModalBody>
            <iframe
              className="iframe" 
              src={`https://www.youtube.com/embed/${videoId}`} 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen>
            </iframe>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggleModal}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }

  export default VideoModal