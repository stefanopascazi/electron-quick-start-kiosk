import React from 'react';
import { Button, Card, Col, Row, Form } from 'react-bootstrap'
import {
    useNavigate
} from 'react-router-dom'

const AudioPlayer = React.lazy(() => import('../components/audio'))

interface IGpio {
    label: string,
    status: boolean
}

const gpio: Array<IGpio> = [{
    label : "GPIO 4",
    status: false
},{
    label : "GPIO 5",
    status: false
},{
    label : "GPIO 6",
    status: true
},{
    label : "GPIO 7",
    status: false
},{
    label : "GPIO 20",
    status: false
},{
    label : "GPIO 21",
    status: true
},{
    label : "GPIO 29",
    status: true
},{
    label : "GPIO 33",
    status: true
},{
    label : "GPIO 25",
    status: false
},{
    label : "GPIO 26",
    status: true
}]

const Dashboard = () => {

    const [showModal, setShowModal] = React.useState<boolean>(false)

    const router = useNavigate();

    const _checkValiditySave = (res: any) => {
        res.status && router(`/orders/order/${res.id}`, {
            state: true
        })
    }

    const [checked, setChecked] = React.useState<Array<IGpio>>(gpio)

    const handleChangeCheck: Function = (position: number) => {
        setChecked(
            checked.map((v: IGpio, index) => {
                if( position === index )
                {
                    v.status = !v.status
                    return v
                }
                return v
            })
        )
    }

    return (
        <Row className={""}>
            {checked.map(({label, status}: IGpio, index) => <Col key={index} xxl={2} xl={3} lg={4} md={6} xs={6} className={"mt-3"}>
                <Card>
                    <Card.Body>
                        <Form.Switch label={label} checked={status} onChange={() => handleChangeCheck(index)} id={`switch-type-${index}`} />
                        <Row className={"mt-3"}>
                            <Form.Group as={Col}>
                                <Form.Control type={"text"} defaultValue={""} placeholder={"Start at:"} />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Control type={"text"} defaultValue={""} placeholder={"Duration:"} />
                            </Form.Group>
                         </Row>
                    </Card.Body>
                </Card>
            </Col>)}
            <Col xs={12} className={"mt-3"}>
                <Card>
                    <Card.Body>
                        <AudioPlayer />
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}

export default Dashboard