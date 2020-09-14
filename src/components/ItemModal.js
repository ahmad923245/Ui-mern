import React, { Component } from 'react'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input

} from 'reactstrap'
import {connect} from 'react-redux'
import {addItems} from '../actions/ItemActions'
import PropTypes from 'prop-types'
 class ItemModal extends Component {
     state={
         modal:false,
         name:'',
         address:''
     }
     static propTypes={
        isAuthenticated:PropTypes.bool
     }
     toggle=()=>{
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
         const newItem ={
                name:this.state.name,
                address:this.state.address
            }
            
            this.props.addItems(newItem)
            this.toggle()
     }
    render() {

        return (
            <div>

                {
                    this.props.isAuthenticated ? <Button
                    color="dark"
                    style={{marginTop:15}}
                    onClick={this.toggle}
                    >
    
                        Add New Hostel
    
                    </Button> : <h4 className="mb-3 ml-4">Please Log In To Manage Products</h4>
                }
                

                <Modal
                isOpen={this.state.modal}
                toggle={this.toggle}
                
                >

                <ModalHeader
                toggle={this.toggle} >
                    Add Hostel
                </ModalHeader>

                <ModalBody>
                    <Form onSubmit={this.onSubmit}>
                         <FormGroup>
                             <Label for="item">Hostel Name</Label>
                             <Input
                            type="text"
                            name="name"
                            id="item"
                            placeholder="Add Hostel"
                            onChange={this.onChange}
                             
                             />
                              <Input
                            type="text"
                            name="address"
                            id="item"
                            placeholder="Address Of Your Hostel"
                            onChange={this.onChange}
                             
                             />
                             <Input type="file" name="photo" />
                             <Button
                             color="dark"
                             style={{marginTop:5}}
                             block
                             >Add Hostel</Button>
                         </FormGroup>
                    </Form>
                </ModalBody>

                </Modal>

            </div>
        )
    }
}



// const addItems=(dispatch)=>{
// return({
//     addItems:(newItem)=>{
// dispatch(loadUser(newItem))
//     }
// })
// }

const mapStateToProps=(state)=>({
    item:state.item,
    isAuthenticated:state.auth.isAuthenticated
})
export default connect(mapStateToProps,{addItems})(ItemModal)