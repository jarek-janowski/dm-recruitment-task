import { Button, Modal, ModalBody, ModalFooter} from 'reactstrap'

const VideoModal = ({modal, toggleModal, videoId}) => {
    return (
      <div>
        <Modal isOpen={modal} toggle={toggleModal} size="lg" contentClassName="custom-modal-style">
          <ModalBody>
            { videoId.includes('videos') ?
            <iframe 
              src={`https://player.vimeo.com/video/${videoId.slice(8)}?color=ffffff&title=0&byline=0&portrait=0&badge=0`} 
              width="100%" 
              height="100%"
              title="Vimeo video player" 
              frameBorder="0" 
              allow="autoplay; fullscreen; picture-in-picture" 
              allowFullScreen>
            </iframe>:
            <iframe
              className="iframe" 
              src={`https://www.youtube.com/embed/${videoId}`} 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen>
            </iframe>
            }
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggleModal}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }

  export default VideoModal