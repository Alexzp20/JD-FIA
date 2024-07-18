import React from 'react';
import { Col, Container, FormGroup, Input, Label, Row, FormFeedback } from 'reactstrap'; 
import { Controller } from 'react-hook-form';

const AprobacionAgenda = ({Controller, control,errors}) => {
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
                           rules={{ required: "Debe poner hora" }}
                           render={({ field }) => 
                               <>
                                   <Input
                                       {...field}
                                       id="horaInicio"
                                       type="time"
                                       invalid={!!errors?.horaInicio}
                                   />
                                   {errors?.horaInicio && (
                                       <FormFeedback>{errors.horaInicio.message}</FormFeedback>
                                   )}
                               </>
                           }
                       />  
                   </FormGroup>
                        <hr />
                        <FormGroup>
                            <Label for="votos">Votos</Label>
                            <Controller
                                name="votos"
                                control={control}
                                defaultValue=""
                                rules={{ required: "Debe poner cantidad de votos" }}
                                render={({ field }) => 
                                    <>
                            <Input
                            {...field}
                            id="votos"
                            type="number"
                            invalid={!!errors?.votos}
                            />
                            {errors?.votos && (
                                <FormFeedback>{errors.votos.message}</FormFeedback>
                            )}
                            </>
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
                                rules={{ required: "Debe poner la hora " }}
                                render={({ field }) => 
                                    <>
                                    <Input
                                    {...field}
                                    id="horaFin"
                                    type="time"
                                    invalid={!!errors?.horaFin}
                            />
                                {errors?.horaFin && (
                                <FormFeedback>{errors.horaFin.message}</FormFeedback>
                                    )}
                                    </>
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
