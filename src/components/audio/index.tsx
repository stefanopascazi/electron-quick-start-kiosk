import React from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { IGpio } from '../../interface/GPio';

type TAudioPlayer = {
    checked: Array<IGpio>,
    setChecked: Function
}

const AudioPlayer = ({checked, setChecked}: TAudioPlayer) => {

    const [dataAudio, setDataAudio] = React.useState<string>("")
    const [statusPlay, setStatusPlay] = React.useState<boolean>(false)

    const _setAudio = (data: any) => {
        setDataAudio(URL.createObjectURL(data));
    }

    const _turnOnOffGPIO = (sec: number) => {
        setChecked(
            checked.map((v: IGpio, index: number) => {
                if( sec >= parseInt(v.start.toString()) && sec < parseInt(v.end.toString()) )
                {
                    v.status = true
                    return v
                } else {
                    v.status = false
                    return v
                }
            })
        )
    }

    return (
        dataAudio ?
            <div>
                <Row className={"mb-3"}>
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
                            onListen={(e) => _turnOnOffGPIO(Math.ceil(e))}
                            onPlay={() => _turnOnOffGPIO(0)}
                        />
                    </Col>
                </Row>
            </div> :
            <div>
            <Form.Control type="file" onChange={(evt: any) => _setAudio(evt.target.files[0])} />
            </div>
    )
}

export default AudioPlayer