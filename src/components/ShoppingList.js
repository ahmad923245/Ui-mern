import React, { Component } from "react";
import { Container, ListGroup, Row, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import {connect} from 'react-redux'
import {getItems,deleteItems} from '../actions/ItemActions'
import PropTypes from 'prop-types'



class ShoppingList extends Component {

    static propTypes ={
        getItems: PropTypes.func.isRequired,
        item: PropTypes.object.isRequired,
        isAuthenticated:PropTypes.bool
    }
  
    componentDidMount(){
        this.props.getItems();

    }
   onDeleteClick=(id)=>{

    this.props.deleteItems(id)
   }
  render() {
    const { items } = this.props.item; 

    let data;

    if(items===undefined){
        data=<p>loading,,,,...</p>
    }
    else{
        data=items.map((item)=>{
            return (
                <Card style={{flexDirection:"wraprow"}} key={item._id}>



<           CardImg top style={{height:290,width:290}}  src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg" alt="Card image cap" />
        <CardBody>
            <CardTitle>Hostel Name: {item.name}</CardTitle>
            <CardSubtitle>Address: {item.address}</CardSubtitle>
          <CardText></CardText>
          <Button>View More</Button>
          <p></p>
          <Button color="info">Get Location</Button>
                </CardBody>
               
              
                    {/* {this.props.isAuthenticated ?   <Button
                        className="remove-btn"
                        color="danger"
                        size="sm"
                        onClick={this.onDeleteClick.bind(this,_id)}
                    >
                        &times;
                    </Button>: null} */}
       
       </Card>
            )
        })
    }
    return (
        <Row >

            {data}
        </Row>

    );
  }
}



const mapStateToProps=(state)=>({
    item:state.item,
    isAuthenticated:state.auth.isAuthenticated
})
export default connect(mapStateToProps,{getItems,deleteItems})(ShoppingList);

