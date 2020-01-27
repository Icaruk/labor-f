
import React, { Fragment } from "react";

import "./register.scss";

import TextField from "@material-ui/core/TextField";
import { FormControl, Button, Radio, RadioGroup, FormControlLabel } from '@material-ui/core';
import { validate } from "../../utils/uti";
import DropdownProvinceList from "../../components/dropdownProvinces/dropdownProvinces";


export default class Register extends React.Component {
	
	constructor (props) {
		super(props);
		
		this.state = {
			
			step: 1,
			province: "",
			city: "",
			userTypeSelectionPending: true,
			
		};
		
	};
	
	
	inputToStatus = (ev, stateKey) => {
		this.setState({ [stateKey]: ev.target.value });
	};
	
	handleUserTypeSelection = (ev) => {
		this.setState({ isEnterprise: ev.target.value === "true" });
		this.setState({ userTypeSelectionPending: false });
	};
	
	
	
	
	setStep = (futureStep, isBack = false, asd) => {
		
		if (isBack) {
			this.setState({ step: futureStep });
			return;
		};
		
		if (this.validateStep()) {
			this.setState({ step: futureStep });
		};
		
	};
	
	
	
	validateStep = () => {
		
		let validation;
		let correct = true;
		
		
		switch (this.state.step) {
			
			case 1:
				
				validation = validate(this.state.username, "abc123", 4, 12);
				if (validation !== "") { correct = false };
				this.setState({ err_username: validation });
				
				validation = validate(this.state.email, "email", 1, 30);
				if (validation !== "") { correct = false };
				this.setState({ err_email: validation });
				
				validation = validate(this.state.password, "abc123!", 4);
				if (validation !== "") { correct = false };
				this.setState({ err_password: validation });
				
				validation = validate(this.state.password2, "abc123!", 4);
				if (validation !== "") { correct = false };
				this.setState({ err_password2: validation });
				
				if (this.state?.password !== this.state?.password2) {
					this.setState({ err_password2: "Las contraseñas deben coincidir." });
					correct = false;
				};
				
				// validation = validate(this.state.province, "abc", 1);
				if (validation !== "") { correct = false };
				this.setState({ err_province: validation });
				
				// validation = validate(this.state.city, "abc", 1);
				if (validation !== "") { correct = false };
				this.setState({ err_city: validation });

				if (this.state.userTypeSelectionPending) { correct = false };
				this.setState({ err_isEnterprise: "Debes elegir si eres trabajador o empresa." });

			break;
			
			
			case 2:

				if(this.state.isEnterprise === false){

					validation = validate(this.state.name, "name", 1);
					if (validation !== "") { correct = false };
					this.setState({ err_name: validation });

					validation = validate(this.state.surname, "surname", 1);
					if (validation !== "") { correct = false };
					this.setState({ err_surname: validation });

					validation = validate(this.state.phone, "phone", 1);
					if (validation !== "") { correct = false };
					this.setState({ err_phone: validation });

					validation = validate(this.state.nif, "nif", 1);
					if (validation !== "") { correct = false };
					this.setState({ err_nif: validation });

				}else{

					validation = validate(this.state.name, "name", 1);
					if (validation !== "") { correct = false };
					this.setState({ err_name: validation });

					validation = validate(this.state.phone, "phone", 1);
					if (validation !== "") { correct = false };
					this.setState({ err_phone: validation });

					validation = validate(this.state.cif, "cif", 1);
					if (validation !== "") { correct = false };
					this.setState({ err_cif: validation });
				}
											
			break;
			
			
			default: break;
			
		};
		
		
		return correct;
		
	};
	
	
	
	send = () => {
		
		if (this.validateStep()) {
			console.log( "AXIOOOS" );
		};
		
	};

	
	c_input = (label, type, stateKey) => {
		
		let errTxt = this.state?.[`err_${stateKey}`];
		let err = !! errTxt;
		
		
		return (
			
			<FormControl className="mt3">
				<TextField
					error={ err }
					helperText={ errTxt }
					// id="outlined-basic"
					type={type}
					label={label}
					variant="outlined"
					onChange={ (ev) => this.inputToStatus(ev, stateKey) }
					value={this.state[stateKey] ? this.state[stateKey] : ""}
				/>
			</FormControl>
			
		);
		
	};
	
	
	
	showForm() {
		
		switch (this.state.step) {
			
			case 1: return (
				<Fragment>
					
					{ this.c_input("Nombre de usuario", "text", "username") }
					{ this.c_input("Email", "email", "email") }
					{ this.c_input("Contraseña", "password", "password") }
					{ this.c_input("Repite contraseña", "password", "password2") }
					<div className="flex-dir-r">
						
						<DropdownProvinceList
							label="Provincia"
							className="mt3 mr3"
							onChange={ (ev) => {
								this.setState({province : ev.target.value});
							}}
						/>
						
						{ this.c_input("Ciudad", "text", "city") }
						
					</div>
					<div className="flex-dir-r">
						<RadioGroup
							className="mt3"
							aria-label="Employed or enterprise"
							name="isEnterprise"
							// value={this.state.isEnterprise}
							onChange={ this.handleUserTypeSelection }
						>
						<FormControlLabel
							value={ "false" }
							control={<Radio color="primary" />}
							label="Soy empleado"
							labelPlacement="end"
						/>
						<FormControlLabel
							value={ "true" }
							control={<Radio color="primary" />}
							label="Soy empresa"
							labelPlacement="end"
						/>
						</RadioGroup>
						</div>
						
						<p
							className="error"
						>
							{this.state?.err_isEnterprise}
						</p>
						
					<Button className="mt3" variant="contained" color="primary"
						onClick={ () =>{ 
							
							this.setStep(2)
						}}
					>
						Siguiente
					</Button>
				</Fragment>
			);
			
			
			
			case 2:
			
				if (! this.state.isEnterprise){
					return (
						<Fragment>

							{ this.c_input("Name", "text", "name") }
							{ this.c_input("Surname", "text", "surname") }
							{ this.c_input("Teléfono", "text", "phone") }
							{ this.c_input("NIF", "text", "nif") }
			


							<div className="boxButtons">
								
								<Button className="btn mt3" variant="contained" color="primary"
									onClick={ () => this.setStep(1, true) }
								>
									« Anterior
								</Button>
								
								<Button className="btn mt3" variant="contained" color="secondary"
									onClick={ () => this.send() }
								>
									Enviar
								</Button>
								
							</div>
							
							
							
						</Fragment>
					);
					
				} else {
					
					return (
						<Fragment>
		
							{ this.c_input("Name", "text", "name") }
							{ this.c_input("Teléfono", "text", "phone") }
							{ this.c_input("CIF", "text", "cif") }

							<div className="boxButtons">
								
								<Button className="btn mt3" variant="contained" color="primary"
									onClick={ () => this.setStep(1, true) }
								>
									« Anterior
								</Button>
								
								<Button className="btn mt3" variant="contained" color="secondary"
									onClick={ () => this.send() }
								>
									Enviar
								</Button>
								
							</div>
							
							
							
						</Fragment>
					);
				};
				
			default: return "asd";
			
		};		
		
	};
	
	
	
	render() {
		return (
			<div className="registerMain">
				<form className="br bs mt3">
					
					<div className="titulo">
						<h2> Registro </h2>
					</div>
					
					
					{this.showForm()}
					
				</form>
			</div>
		);
	
	};
}
