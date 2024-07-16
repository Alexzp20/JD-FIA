import React from 'react';
import { Col, Container, FormGroup, Input, Label, Row } from 'reactstrap';

const AprobacionAgenda = ({Controller, control}) => {
    return (
       <Container>
                 <Row>
                    <h5>2-Analisis y aprobación de agenda</h5>
                    <br />
                    <br />
                    <Col xs="2"></Col>
                    <Col xs="4">
                        <FormGroup>
                            <Label for="horaInicio">Hora de inicio</Label>
                            <Controller
                                name="horaInicio"
                                control={control}
                                defaultValue=""
                                render={({ field }) => 
                            <Input
                            {...field}
                            id="horaInicio"
                            type="time"
                            />
                            }/>  
                        </FormGroup>
                        <hr />
                        <FormGroup>
                            <Label for="votos">Votos</Label>
                            <Controller
                                name="votos"
                                control={control}
                                defaultValue=""
                                render={({ field }) => 
                            <Input
                            {...field}
                            id="votos"
                            type="number"
                            />
                            }/>  
                        </FormGroup>
                        <hr />
                    </Col>
                    <Col xs="4">
                    <FormGroup>
                            <Label for="horaFin">Hora de Finalización</Label>
                            <Controller
                                name="horaFin"
                                control={control}
                                defaultValue=""
                                render={({ field }) => 
                            <Input
                            {...field}
                            id="horaFin"
                            type="time"
                            />
                            }/>  
                        </FormGroup>
                        <hr />
                    </Col>
                    <Col xs="2"></Col>
                </Row>
       </Container>
    );
}

export default AprobacionAgenda;
