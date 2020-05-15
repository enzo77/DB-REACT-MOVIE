import React , {useState, useEffect} from 'react'
import { Modal } from 'antd'
import ReactPlayer from 'react-player'

import './ModalVideo.scss'

export default function ModalVideo(props){
    const { videoKey, videoPlatform, isOpen, close } = props;
    const [urlVideo , setUrlVideo] = useState(null)

    useEffect(() => {
        switch (videoPlatform) {
            case "YouTube":
                setUrlVideo(`https://youtu.be/${videoKey}`)
                break;
            case "Vimeo":
                setUrlVideo(`https://vimeo.com/${videoKey}`)
                break;
            default:
                break;
        }
    }, [videoKey, videoPlatform])

    return (
        <Modal
            className="modal-video"
            visible={isOpen}
            centered
            onCancel={close}
            footer={false}
        >
        <SetVideoPlayer urlVideo={urlVideo} isOpen={isOpen}/>
        </Modal>
    )
}

function SetVideoPlayer(props){
    const {urlVideo, isOpen} = props;
    return (
        <div className='player-wrapper'>
            <ReactPlayer
                className='react-player'
                url={urlVideo}
                width='100%'
                height='100%'
                controls
                playing={isOpen && true}
            />
      </div>
    )
}