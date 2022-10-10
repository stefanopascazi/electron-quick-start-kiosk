import React from 'react';
import { Card, Col, Row, Form, Button } from 'react-bootstrap'
import { IGpio } from '../interface/GPio';

const { ipcRenderer } = window.require("electron");

const AudioPlayer = React.lazy(() => import('../components/audio'))

const gpio: Array<IGpio> = [{
    label: "GPIO 4",
    status: false,
    start: 0,
    end: 0
}, {
    label: "GPIO 5",
    status: false,
    start: 0,
    end: 0
}, {
    label: "GPIO 6",
    status: false,
    start: 0,
    end: 0
}, {
    label: "GPIO 7",
    status: false,
    start: 0,
    end: 0
}, {
    label: "GPIO 20",
    status: false,
    start: 0,
    end: 0
}, {
    label: "GPIO 21",
    status: false,
    start: 0,
    end: 0
}, {
    label: "GPIO 29",
    status: false,
    start: 0,
    end: 0
}, {
    label: "GPIO 33",
    status: false,
    start: 0,
    end: 0
}, {
    label: "GPIO 25",
    status: false,
    start: 0,
    end: 0
}, {
    label: "GPIO 26",
    status: false,
    start: 0,
    end: 0
}]

const Dashboard = () => {

    const [checked, setChecked] = React.useState<Array<IGpio>>(gpio)

    const _getData = React.useCallback(async () => {
        const data: IGpio[] = await ipcRenderer.invoke("create_event", {
            title: "Primo evento"
        })

        return data
    }, [])

    // React.useLayoutEffect(() => {
    //     let isMounted = true;
    //     isMounted && _getData()

    //     return () => {
    //         isMounted = false;
    //     }
    // }, [_getData])

    const testGpio = async() => {
        const data = await ipcRenderer.invoke("start_gpio", {
            title: "Primo evento"
        })

        console.log(data)

    }

    const handleChangeCheck: Function = (position: number) => {
        setChecked(
            checked.map((v: IGpio, index) => {
                if (position === index) {
                    v.status = !v.status
                    return v
                }
                return v
            })
        )
    }

    const handleStart: Function = (position: number, value: number = 0) => {
        setChecked(
            checked.map((v: IGpio, index) => {
                if (position === index) {
                    v.start = value
                    return v
                }
                return v
            })
        )
    }

    const handleDuration: Function = (position: number, value: number = 0) => {
        setChecked(
            checked.map((v: IGpio, index) => {
                if (position === index) {
                    v.end = value
                    return v
                }
                return v
            })
        )
    }

    return (
        <Row className={""}>
            {checked.length > 0 && checked.map(({ label, status, start, end }: IGpio, index) => <Col key={index} xxl={2} xl={3} lg={4} md={6} xs={6} className={"mt-3"}>
                <Card>
                    <Card.Body>
                        <Form.Switch label={label} checked={status} onChange={() => handleChangeCheck(index)} id={`switch-type-${index}`} />
                        <Row className={"mt-3"}>
                            <Form.Group as={Col}>
                                <Form.Control type={"number"} defaultValue={start} placeholder={"Start at:"} onChange={(e: any) => handleStart(index, e.target.value)} />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Control type={"number"} defaultValue={end} placeholder={"Duration:"} onChange={(e: any) => handleDuration(index, e.target.value)} />
                            </Form.Group>
                        </Row>
                    </Card.Body>
                </Card>
            </Col>)}
            <Col xs={12} className={"mt-3"}>
                <Card>
                    <Card.Body>
                        <Button onClick={() => testGpio()}>Test GPIO</Button>
                    </Card.Body>
                </Card>
            </Col>
            <Col xs={12} className={"mt-3"}>
                <Card>
                    <Card.Body>
                        <AudioPlayer checked={checked} setChecked={setChecked} />
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}

export default Dashboard