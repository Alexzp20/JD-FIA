import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Container, Form, Row, Col, FormGroup, Input, Label } from 'reactstrap';
import {useForm, Controller} from 'react-hook-form'; 



export default function ModalDenegarSolicitud({modalDeneg, toggleDeneg, denegado, handleSolicitud}) {
    const {handleSubmit, control, watch, setValue, formState: { errors },clearErrors} = useForm();

    const onSubmit = (data) =>{

        handleSolicitud(denegado, 3, data.justificacion)

        setValue("justificacion", '')
    }
    return (
    <Modal scrollable size="md" isOpen={modalDeneg} toggle={toggleDeneg}>
    <ModalHeader toggle={toggleDeneg}>Denegar Solicitud</ModalHeader>
    <ModalBody>
       <Row>
            <Col xs="12">
            <Form  onSubmit={handleSubmit(onSubmit)} >
            <FormGroup>
                <Label for="justificacion">
                    Comentario sobre la subida
                </Label>
                <Controller
                    name="justificacion"
                    control={control}
                    defaultValue=""
                    render={({ field }) =>  <Input {...field} type="textarea" id= "justificacion"  placeholder="Ingrese un comentario" />}
                />
            </FormGroup>
            <ModalFooter>
                <Button className='text-light' color="custom-danger" type='submit'>
                    Denegar la solicitud
                </Button>{' '}
                <Button className='text-light' color="custom-dark" onClick={toggleDeneg}>
                    Cancelar
                </Button>
            </ModalFooter>
            </Form>
            </Col>
       </Row>
    </ModalBody>
</Modal>
  )
}
