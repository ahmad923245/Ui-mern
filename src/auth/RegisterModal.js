import React, { Component } from 'react'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert

} from 'reactstrap'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {register} from '../actions/AuthActions'
import {clearErrors} from '../actions/errorsActions'

 class RegisterModal extends Component {
     state={
         modal:false,
         name:'',
         email:'',
         password:'', 
         msg:null
     }

     static proprTypes ={
         isAuthenticated:PropTypes.bool,
         error:PropTypes.object.isRequired,
         register:PropTypes.func.isRequired,
         clearErrors:PropTypes.func.isRequired
     }
     toggle=()=>{
         this.props.clearErrors();
          this.setState({
              modal:!this.state.modal
          })
     }

     onChange=(e)=>{
         this.setState({
             [e.target.name]:e.target.value
         })

     }
     onSubmit=(e)=>{
         e.preventDefault();
            const {name,email,password}= this.state;
            //create user object
            const newUser={
                name,
                email,
                password
            };
            this.props.register(newUser)


     }
     componentDidUpdate(prevProps){
         const {error,isAuthenticated} = this.props
         if(error !== prevProps.error){
             if(error.id === 'REGISTER_FAIL'){
                 this.setState({msg:error.msg.msg})
             }else{
                 this.setState({msg:null})
             }
         }
         if(this.state.modal){
             if(isAuthenticated){
                    this.toggle();
             }

         }

     }
    render() {

        return (
            <div>
                <NavLink onClick={this.toggle} href="#">
                    Register
                </NavLink>
                <Modal
                isOpen={this.state.modal}
                toggle={this.toggle}
                
                >

                <ModalHeader
                toggle={this.toggle} >
                    Register
                </ModalHeader>

                <ModalBody>
                    {
                        this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null
                    }
                    <Form onSubmit={this.onSubmit}>
                         <FormGroup>
                             <Label for="name">Name</Label>
                             <Input
                            type="text"
                            name="name"
                            id="name"
                            className='mb-3'
                            placeholder="Name"
                            onChange={this.onChange}
                             
                             />
                              <Label for="email">Email</Label>
                             <Input
                            type="email"
                            name="email"
                            id="email"
                            className='mb-3'
                            placeholder="Email"
                            onChange={this.onChange}
                             
                             />
                              <Label for="password">Password</Label>
                             <Input
                            type="password"
                            name="password"
                            id="password"
                            className='mb-3'
                            placeholder="password"
                            onChange={this.onChange}
                             
                             />
                          
                             <Button
                             color="dark"
                             style={{marginTop:5}}
                             block
                             >Register</Button>
                         </FormGroup>
                    </Form>
                </ModalBody>

                </Modal>

            </div>
        )
    }
}

const mapStateToProps=(state)=>({
    isAuthenticated:state.auth.isAuthenticated,
    error:state.error
})
export default connect(mapStateToProps,{register,clearErrors})(RegisterModal)