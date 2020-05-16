import React, {Component} from "react";

import Button from "../../../components/UI/Button/Button";
import classes from './ContactData.module.css'

class ContactData extends Component{
	state = {
		name: '',
		email: '',
		address: {
			street: '',
			postalCode: ''
		}
	};

	render() {
		return (
			<div className={classes.ContactData}>
				<h1>Enter Your Contact Data</h1>
				<form>
					<input type='text' name='name' placeholder='Your Name'  className={classes.Input}/>
					<input type='text' name='email' placeholder='Your Email' className={classes.Input}/>
					<input type='text' name='street' placeholder='Your Street' className={classes.Input}/>
					<input type='text' name='postal' placeholder='Your Postal Code' className={classes.Input}/>
					<Button btnType='Success'>ORDER</Button>
				</form>
			</div>
		)
	}

}

export default ContactData;