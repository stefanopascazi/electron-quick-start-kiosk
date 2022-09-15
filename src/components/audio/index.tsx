import React from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { Button, Form, Row, Col } from 'react-bootstrap';

const AudioPlayer = ({ audioUrl }: any) => {

    const [dataAudio, setDataAudio] = React.useState<string>("")

    const _setAudio = (data: any) => {
        setDataAudio(URL.createObjectURL(data));
    }

    return (
        dataAudio ?
            <div>
                <Row>
                    <Col>
                        <Button type='button' variant='primary' size='sm' className='mx-1 px-3' onClick={() => setDataAudio("")}>Carica un'altra traccia audio</Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ReactAudioPlayer
                            src={dataAudio}
                            controls={true}
                            listenInterval={1000}
                            onListen={(e) => console.log(Math.ceil(e))}
                        />
                    </Col>
                </Row>
            </div> :
            <Form.Control type="file" onChange={(evt: any) => _setAudio(evt.target.files[0])} />
    )
}

export default AudioPlayer